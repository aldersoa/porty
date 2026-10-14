"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The interactive ALDERSON masthead (16-SVG switch kit): each hand-drawn letter
 * switches between its paired drawings each time it is hovered. Artwork lives in /public/letters;
 * motion lives in app/alderson-animations.css.
 */

const LETTERS = ["a", "l", "d", "e", "r", "s", "o", "n"] as const;

const artSrc = (index: number, letter: string, alternate: boolean) =>
  `/letters/${String(index + 1).padStart(2, "0")}-${letter}-${alternate ? "alternate" : "default"}.svg`;

function Character({ index, letter, previewDelay }: { index: number; letter: string; previewDelay?: number }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [alternate, setAlternate] = useState(false);
  const [previewing, setPreviewing] = useState(false);

  // Preload the alternate drawing so the first switch is instant.
  useEffect(() => {
    const preload = new Image();
    preload.src = artSrc(index, letter, true);
  }, [index, letter]);

  // Preview the interaction once so visitors do not have to discover it by accident.
  useEffect(() => {
    if (previewDelay === undefined || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = window.setTimeout(() => setPreviewing(true), previewDelay);
    const stop = window.setTimeout(() => setPreviewing(false), previewDelay + 520);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(stop);
    };
  }, [previewDelay]);

  const toggleForm = () => {
    setAlternate((current) => !current);
    const button = buttonRef.current;
    if (!button) return;
    /* Force reflow so each letter begins its transition immediately. */
    button.classList.remove("is-switching");
    void button.offsetWidth;
    button.classList.add("is-switching");
  };

  return (
    <button
      ref={buttonRef}
      className={`character${previewing ? " is-previewing" : ""}`}
      type="button"
      aria-pressed={alternate}
      aria-label={`Toggle alternate version of letter ${letter.toUpperCase()}`}
      onPointerEnter={toggleForm}
      onClick={(event) => {
        // Keyboard activation mirrors hover. Pointer entry already switched the form.
        if (event.detail === 0) toggleForm();
        // Pointer clicks should not leave a visual focus box behind. Keyboard
        // activation keeps focus and the accessible :focus-visible treatment.
        if (event.detail > 0) window.requestAnimationFrame(() => buttonRef.current?.blur());
      }}
      onAnimationEnd={(event) => {
        if (event.animationName === "switch-pop") {
          buttonRef.current?.classList.remove("is-switching");
        }
      }}
    >
      <span className="character__art">
        <img src={artSrc(index, letter, alternate)} alt="" draggable={false} />
      </span>
    </button>
  );
}

export function AldersonWordmark() {
  const previewDelays = new Map([[0, 500], [3, 760], [6, 1020]]);

  return (
    <div className="alderson-word" role="group" aria-label="ALDERSON, illustrated with playful hand-drawn letters">
      {LETTERS.map((letter, index) => (
        <Character key={letter} index={index} letter={letter} previewDelay={previewDelays.get(index)} />
      ))}
    </div>
  );
}
