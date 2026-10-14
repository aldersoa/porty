import Link from "next/link";
import { SiteNav } from "@/components/site-nav";

export function Header({ current }: { current?: "about" | "work" | "play" }) {
  return (
    <header className="site-header">
      <SiteNav current={current} />
      <Link className="wordmark" href="/">gail alderson</Link>
      <div className="site-social">
        <a href="https://www.linkedin.com/in/alderson1234/" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn (opens in a new tab)">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
          </svg>
        </a>
        <a href="mailto:abi.mar.ald@gmail.com" aria-label="Email">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-10 6L2 7" />
          </svg>
        </a>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer>
      <p>© 2026 Gail Alderson</p>
    </footer>
  );
}
