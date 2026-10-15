"use client";

import { ProgressiveImage } from "@/components/progressive-image";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type PdfDocument = {
  numPages: number;
  getPage: (pageNumber: number) => Promise<{
    getViewport: (opts: { scale: number }) => { width: number; height: number };
    render: (opts: { canvasContext: CanvasRenderingContext2D; viewport: { width: number; height: number } }) => PdfRenderTask;
  }>;
};

type PdfRenderTask = {
  promise: Promise<void>;
  cancel: () => void;
};

export function DeckViewer({
  dir,
  pages,
  title,
  pdf,
}: {
  dir: string;
  pages: number;
  title: string;
  pdf?: string;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const canvases = useRef<(HTMLCanvasElement | null)[]>([]);
  const renderTasks = useRef<Map<number, PdfRenderTask>>(new Map());
  const renderedScaleKey = useRef<Map<number, string>>(new Map());
  const [page, setPage] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [pdfDoc, setPdfDoc] = useState<PdfDocument | null>(null);
  const [pdfError, setPdfError] = useState(false);
  const [loadedPdf, setLoadedPdf] = useState<string | null>(null);
  const [renderedPages, setRenderedPages] = useState<Set<number>>(() => new Set());
  const [failedPages, setFailedPages] = useState<Set<number>>(() => new Set());
  const wantsPdf = Boolean(pdf);

  const activePdfDoc = pdf && loadedPdf === pdf && !pdfError ? pdfDoc : null;
  // The image sequence is the stable source of truth because every PDF page
  // needs a local fallback, even when the document reports an unexpected count.
  const totalPages = pages;

  const go = useCallback((delta: number) => {
    const el = scroller.current;
    if (!el) return;
    const target = Math.min(totalPages - 1, Math.max(0, page + delta));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: target * el.clientWidth, behavior: reduced ? "auto" : "smooth" });
  }, [page, totalPages]);

  useEffect(() => {
    if (!pdf) return;

    let cancelled = false;
    const controller = new AbortController();

    const loadPdf = async () => {
      try {
        const pdfjsMod = await import("pdfjs-dist/build/pdf.mjs");
        const workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsMod.version}/build/pdf.worker.min.mjs`;
        if (pdfjsMod.GlobalWorkerOptions.workerSrc !== workerSrc) {
          pdfjsMod.GlobalWorkerOptions.workerSrc = workerSrc;
        }
        if (cancelled) return;
        const response = await fetch(pdf, { cache: "no-store", signal: controller.signal });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} while fetching ${pdf}`);
        }
        const bytes = await response.arrayBuffer();
        const doc = await pdfjsMod.getDocument({ data: new Uint8Array(bytes) }).promise;
        if (!cancelled) {
          setPdfDoc(doc);
          setPdfError(false);
          setLoadedPdf(pdf);
          if (doc.numPages < pages) {
            setFailedPages(
              new Set(Array.from({ length: pages - doc.numPages }, (_, index) => doc.numPages + index)),
            );
          }
          if (doc.numPages !== pages) {
            console.warn(
              `[DeckViewer] PDF/image page-count mismatch: ${doc.numPages} PDF pages, ${pages} image pages`,
            );
          }
          console.info(`[DeckViewer] PDF loaded: ${pdf} (${doc.numPages} pages)`);
        }
      } catch (error) {
        if (!cancelled && !(error instanceof DOMException && error.name === "AbortError")) {
          setPdfError(true);
          setLoadedPdf(pdf);
          console.error(`[DeckViewer] PDF failed to load: ${pdf}`, error);
        }
      }
    };

    loadPdf();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [pages, pdf]);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const update = () => setViewportWidth(el.clientWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const onScroll = () => {
    const el = scroller.current;
    if (!el || el.clientWidth <= 0) return;
    const nextPage = Math.round(el.scrollLeft / el.clientWidth);
    setPage(Math.min(totalPages - 1, Math.max(0, nextPage)));
  };

  const pagesToRender = useMemo(() => {
    if (!activePdfDoc) return [];
    return [page - 1, page, page + 1].filter(
      (i) => i >= 0 && i < totalPages && i < activePdfDoc.numPages,
    );
  }, [activePdfDoc, page, totalPages]);

  useEffect(() => {
    if (!activePdfDoc || viewportWidth <= 0) return;

    let cancelled = false;
    const dpr = window.devicePixelRatio || 1;

    const renderPage = async (pageIndex: number) => {
      const canvas = canvases.current[pageIndex];
      if (!canvas) return;

      try {
        const pdfPage = await activePdfDoc.getPage(pageIndex + 1);
        const baseViewport = pdfPage.getViewport({ scale: 1 });
        const cssScale = viewportWidth / baseViewport.width;
        const renderScale = cssScale * dpr;
        const viewport = pdfPage.getViewport({ scale: renderScale });
        const scaleKey = `${Math.round(viewport.width)}x${Math.round(viewport.height)}`;
        if (renderedScaleKey.current.get(pageIndex) === scaleKey) return;

        const context = canvas.getContext("2d");
        if (!context) throw new Error("Canvas rendering is unavailable");

        renderTasks.current.get(pageIndex)?.cancel();

        canvas.width = Math.round(viewport.width);
        canvas.height = Math.round(viewport.height);
        canvas.style.width = `${Math.round(viewport.width / dpr)}px`;
        canvas.style.height = `${Math.round(viewport.height / dpr)}px`;

        const task = pdfPage.render({ canvasContext: context, viewport });
        renderTasks.current.set(pageIndex, task);
        await task.promise;
        if (!cancelled) {
          renderedScaleKey.current.set(pageIndex, scaleKey);
          setRenderedPages((current) => new Set(current).add(pageIndex));
          setFailedPages((current) => {
            if (!current.has(pageIndex)) return current;
            const next = new Set(current);
            next.delete(pageIndex);
            return next;
          });
        }
      } catch (error) {
        const name = error instanceof Error ? error.name : "";
        if (cancelled || name === "RenderingCancelledException") return;

        console.error(`[DeckViewer] PDF page ${pageIndex + 1} failed to render`, error);
        setRenderedPages((current) => {
          const next = new Set(current);
          next.delete(pageIndex);
          return next;
        });
        setFailedPages((current) => new Set(current).add(pageIndex));
      }
    };

    void Promise.all(pagesToRender.map((index) => renderPage(index)));

    return () => {
      cancelled = true;
    };
  }, [activePdfDoc, pagesToRender, viewportWidth]);

  useEffect(() => {
    const tasks = renderTasks.current;
    return () => {
      for (const task of tasks.values()) task.cancel();
    };
  }, []);

  const src = (i: number) => `${dir}/${String(i + 1).padStart(2, "0")}.jpg`;
  const pad = (n: number) => String(n).padStart(2, "0");
  const fallbackActive = pdfError || failedPages.size > 0;
  const pdfStatus = !wantsPdf
    ? null
    : fallbackActive
      ? "PDF unavailable; showing the image version."
      : activePdfDoc
        ? "PDF ready."
        : "Loading PDF; showing the image version in the meantime.";

  return (
    <section
      className="deck"
      aria-label={`${title} deck, ${totalPages} pages`}
      aria-roledescription="carousel"
      data-deck-source={wantsPdf ? "pdf" : "images"}
      data-deck-pdf-ready={activePdfDoc ? "true" : "false"}
      data-deck-pdf-error={pdfError ? "true" : "false"}
    >
      <div className="deck-frame">
        <div className="deck-scroller" ref={scroller} onScroll={onScroll}>
          {Array.from({ length: totalPages }, (_, i) => (
            <div className="deck-page" key={i}>
              {wantsPdf ? (
                <>
                  <ProgressiveImage
                    src={src(i)}
                    alt={`${title}, page ${i + 1} of ${totalPages}`}
                    loading={i < 2 ? "eager" : "lazy"}
                    fetchPriority={i < 2 ? "high" : "auto"}
                    draggable={false}
                  />
                  <canvas
                    ref={(el) => {
                      canvases.current[i] = el;
                    }}
                    className={`deck-pdf-page${renderedPages.has(i) ? " is-rendered" : ""}`}
                    aria-hidden="true"
                  />
                </>
              ) : (
                <ProgressiveImage
                  src={src(i)}
                  alt={`${title}, page ${i + 1} of ${totalPages}`}
                  loading={i < 2 ? "eager" : "lazy"}
                  fetchPriority={i < 2 ? "high" : "auto"}
                  draggable={false}
                />
              )}
            </div>
          ))}
        </div>
        <button className="deck-zone deck-prev" onClick={() => go(-1)} aria-label="Previous page" disabled={page === 0}>
          <span aria-hidden="true">←</span>
        </button>
        <button className="deck-zone deck-next" onClick={() => go(1)} aria-label="Next page" disabled={page === totalPages - 1}>
          <span aria-hidden="true">→</span>
        </button>
        <div className="deck-progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${(page + 1) / totalPages})` }} />
        </div>
      </div>
      <div className="deck-bar">
        <span className="deck-count accent" aria-live="polite">{pad(page + 1)} / {pad(totalPages)}</span>
        <span className="deck-hint">
          {fallbackActive ? "showing image fallback" : "click, swipe, or use arrow keys"}
        </span>
        {pdfStatus && <span className="sr-only" role="status" aria-live="polite">{pdfStatus}</span>}
        {pdf && (
          <a className="deck-pdf" href={pdf} target="_blank" rel="noreferrer">
            open original PDF ↗
          </a>
        )}
      </div>
    </section>
  );
}
