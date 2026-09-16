declare module "pdfjs-dist/build/pdf.mjs" {
  export const version: string;

  export const GlobalWorkerOptions: {
    workerSrc: string;
  };

  export function getDocument(source: {
    data: Uint8Array;
  }): {
    promise: Promise<{
      numPages: number;
      getPage: (pageNumber: number) => Promise<{
        getViewport: (opts: { scale: number }) => { width: number; height: number };
        render: (opts: {
          canvasContext: CanvasRenderingContext2D;
          viewport: { width: number; height: number };
        }) => { promise: Promise<void>; cancel: () => void };
      }>;
    }>;
  };
}
