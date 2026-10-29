"use client";

import { useMemo, useState } from "react";
import { Board } from "@/data/boards";
import BoardCard from "./BoardCard";

type BoardExplorerProps = {
  boards: Board[];
};

export default function BoardExplorer({ boards }: BoardExplorerProps) {
  const [query, setQuery] = useState("");

  const filteredBoards = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return boards.filter((board) => {
      const matchesQuery =
        !normalizedQuery ||
        board.name.toLowerCase().includes(normalizedQuery) ||
        board.description.toLowerCase().includes(normalizedQuery) ||
        (board.tags ?? []).some((tag) =>
          tag.toLowerCase().includes(normalizedQuery),
        );
      return matchesQuery;
    });
  }, [boards, query]);

  const clearFilters = () => {
    setQuery("");
  };

  return (
    <section>
      <div className="mb-5">
        <label htmlFor="board-search" className="sr-only">
          Search job boards
        </label>
        <input
          id="board-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search by board name, description, or tag"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-400"
        />
      </div>

      <div className="mb-6 flex items-center justify-between gap-3">
        <p
          aria-live="polite"
          className="text-sm text-gray-600 dark:text-gray-300"
        >
          Showing {filteredBoards.length} of {boards.length} boards
        </p>
        {query && (
          <button type="button" onClick={clearFilters} className="search-clear">
            Clear search
          </button>
        )}
      </div>

      {filteredBoards.length > 0 ? (
        <div className="board-grid">
          {filteredBoards.map((board) => (
            <BoardCard key={board.name} board={board} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            No matching boards
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Try another keyword, or clear your search to see all boards.
          </p>
          <button type="button" onClick={clearFilters} className="empty-reset">
            Clear search
          </button>
        </div>
      )}
    </section>
  );
}
