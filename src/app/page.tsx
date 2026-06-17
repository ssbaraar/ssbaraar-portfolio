import { Navbar } from "@/components/portfolio/navbar";
import { Footer } from "@/components/portfolio/footer";
import { CursorGlow } from "@/components/portfolio/cursor-glow";
import { AntiInspect } from "@/components/portfolio/anti-inspect";
import { AdminPanel } from "@/components/portfolio/admin-panel";
import { HomePage } from "@/components/portfolio/home-page";
import { BlogIndex } from "@/components/portfolio/blog-index";
import { BlogPostPage } from "@/components/portfolio/blog-post-page";
import { blogPosts } from "@/lib/blog-posts";
import type { Metadata } from "next";

type SearchParams = {
  view?: string;
  blog?: string;
};

/**
 * Server component — reads URL params and renders the right view.
 *
 * Routes (all on `/` — single-page app pattern):
 *   /                  → homepage (portfolio)
 *   /?view=blog        → blog index (full screen, all posts)
 *   /?blog=<slug>      → full-screen blog post
 *
 * Server-rendered for SEO: built-in blog posts are in the bundle,
 * so individual post pages get proper SSR + metadata + JSON-LD.
 */
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  // Full-screen blog post view
  if (params.blog) {
    const post = blogPosts.find((p) => p.slug === params.blog);
    if (post) {
      return (
        <div className="relative flex min-h-screen flex-col bg-background">
          <AntiInspect />
          <CursorGlow />
          <BlogPostPage post={post} allPosts={blogPosts} />
          <Footer />
          <AdminPanel />
        </div>
      );
    }
    // If slug doesn't match a built-in post, fall through to client-side
    // component that can also check localStorage (for admin-panel posts)
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
    const post = blogPosts.find((p) => p.slug === params.blog);
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
        },
        twitter: {
          card: "summary_large_image",
          title: post.title,
          description: post.excerpt,
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
