"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The interactive ALDERSON masthead (16-SVG switch kit): each hand-drawn letter
 * floats gently on hover/focus and switches to its paired alternate drawing on
 * click (with a pop), toggling back on the next click. Artwork in /public/letters;
 * motion in app/alderson-animations.css (`shared-hover` / `switch-pop` keyframes).
 */

const LETTERS = ["a", "l", "d", "e", "r", "s", "o", "n"] as const;

const artSrc = (index: number, letter: string, alternate: boolean) =>
  `/letters/${String(index + 1).padStart(2, "0")}-${letter}-${alternate ? "alternate" : "default"}.svg`;

function Character({ index, letter }: { index: number; letter: string }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [alternate, setAlternate] = useState(false);

  // Preload the alternate drawing so the first switch is instant.
  useEffect(() => {
    const preload = new Image();
    preload.src = artSrc(index, letter, true);
  }, [index, letter]);

  const toggle = () => {
    setAlternate((current) => !current);
    const button = buttonRef.current;
    if (!button) return;
    /* Force reflow so rapid clicks restart the pop animation. */
    button.classList.remove("is-switching");
    void button.offsetWidth;
    button.classList.add("is-switching");
  };

  return (
    <button
      ref={buttonRef}
      className="character"
      type="button"
      aria-pressed={alternate}
      aria-label={`Toggle alternate version of letter ${letter.toUpperCase()}`}
      onClick={toggle}
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
  return (
    <div className="alderson-word" role="group" aria-label="ALDERSON, illustrated with playful hand-drawn letters">
      {LETTERS.map((letter, index) => (
        <Character key={letter} index={index} letter={letter} />
      ))}
    </div>
  );
}
