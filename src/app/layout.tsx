import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/portfolio/theme-provider";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ssbaraar-portfolio.vercel.app";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Baraar Sreesha — Applied AI & GTM Engineer",
    template: "%s — Baraar Sreesha",
  },
  description:
    "Applied AI & GTM Engineer. I build agentic pipelines, RAG systems, and Clay/n8n/HubSpot automation for B2B revenue teams — deployed to production, not just demoed.",
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
    "self-host n8n GCP",
    "LangGraph vs CrewAI comparison",
    "Clay pipeline lead intelligence",
  ],
  authors: [{ name: "Baraar Sreesha Sreenivas", url: SITE_URL }],
  creator: "Baraar Sreesha Sreenivas",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Baraar Sreesha — Applied AI & GTM Engineer",
    description:
      "I build agentic pipelines, RAG systems, and GTM automation for B2B revenue teams — deployed to production. Available fractional & full-time, remote worldwide.",
    siteName: "Baraar Sreesha",
    type: "website",
    url: "/",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Baraar Sreesha — Applied AI & GTM Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Baraar Sreesha — Applied AI & GTM Engineer",
    description:
      "Agentic AI • RAG • GTM automation that ships to production. Bengaluru, remote worldwide.",
    images: ["/opengraph-image"],
    creator: "@sreesha_baraar",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Baraar Sreesha Sreenivas",
      alternateName: "Baraar Sreesha",
      url: SITE_URL,
      jobTitle: "Applied AI & GTM Systems Engineer",
      description:
        "Applied AI Engineer building agentic pipelines, RAG systems, and GTM automation for B2B revenue teams. Based in Bengaluru, available remote worldwide.",
      sameAs: [
        "https://linkedin.com/in/baraarsreesha",
        "https://github.com/ssbaraar",
        "https://twitter.com/sreesha_baraar",
        "https://huggingface.co/ssbaraar",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bengaluru",
        addressCountry: "IN",
      },
      knowsAbout: [
        "Applied AI Engineering",
        "LangGraph",
        "CrewAI",
        "RAG Systems",
        "GTM Automation",
        "n8n",
        "Clay",
        "HubSpot",
        "FastAPI",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Baraar Sreesha",
      description: "Portfolio and blog of Baraar Sreesha — Applied AI & GTM Engineer",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: "Baraar Sreesha — AI Engineering Services",
      provider: { "@id": `${SITE_URL}/#person` },
      url: SITE_URL,
      serviceType: [
        "AI Engineering",
        "RAG System Development",
        "GTM Automation",
        "Agentic Workflow Build",
        "Fractional AI Engineering",
      ],
      areaServed: { "@type": "Place", name: "Worldwide (Remote)" },
      availableLanguage: "English",
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What's your rate?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Fixed-price: $1,500 (lead intelligence sprint) → $8,000 (full RAG / multi-agent build). Fractional retainers start at $1,500/month. I publish ranges to save us both time. Specifics on a 20-min call.",
          },
        },
        {
          "@type": "Question",
          name: "How long does a typical project take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "1–6 weeks. Lead intelligence sprint: 1–2 weeks. RAG system: 3–4 weeks. Multi-agent workflow: 3–5 weeks. Detailed scope doc with timeline before any work begins — no surprises.",
          },
        },
        {
          "@type": "Question",
          name: "Do you work on a retainer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. 8–20 hrs/week, $1,500–$4,000/month. Minimum 4-week commitment. Weekly async updates + monthly roadmap session included.",
          },
        },
        {
          "@type": "Question",
          name: "Can you show NDA-protected client work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "I share anonymized-but-specific details: industry, size, stack, outcomes. Reference contacts available (with client permission) for serious engagements.",
          },
        },
        {
          "@type": "Question",
          name: "Do you only do the build, or also the strategy?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Both. I translate your business objective into an architecture first — then build it. I won't recommend a technology before I understand what's actually broken.",
          },
        },
        {
          "@type": "Question",
          name: "What tools / stack do you use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "GenAI: LangGraph, CrewAI, AutoGen, LangChain. RAG: Qdrant, Pinecone, FAISS. GTM: Clay, n8n, HubSpot, Apollo. Backend: FastAPI + Docker. Right tool for the job, not the one I'm most comfortable with.",
          },
        },
        {
          "@type": "Question",
          name: "Do you handle deployment, or just the build?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Full deployment is included. Docker, cloud (GCP/AWS), monitoring, docs, handoff call. You get a running system, not a GitHub repo.",
          },
        },
        {
          "@type": "Question",
          name: "Are you open to full-time roles?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — remote Applied AI, GTM Engineer, Forward Deployed AI, AI Automation Engineering roles. Serious inquiries welcome.",
          },
        },
        {
          "@type": "Question",
          name: "Where are you based and what timezone?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Bengaluru, India — IST (UTC+5:30). Async-first, overlaps well with US morning + EU afternoon. Responds within 1 business day.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
