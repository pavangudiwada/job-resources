import { hubCategories } from "@/data/categories";
import { getBoardsByCategory, Category } from "@/data/boards";
import { seoFooterCollections } from "@/data/seoCollections";
import BoardExplorer from "./BoardExplorer";
import FloatingActionBar from "./FloatingActionBar";
import Link from "next/link";
import WelcomeBanner from "@/app/components/WelcomeBanner";
import SiteHeader from "@/app/components/SiteHeader";
import { Analytics } from "@vercel/analytics/next";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type RouteParams = { category: string };

export async function generateStaticParams() {
  return hubCategories.map((category) => ({ category: category.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { category } = await params;
  const currentCategory = hubCategories.find((cat) => cat.id === category);

  if (!currentCategory) {
    return {
      title: "Category Not Found | Job Resources",
      robots: { index: false, follow: false },
    };
  }

  const title = `${currentCategory.name} Job Boards | Job Resources`;
  const description = `Browse curated ${currentCategory.name.toLowerCase()} job boards to find your next opportunity.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${currentCategory.id}`,
    },
    openGraph: {
      title,
      description,
      url: `/${currentCategory.id}`,
      type: "website",
    },
    twitter: {
      title,
      description,
      card: "summary_large_image",
    },
  };
}

export default async function JobBoards({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { category } = (await params) as { category: Category };

  const currentCategory = hubCategories.find((cat) => cat.id === category);
  const boards = getBoardsByCategory(category);
  if (!currentCategory) {
    notFound();
  }

  return (
    <div className="site-shell">
      <WelcomeBanner />
      <SiteHeader currentCategory={category} />
      <div className="directory-layout">
        <aside className="sidebar">
          <p className="eyebrow">Browse by category</p>
          <nav aria-label="Job board categories">
            {hubCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/${cat.id}`}
                aria-current={cat.id === category ? "page" : undefined}
              >
                {cat.name}
              </Link>
            ))}
          </nav>
          <Link href="/best" className="sidebar-collections">
            Explore collections →
          </Link>
        </aside>
        <main className="content">
          <div className="page-intro">
            <p className="eyebrow">Job board directory</p>
            <h1>{currentCategory.name} Job Boards</h1>
            <p>{currentCategory.description}</p>
          </div>
          <BoardExplorer boards={boards} />
          <section className="collections-section">
            <p className="eyebrow">Keep exploring</p>
            <h2>Curated collections</h2>
            <p>Find boards for a more focused job search.</p>
            <div className="collection-links">
              {seoFooterCollections.map((collection) => (
                <Link key={collection.slug} href={`/best/${collection.slug}`}>
                  {collection.title} <span aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
            <Link className="all-collections" href="/best">
              View all collections →
            </Link>
          </section>
          <FloatingActionBar />
        </main>
        <Analytics />
      </div>
    </div>
  );
}
