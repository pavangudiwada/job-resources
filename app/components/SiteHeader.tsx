import Link from "next/link";
import { hubCategories } from "@/data/categories";
import MobileMenu from "./MobileMenu";

export default function SiteHeader({
  currentCategory = "",
}: {
  currentCategory?: string;
}) {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/popular" className="brand">
          <span className="brand-mark" aria-hidden="true">
            ↗
          </span>
          <span>
            Job Resources<small>Find your next opportunity</small>
          </span>
        </Link>
        <nav className="header-links" aria-label="Main navigation">
          <Link href="/popular">Job boards</Link>
          <Link href="/best">Collections</Link>
          <a
            href="https://github.com/pavangudiwada/job-resources"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
        </nav>
        <MobileMenu
          categories={hubCategories}
          currentCategory={currentCategory}
        />
      </div>
    </header>
  );
}
