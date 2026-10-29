"use client";
import { usePathname } from "next/navigation";

export default function FloatingActionBar() {
  const pathname = usePathname();
  const url = encodeURIComponent(
    `https://jobresources.fyi${pathname || "/popular"}`,
  );
  const title = encodeURIComponent("Find curated job boards on Job Resources");
  const items = [
    ["X", `https://twitter.com/intent/tweet?url=${url}&text=${title}`],
    ["LinkedIn", `https://www.linkedin.com/sharing/share-offsite/?url=${url}`],
    ["Reddit", `https://www.reddit.com/submit?url=${url}&title=${title}`],
    ["WhatsApp", `https://wa.me/?text=${title}%20${url}`],
    ["Telegram", `https://t.me/share/url?url=${url}&text=${title}`],
    ["Email", `mailto:?subject=${title}&body=${title}%0A%0A${url}`],
  ];
  return (
    <footer className="share-footer">
      <div>
        <strong>Know a great job board?</strong>
        <p>Help make this directory more useful.</p>
        <a
          href="https://github.com/pavangudiwada/job-resources/issues/new"
          target="_blank"
          rel="noopener noreferrer"
        >
          Suggest a board ↗
        </a>
      </div>
      <div>
        <strong>Share this page</strong>
        <div className="share-links">
          {items.map(([name, href]) => (
            <a
              key={name}
              href={href}
              target={name === "Email" ? undefined : "_blank"}
              rel="noopener noreferrer"
            >
              {name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
