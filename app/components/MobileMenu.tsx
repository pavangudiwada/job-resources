"use client";

import Link from "next/link";
interface MobileMenuProps {
  categories: Array<{ id: string; name: string; description: string }>;
  currentCategory: string;
}

export default function MobileMenu({
  categories,
  currentCategory,
}: MobileMenuProps) {
  return (
    <details className="mobile-menu">
      <summary
        onClick={(event) => {
          event.currentTarget.parentElement?.setAttribute(
            "data-instant",
            String(event.detail === 0),
          );
        }}
      >
        Browse <span className="mobile-menu-chevron" aria-hidden="true">⌄</span>
      </summary>
      <nav className="mobile-menu-panel" aria-label="Browse categories">
        <Link href="/best">All collections</Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/${cat.id}`}
            aria-current={cat.id === currentCategory ? "page" : undefined}
          >
            {cat.name}
          </Link>
        ))}
        <a
          href="https://github.com/pavangudiwada/job-resources"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub ↗
        </a>
      </nav>
    </details>
  );
}
