import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 300; // refresh every 5 min

const BASE_URL = "https://baraarsreesha.com";

// GET /sitemap.xml — auto-generated from all posts (built-in + stored)
// Replaces the static public/sitemap.xml file.
export async function GET() {
  const posts = await getAllPosts();

  const urls = [
    {
      loc: `${BASE_URL}/`,
      changefreq: "weekly",
      priority: "1.0",
    },
    {
      loc: `${BASE_URL}/?view=blog`,
      changefreq: "daily",
      priority: "0.9",
    },
    {
      loc: `${BASE_URL}/llm.txt`,
      changefreq: "monthly",
      priority: "0.5",
    },
    ...posts.map((p) => ({
      loc: `${BASE_URL}/?blog=${p.slug}`,
      changefreq: "monthly",
      priority: "0.8",
      lastmod: p.publishedAt,
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ""}
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=300, s-maxage=300",
    },
  });
}
