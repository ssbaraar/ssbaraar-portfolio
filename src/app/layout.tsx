import type { Metadata } from "next";
import {
  Inter,
  Bricolage_Grotesque,
  JetBrains_Mono,
  Instrument_Serif,
} from "next/font/google";
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

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
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
    default: "Baraar Sreesha — AI Agent & Applied AI Engineer",
    template: "%s — Baraar Sreesha",
  },
  description:
    "AI Agent & Applied AI Engineer. I build agentic pipelines, RAG systems, and Clay/n8n/Make automation for B2B GTM teams — forward-deployed, production-ready, not just demos.",
  keywords: [
    "AI Agent Engineer",
    "Applied AI Engineer",
    "GenAI Engineer",
    "Agentic Engineer",
    "Agentic Systems Engineer",
    "Forward Deployed Engineer",
    "Fractional GTM Engineer",
    "AI Automation Engineer",
    "GTM Engineer",
    "Clay n8n Specialist",
    "Make Zapier Automation",
    "RAG",
    "LangGraph",
    "CrewAI",
    "AutoGen",
    "FastAPI",
    "Clay",
    "n8n",
    "Make",
    "Zapier",
    "HubSpot automation",
    "Fractional AI",
    "Baraar",
    "Sreesha",
    "Sreenivas",
    "Baraar Sreesha",
    "Baraar Sreenivas",
    "Sreesha Baraar",
    "Sreesha Sreenivas",
    "Sreenivas Baraar",
    "Sreenivas Sreesha",
    "Baraar Sreesha Sreenivas",
    "Baraar Sreenivas Sreesha",
    "Sreesha Baraar Sreenivas",
    "Sreesha Sreenivas Baraar",
    "Sreenivas Baraar Sreesha",
    "Sreenivas Sreesha Baraar",
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
    title: "Baraar Sreesha — AI Agent & Applied AI Engineer",
    description:
      "I build AI Agent pipelines, RAG systems, and GTM automation for B2B revenue teams — forward-deployed to production. Available fractional & full-time, remote worldwide.",
    siteName: "Baraar Sreesha",
    type: "website",
    url: "/",
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Baraar Sreesha — AI Agent & Applied AI Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Baraar Sreesha — AI Agent & Applied AI Engineer",
    description:
      "AI Agents • RAG • GTM automation that ships to production. Bengaluru, remote worldwide.",
    images: ["/opengraph-image"],
    site: "@sreesha_baraar",
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
      givenName: "Baraar",
      additionalName: "Sreesha",
      familyName: "Sreenivas",
      alternateName: [
        // singles
        "Baraar",
        "Sreesha",
        "Sreenivas",
        // 2-word permutations
        "Baraar Sreesha",
        "Baraar Sreenivas",
        "Sreesha Baraar",
        "Sreesha Sreenivas",
        "Sreenivas Baraar",
        "Sreenivas Sreesha",
        // 3-word permutations
        "Baraar Sreesha Sreenivas",
        "Baraar Sreenivas Sreesha",
        "Sreesha Baraar Sreenivas",
        "Sreesha Sreenivas Baraar",
        "Sreenivas Baraar Sreesha",
        "Sreenivas Sreesha Baraar",
      ],
      url: SITE_URL,
      email: "ssbaraar02@gmail.com",
      jobTitle: "AI Agent & Applied AI Engineer",
      description:
        "AI Agent and Applied AI Engineer building agentic pipelines, RAG systems, and GTM automation for B2B revenue teams. Forward-deployed engineer based in Bengaluru, available remote worldwide.",
      sameAs: [
        "https://www.linkedin.com/in/baraarsreesha",
        "https://github.com/ssbaraar",
        "https://twitter.com/sreesha_baraar",
        "https://huggingface.co/ssbaraar",
        "https://medium.com/@baraarsreeshasreenivas",
        "https://www.f6s.com/member/sreesha-baraar",
        "https://ssbaraar-portfolio.vercel.app",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bengaluru",
        addressCountry: "IN",
      },
      knowsAbout: [
        "Applied AI Engineering",
        "AI Agent Engineering",
        "GenAI Engineering",
        "Agentic Engineering",
        "Agentic Systems",
        "Forward Deployed AI Engineering",
        "Fractional AI Engineering",
        "AI Automation Engineering",
        "LangGraph",
        "CrewAI",
        "AutoGen",
        "LangChain",
        "RAG Systems",
        "Retrieval Augmented Generation",
        "GTM Automation",
        "GTM Engineering",
        "Revenue Operations Automation",
        "n8n",
        "Clay",
        "Make",
        "Zapier",
        "HubSpot",
        "FastAPI",
        "Qdrant",
        "Pinecone",
      ],
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profile`,
      url: SITE_URL,
      name: "Baraar Sreesha — AI Agent & Applied AI Engineer",
      about: { "@id": `${SITE_URL}/#person` },
      mainEntity: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Baraar Sreesha",
      description: "Portfolio and blog of Baraar Sreesha — AI Agent & Applied AI Engineer",
      publisher: { "@id": `${SITE_URL}/#person` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/?view=blog&q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "VideoObject",
      "@id": `${SITE_URL}/#datastax-video`,
      name: "DataStax AI Hero: Sreesha Baraar",
      description:
        "Baraar Sreesha Sreenivas featured by DataStax as an AI Hero — sharing insights on Generative AI engineering, favorite dev tools (Langflow, Deepseek), and advice for aspiring AI engineers.",
      thumbnailUrl: "https://i.ytimg.com/vi/yYd5TDdlD0A/hqdefault.jpg",
      embedUrl: "https://www.youtube.com/embed/yYd5TDdlD0A",
      contentUrl: "https://www.youtube.com/shorts/yYd5TDdlD0A",
      uploadDate: "2025-01-01",
      duration: "PT1M54S",
      publisher: {
        "@type": "Organization",
        name: "DataStax",
        url: "https://www.datastax.com",
      },
      author: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: "Baraar Sreesha — AI Engineering Services",
      provider: { "@id": `${SITE_URL}/#person` },
      url: SITE_URL,
      serviceType: [
        "AI Agent Engineering",
        "Applied AI Engineering",
        "RAG System Development",
        "GTM Automation",
        "Agentic Workflow Build",
        "Fractional AI Engineering",
        "Forward Deployed AI Engineering",
      ],
      areaServed: { "@type": "Place", name: "Worldwide (Remote)" },
      availableLanguage: "English",
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
        className={`${inter.variable} ${bricolage.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}
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
