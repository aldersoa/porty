"use client";

import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";

type ProgressiveImageProps = ImgHTMLAttributes<HTMLImageElement>;

function blurSource(src: string) {
  if (!src.startsWith("/media/")) return null;
  return src.replace("/media/", "/media-blur/").replace(/\.(?:gif|jpe?g|png|webp)$/i, ".jpg");
}

/**
 * Shows a tiny, locally generated preview while the full image downloads.
 * The preview preserves the final aspect ratio, which also prevents layout shift.
 */
export function ProgressiveImage({ src = "", alt = "", className, ...props }: ProgressiveImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const source = typeof src === "string" ? src : "";
  const preview = blurSource(source);

  useEffect(() => {
    if (imageRef.current?.complete && imageRef.current.naturalWidth > 0) setLoaded(true);
  }, [source]);

  if (!preview) {
    return <img ref={imageRef} src={src} alt={alt} className={className} {...props} />;
  }

  return (
    <span className={`progressive-image${loaded ? " is-loaded" : ""}`}>
      <img
        className="progressive-image__preview"
        src={preview}
        alt=""
        aria-hidden="true"
        loading={props.loading}
        decoding="async"
      />
      <img
        ref={imageRef}
        className={["progressive-image__full", className].filter(Boolean).join(" ")}
        src={src}
        alt={alt}
        decoding="async"
        onLoad={() => setLoaded(true)}
        {...props}
      />
    </span>
  );
}
