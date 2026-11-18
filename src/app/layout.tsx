import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/portfolio/theme-provider";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ssbaraar-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Baraar Sreesha — AI Consultant & Applied AI Engineer",
    template: "%s — Baraar Sreesha",
  },
  description:
    "AI Consultant & Applied AI Engineer. I embed with your team, map the process, select the models and tools, model the token cost — then build and deploy agentic pipelines and RAG systems that run in production.",
  authors: [{ name: "Baraar Sreesha Sreenivas", url: SITE_URL }],
  creator: "Baraar Sreesha Sreenivas",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Baraar Sreesha — AI Consultant & Applied AI Engineer",
    description:
      "I sit with your team, map the process, pick the models and tools, size the token cost — then build and deploy the system. Available fractional & full-time, remote worldwide.",
    siteName: "Baraar Sreesha",
    type: "website",
    url: "/",
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Baraar Sreesha — AI Consultant & Applied AI Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Baraar Sreesha — AI Consultant & Applied AI Engineer",
    description:
      "AI consulting that ends in a shipped system • process audit, tool selection, token economics. Bengaluru, remote worldwide.",
    images: ["/opengraph-image"],
    site: "@sreesha_baraar",
    creator: "@sreesha_baraar",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  verification: {
    google: "OADqFeNguM3HFV3j1wi7DG1C3ms6pJaipG18Y1q41Qc",
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
      alternateName: ["Baraar Sreesha", "Sreesha Baraar", "ssbaraar"],
      url: SITE_URL,
      email: "ssbaraar02@gmail.com",
      jobTitle: "AI Consultant & Applied AI Engineer",
      worksFor: {
        "@type": "Organization",
        name: "Motiveminds Consulting Private Limited",
      },
      description:
        "AI Consultant and Applied AI Engineer. Embeds with client teams to map process, select models and tools, model token cost, and build agentic pipelines and RAG systems that run in production. Based in Bengaluru, available remote worldwide.",
      sameAs: [
        "https://www.linkedin.com/in/baraarsreesha",
        "https://www.linkedin.com/in/ssbaraar",
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
        "AI Consulting",
        "AI Adoption Strategy",
        "AI Process Audit",
        "LLM Cost Optimization",
        "Token Cost Modelling",
        "AI Tool and Vendor Selection",
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
      name: "Baraar Sreesha — AI Consultant & Applied AI Engineer",
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
        "AI Consulting",
        "AI Adoption and Integration Consulting",
        "AI Cost and Tool Selection Review",
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
        className="font-sans antialiased bg-background text-foreground"
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
