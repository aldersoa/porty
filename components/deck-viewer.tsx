"use client";

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
  const wantsPdf = Boolean(pdf);

  const activePdfDoc = pdf && loadedPdf === pdf && !pdfError ? pdfDoc : null;
  const totalPages = activePdfDoc?.numPages ?? pages;

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
    const loadPdf = async () => {
      try {
        const pdfjsMod = await import("pdfjs-dist/build/pdf.mjs");
        if (cancelled) return;
        const response = await fetch(pdf, { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} while fetching ${pdf}`);
        }
        const bytes = await response.arrayBuffer();
        const doc = await pdfjsMod.getDocument({ data: new Uint8Array(bytes), disableWorker: true }).promise;
        if (!cancelled) {
          setPdfDoc(doc);
          setPdfError(false);
          setLoadedPdf(pdf);
          console.info(`[DeckViewer] PDF loaded: ${pdf} (${doc.numPages} pages)`);
        }
      } catch (error) {
        if (!cancelled) {
          setPdfError(true);
          setLoadedPdf(pdf);
          console.error(`[DeckViewer] PDF failed to load: ${pdf}`, error);
        }
      }
    };

    loadPdf();

    return () => {
      cancelled = true;
    };
  }, [pdf]);

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
    return [page - 1, page, page + 1].filter((i) => i >= 0 && i < totalPages);
  }, [activePdfDoc, page, totalPages]);

  useEffect(() => {
    if (!activePdfDoc || viewportWidth <= 0) return;

    let cancelled = false;
    const dpr = window.devicePixelRatio || 1;

    const renderPage = async (pageIndex: number) => {
      const canvas = canvases.current[pageIndex];
      if (!canvas) return;

      const pdfPage = await activePdfDoc.getPage(pageIndex + 1);
      const baseViewport = pdfPage.getViewport({ scale: 1 });
      const cssScale = viewportWidth / baseViewport.width;
      const renderScale = cssScale * dpr;
      const viewport = pdfPage.getViewport({ scale: renderScale });
      const scaleKey = `${Math.round(viewport.width)}x${Math.round(viewport.height)}`;
      if (renderedScaleKey.current.get(pageIndex) === scaleKey) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      renderTasks.current.get(pageIndex)?.cancel();

      canvas.width = Math.round(viewport.width);
      canvas.height = Math.round(viewport.height);
      canvas.style.width = `${Math.round(viewport.width / dpr)}px`;
      canvas.style.height = `${Math.round(viewport.height / dpr)}px`;

      const task = pdfPage.render({ canvasContext: context, viewport });
      renderTasks.current.set(pageIndex, task);
      await task.promise;
      if (!cancelled) renderedScaleKey.current.set(pageIndex, scaleKey);
    };

    Promise.all(pagesToRender.map((index) => renderPage(index))).catch(() => {});

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
                <canvas
                  ref={(el) => {
                    canvases.current[i] = el;
                  }}
                  role="img"
                  aria-label={`${title}, page ${i + 1} of ${totalPages}`}
                  style={{ display: "block", width: "100%" }}
                />
              ) : (
                <img
                  src={src(i)}
                  alt={`${title}, page ${i + 1} of ${totalPages}`}
                  loading={i < 2 ? "eager" : "lazy"}
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
          <span style={{ width: `${((page + 1) / totalPages) * 100}%` }} />
        </div>
      </div>
      <div className="deck-bar">
        <span className="deck-count accent" aria-live="polite">{pad(page + 1)} / {pad(totalPages)}</span>
        <span className="deck-hint">click, swipe, or use arrow keys</span>
        {pdf && (
          <a className="deck-pdf" href={pdf} target="_blank" rel="noreferrer">
            open original PDF ↗
          </a>
        )}
      </div>
    </section>
  );
}
