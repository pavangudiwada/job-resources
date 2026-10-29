import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";
import { seoCollections } from "@/data/seoCollections";

export const metadata: Metadata = {
  title: "Best Tech Job Board Collections | Job Resources",
  description:
    "Explore curated collections of the best job boards by intent: open source, security, AI/ML, startup, and more.",
  alternates: {
    canonical: "/best",
  },
  openGraph: {
    title: "Best Tech Job Board Collections | Job Resources",
    description:
      "Explore curated collections of the best job boards by intent: open source, security, AI/ML, startup, and more.",
    url: "/best",
    type: "website",
  },
};

export default function BestCollectionsPage() {
  return (
    <>
      <SiteHeader />
      <main className="standalone-content">
        <p className="eyebrow">Curated collections</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Best Job Board Collections
        </h1>
        <p className="standalone-intro">
          Find curated pathways for specific job search goals.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {seoCollections.map((collection) => (
            <Link
              key={collection.slug}
              href={`/best/${collection.slug}`}
              className="collection-card"
            >
              <h2 className="text-xl font-semibold mb-1">{collection.title}</h2>
              <p>{collection.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
