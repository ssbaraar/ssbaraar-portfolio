import { Navbar } from "@/components/portfolio/navbar";
import { Footer } from "@/components/portfolio/footer";
import { CursorGlow } from "@/components/portfolio/cursor-glow";
import { AntiInspect } from "@/components/portfolio/anti-inspect";
import { AdminPanel } from "@/components/portfolio/admin-panel";
import { HomePage } from "@/components/portfolio/home-page";
import { BlogIndex } from "@/components/portfolio/blog-index";
import { BlogPostPage } from "@/components/portfolio/blog-post-page";
import { blogPosts } from "@/lib/blog-posts";
import { getAllPosts, getPostBySlug } from "@/lib/storage";
import type { Metadata } from "next";

type SearchParams = {
  view?: string;
  blog?: string;
};

/**
 * Server component — reads URL params and renders the right view.
 *
 * Routes (all on `/`):
 *   /                  → homepage (portfolio)
 *   /?view=blog        → blog index (full screen, all posts)
 *   /?blog=<slug>      → full-screen blog post
 *
 * Server-rendered for SEO: built-in blog posts are in the bundle.
 * Stored posts (created via admin panel) are fetched from KV/file storage
 * so they're SSR'd too — visible to all visitors + indexed by Google.
 */
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  // Full-screen blog post view
  if (params.blog) {
    // Try storage first (admin-created posts), then built-in
    const storedPost = await getPostBySlug(params.blog);
    const post = storedPost || blogPosts.find((p) => p.slug === params.blog);

    if (post) {
      // Fetch all posts for the "related posts" section
      const allPosts = await getAllPosts();
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ssbaraar-portfolio.vercel.app";
      const blogPostSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${siteUrl}/?blog=${post.slug}#article`,
        headline: post.title,
        description: post.description ?? post.excerpt,
        url: `${siteUrl}/?blog=${post.slug}`,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        author: { "@id": `${siteUrl}/#person` },
        publisher: { "@id": `${siteUrl}/#website` },
        ...(post.keywords ? { keywords: post.keywords.join(", ") } : {}),
        ...(post.coverImage ? { image: { "@type": "ImageObject", url: `${siteUrl}${post.coverImage}` } } : {}),
      };
      return (
        <div className="relative flex min-h-screen flex-col bg-background">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
          />
          <AntiInspect />
          <CursorGlow />
          <BlogPostPage post={post} allPosts={allPosts} />
          <Footer />
          <AdminPanel />
        </div>
      );
    }

    // Fall through to client component (checks localStorage as last resort)
    return (
      <div className="relative flex min-h-screen flex-col bg-background">
        <AntiInspect />
        <CursorGlow />
        <BlogPostPage slug={params.blog} allPosts={blogPosts} />
        <Footer />
        <AdminPanel />
      </div>
    );
  }

  // Blog index view
  if (params.view === "blog") {
    return (
      <div className="relative flex min-h-screen flex-col bg-background">
        <AntiInspect />
        <CursorGlow />
        <Navbar />
        <BlogIndex />
        <Footer />
        <AdminPanel />
      </div>
    );
  }

  // Default: homepage
  return <HomePage />;
}

// ─── Dynamic metadata per route ────────────────────────────────────────────
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const params = await searchParams;

  if (params.blog) {
    const storedPost = await getPostBySlug(params.blog);
    const post = storedPost || blogPosts.find((p) => p.slug === params.blog);
    if (post) {
      return {
        title: post.title,
        description: post.description ?? post.excerpt,
        keywords: post.keywords,
        authors: [{ name: post.author.name }],
        alternates: { canonical: `/?blog=${post.slug}` },
        openGraph: {
          title: post.title,
          description: post.excerpt,
          type: "article",
          publishedTime: post.publishedAt,
          authors: [post.author.name],
          siteName: "Baraar Sreesha",
          url: `/?blog=${post.slug}`,
          images: post.coverImage
            ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }]
            : [{ url: "/opengraph-image", width: 1200, height: 630, alt: post.title }],
        },
        twitter: {
          card: "summary_large_image",
          title: post.title,
          description: post.excerpt,
          images: post.coverImage ? [post.coverImage] : ["/opengraph-image"],
          creator: "@sreesha_baraar",
        },
      };
    }
  }

  if (params.view === "blog") {
    return {
      title: "Blog",
      description:
        "Tutorials, framework comparisons, and case studies from building production AI and GTM automation systems. LangGraph, CrewAI, n8n, Clay, RAG, multi-agent workflows.",
      keywords: [
        "AI engineering blog",
        "LangGraph tutorial",
        "n8n self-hosting",
        "Clay pipeline",
        "GTM automation",
        "RAG systems",
        "Applied AI engineer blog",
      ],
      alternates: { canonical: "/?view=blog" },
      openGraph: {
        title: "Blog — Baraar Sreesha",
        description:
          "Production AI tutorials, framework comparisons, and case studies.",
        siteName: "Baraar Sreesha",
        type: "website",
        url: "/?view=blog",
        images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
      },
      twitter: {
        card: "summary_large_image",
        title: "Blog — Baraar Sreesha",
        description: "Production AI tutorials, framework comparisons, and case studies.",
        images: ["/opengraph-image"],
        creator: "@sreesha_baraar",
      },
    };
  }

  return {
    title: "Baraar Sreesha — Applied AI & GTM Engineer",
    description:
      "Applied AI & GTM Engineer. I build agentic pipelines, RAG systems, and Clay/n8n/HubSpot automation for B2B revenue teams — deployed to production, not just demoed.",
    alternates: { canonical: "/" },
    openGraph: {
      title: "Baraar Sreesha — Applied AI & GTM Engineer",
      description:
        "Agentic AI • RAG • GTM automation that ships to production. Bengaluru, remote worldwide.",
      siteName: "Baraar Sreesha",
      type: "website",
      url: "/",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Baraar Sreesha — Applied AI & GTM Engineer" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Baraar Sreesha — Applied AI & GTM Engineer",
      description: "Agentic AI • RAG • GTM automation that ships to production.",
      images: ["/opengraph-image"],
      creator: "@sreesha_baraar",
    },
  };
}
