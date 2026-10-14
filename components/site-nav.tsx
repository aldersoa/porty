"use client";

import Link from "next/link";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

type CurrentPage = "about" | "work" | "play";

const links: Array<{ id: CurrentPage; href: string; label: string }> = [
  { id: "about", href: "/", label: "about" },
  { id: "work", href: "/work", label: "work" },
  { id: "play", href: "/play", label: "play" },
];

export function SiteNav({ current = "about" }: { current?: CurrentPage }) {
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const frameRef = useRef<number | null>(null);
  const [indicator, setIndicator] = useState({ x: 0, width: 0, ready: false, dance: 0 });

  const currentIndex = Math.max(0, links.findIndex((link) => link.id === current));

  const moveTo = useCallback((index: number, dance = true) => {
    if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    frameRef.current = window.requestAnimationFrame(() => {
      const nav = navRef.current;
      const link = linkRefs.current[index];
      if (!nav || !link) return;
      const navBox = nav.getBoundingClientRect();
      const linkBox = link.getBoundingClientRect();
      setIndicator((prior) => ({
        x: linkBox.left - navBox.left,
        width: linkBox.width,
        ready: true,
        dance: dance ? prior.dance + 1 : prior.dance,
      }));
    });
  }, []);

  useLayoutEffect(() => {
    moveTo(currentIndex, false);
    const onResize = () => moveTo(currentIndex, false);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, [currentIndex, moveTo]);

  return (
    <nav
      ref={navRef}
      className="site-nav"
      aria-label="Main navigation"
      onPointerLeave={() => moveTo(currentIndex)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) moveTo(currentIndex);
      }}
    >
      {links.map((link, index) => (
        <Link
          ref={(node) => { linkRefs.current[index] = node; }}
          aria-current={current === link.id ? "page" : undefined}
          href={link.href}
          key={link.id}
          onPointerEnter={() => moveTo(index)}
          onFocus={() => moveTo(index)}
        >
          {link.label}
        </Link>
      ))}
      <span
        className={`nav-squiggle${indicator.ready ? " is-ready" : ""}`}
        style={{ width: indicator.width, transform: `translateX(${indicator.x}px)` }}
        aria-hidden="true"
      >
        <span key={indicator.dance} />
      </span>
    </nav>
  );
}
