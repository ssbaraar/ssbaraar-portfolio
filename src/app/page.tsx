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
      return (
        <div className="relative flex min-h-screen flex-col bg-background">
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
        title: `${post.title} — Baraar Sreesha`,
        description: post.description,
        keywords: post.keywords,
        authors: [{ name: post.author.name }],
        openGraph: {
          title: post.title,
          description: post.excerpt,
          type: "article",
          publishedTime: post.publishedAt,
          authors: [post.author.name],
          siteName: "Baraar Sreesha",
          images: post.coverImage ? [{ url: post.coverImage }] : undefined,
        },
        twitter: {
          card: "summary_large_image",
          title: post.title,
          description: post.excerpt,
          images: post.coverImage ? [post.coverImage] : undefined,
        },
      };
    }
  }

  if (params.view === "blog") {
    return {
      title: "Blog — Baraar Sreesha",
      description:
        "Tutorials, framework comparisons, and case studies from 2.5+ years of building production AI and GTM automation systems. LangGraph, CrewAI, n8n, Clay, RAG, multi-agent workflows.",
      keywords: [
        "AI engineering blog",
        "LangGraph tutorial",
        "n8n self-hosting",
        "Clay pipeline",
        "GTM automation",
        "RAG systems",
        "Applied AI engineer blog",
      ],
      openGraph: {
        title: "Blog — Baraar Sreesha",
        description:
          "Production AI tutorials, framework comparisons, and case studies.",
        siteName: "Baraar Sreesha",
        type: "website",
      },
    };
  }

  return {
    title: "Baraar Sreesha — Applied AI & GTM Engineer who ships to production",
    description:
      "Applied AI • GenAI • Forward-Deployed • Fractional GTM Engineer. I build agentic pipelines, RAG systems, and Clay/n8n/HubSpot automation for B2B revenue teams — deployed, not demoed.",
    keywords: [
      "Applied AI Engineer",
      "GenAI Engineer",
      "GTM Engineer",
      "Forward Deployed Engineer",
      "RAG",
      "LangGraph",
      "CrewAI",
      "AutoGen",
      "FastAPI",
      "Clay",
      "n8n",
      "HubSpot automation",
      "Fractional AI",
      "Baraar Sreesha",
    ],
    authors: [{ name: "Baraar Sreesha Sreenivas" }],
    openGraph: {
      title: "Baraar Sreesha — Applied AI & GTM Engineer",
      description:
        "Agentic AI • RAG • GTM automation that ships to production. Bengaluru, remote worldwide.",
      siteName: "Baraar Sreesha",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Baraar Sreesha — Applied AI & GTM Engineer",
      description:
        "Agentic AI • RAG • GTM automation that ships to production.",
    },
  };
}
