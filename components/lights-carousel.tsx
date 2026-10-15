"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { ProgressiveImage } from "@/components/progressive-image";

export type LightsCarouselImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type LightsCarouselProps = {
  images: LightsCarouselImage[];
};

const MAX_VISIBILITY = 2;

export function LightsCarousel({ images }: LightsCarouselProps) {
  const [active, setActive] = useState(0);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);

  if (images.length === 0) return null;

  const move = (direction: -1 | 1) => {
    setActive((current) => (current + direction + images.length) % images.length);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    pointerStart.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start) return;

    const distanceX = event.clientX - start.x;
    const distanceY = event.clientY - start.y;
    if (Math.abs(distanceX) < 44 || Math.abs(distanceX) <= Math.abs(distanceY)) {
      const element = document.elementFromPoint(event.clientX, event.clientY);
      const slide = element?.closest<HTMLElement>(".lights-carousel__slide");
      const index = Number(slide?.dataset.index);
      if (Number.isFinite(index) && index !== active) {
        setActive(index);
      }
      return;
    }
    move(distanceX < 0 ? 1 : -1);
  };

  return (
    <figure
      className="lights-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Gail's collection of light photographs"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div
        className="lights-carousel__stage"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => { pointerStart.current = null; }}
      >
        {images.map((image, index) => {
          let offset = active - index;
          if (offset > images.length / 2) offset -= images.length;
          if (offset < -images.length / 2) offset += images.length;
          const absoluteOffset = Math.abs(offset);
          const isVisible = absoluteOffset <= MAX_VISIBILITY;
          const photoWidth = Math.min(100, (image.width / image.height) * 111);
          const style = {
            "--carousel-offset": offset / 3,
            "--carousel-abs-offset": absoluteOffset / 3,
            "--carousel-direction": Math.sign(offset),
            "--photo-width": `${photoWidth}%`,
            display: isVisible ? "grid" : "none",
            opacity: isVisible ? 1 - absoluteOffset * 0.3 : 0,
            pointerEvents: index === active ? "none" : "auto",
            zIndex: images.length - absoluteOffset,
          } as CSSProperties;

          return (
            <div
              className={`lights-carousel__slide${index === active ? " is-active" : ""}`}
              style={style}
              data-index={index}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${images.length}`}
              aria-hidden={index !== active}
              key={image.src}
            >
              <div className="lights-carousel__card">
                {isVisible && (
                  <ProgressiveImage
                    src={image.src}
                    alt={index === active ? image.alt : ""}
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          );
        })}

      </div>

      <figcaption className="lights-carousel__caption">
        <span><span className="fig-n">fig. b</span>i&rsquo;m not weird about lights, YOU&rsquo;RE weird</span>
      </figcaption>
      <span className="sr-only" aria-live="polite">Photograph {active + 1} of {images.length}</span>
    </figure>
  );
}
