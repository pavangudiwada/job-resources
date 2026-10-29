import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/app/components/SiteHeader";
import BoardCard from "@/app/[category]/BoardCard";
import {
  getBoardsForSeoCollection,
  getSeoCollectionBySlug,
  seoCollections,
} from "@/data/seoCollections";

type RouteParams = { slug: string };

export async function generateStaticParams() {
  return seoCollections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getSeoCollectionBySlug(slug);

  if (!collection) {
    return {
      title: "Collection Not Found | Job Resources",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${collection.title} | Job Resources`,
    description: collection.description,
    alternates: {
      canonical: `/best/${collection.slug}`,
    },
    openGraph: {
      title: `${collection.title} | Job Resources`,
      description: collection.description,
      url: `/best/${collection.slug}`,
      type: "website",
    },
    twitter: {
      title: `${collection.title} | Job Resources`,
      description: collection.description,
      card: "summary_large_image",
    },
  };
}

export default async function BestCollectionPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const collection = getSeoCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const relevantBoards = getBoardsForSeoCollection(collection);
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: collection.title,
    description: collection.description,
    url: `https://jobresources.fyi/best/${collection.slug}`,
  };

  return (
    <>
      <SiteHeader />
      <main className="standalone-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
        />
        <div className="mb-8">
          <Link href="/best" className="back-link">
            Back to all collections
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {collection.title}
          </h1>
          <p className="standalone-intro">{collection.intro}</p>
        </div>

        {relevantBoards.length > 0 ? (
          <div className="board-grid">
            {relevantBoards.map((board) => (
              <BoardCard key={board.name} board={board} />
            ))}
          </div>
        ) : (
          <p className="standalone-intro">
            No matching boards found for this topic.
          </p>
        )}
      </main>
    </>
  );
}
