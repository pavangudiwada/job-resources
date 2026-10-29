"use client";

import Link from "next/link";
import Image from "next/image";
import { Board } from "@/data/boards";
import { useEffect, useRef, useState } from "react";

export default function BoardCard({ board }: { board: Board }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const request = useRef(0);
  const [instant, setInstant] = useState(false);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
      request.current++;
    },
    [],
  );
  const handleCopy = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const currentRequest = ++request.current;
    if (timer.current) clearTimeout(timer.current);
    setInstant(event.detail === 0);
    let result: "copied" | "error";
    try {
      await navigator.clipboard.writeText(board.link);
      result = "copied";
    } catch {
      result = "error";
    }
    if (currentRequest !== request.current) return;
    setStatus(result);
    timer.current = setTimeout(() => setStatus("idle"), 2500);
  };
  const url = new URL(board.link);
  const domain = url.hostname;
  url.searchParams.set("ref", "jobresources.fyi");
  return (
    <article className="board-card">
      <div className="card-heading">
        <Image
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
          alt=""
          width={20}
          height={20}
          unoptimized
        />
        <h3>{board.name}</h3>
      </div>
      <p className="card-description">{board.description}</p>
      {board.tags && board.tags.length > 0 && (
        <div className="tags">
          {board.tags.map((tag, index) => (
            <span key={`${tag}-${index}`}>{tag}</span>
          ))}
        </div>
      )}
      <div className="card-actions">
        <button
          type="button"
          onClick={handleCopy}
          aria-label={`Copy link to ${board.name}`}
        >
          <span className="copy-labels" data-instant={instant || undefined} aria-hidden="true">
            <span data-active={status === "idle"}>Copy link</span>
            <span data-active={status === "copied"}>Copied</span>
            <span data-active={status === "error"}>Copy failed</span>
          </span>
          <span className="visually-hidden" aria-live="polite">
            {status === "copied" ? "Copied" : status === "error" ? "Copy failed" : ""}
          </span>
        </button>
        <Link href={url.toString()} target="_blank" rel="noopener noreferrer">
          Explore board <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
