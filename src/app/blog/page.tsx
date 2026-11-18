import type { Metadata } from "next";
import { BlogIndex } from "@/components/portfolio/blog-index";
import "./journal.css";
export const metadata: Metadata = {
  title: "Applied AI Engineering Notes",
  description:
    "Practical notes on RAG, agentic systems, LLM cost control, and AI workflows that run in production.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Applied AI Engineering Notes | Baraar Sreesha",
    description:
      "Practical notes on RAG, agentic systems, LLM cost control, and production AI workflows.",
    type: "website",
    url: "/blog",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};
export default function BlogPage() {
  return (
    <div className="journal relative flex min-h-screen flex-col bg-background">
      <header className="journal-header"><a href="/">Baraar Sreesha</a><span>Engineering notes</span></header>
      <BlogIndex />
    </div>
  );
}
