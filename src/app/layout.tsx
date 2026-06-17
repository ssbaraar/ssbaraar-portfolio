import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/portfolio/theme-provider";

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
  title: "Baraar Sreesha — Applied AI & GTM Engineer who ships to production",
  description:
    "Applied AI • GenAI • Forward-Deployed • Fractional GTM Engineer. I build agentic pipelines, RAG systems, and Clay/n8n/HubSpot automation for B2B revenue teams — deployed, not demoed. Blog includes production tutorials on LangGraph, CrewAI, n8n, and Clay pipelines.",
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
  authors: [{ name: "Baraar Sreesha Sreenivas" }],
  openGraph: {
    title: "Baraar Sreesha — Applied AI & GTM Engineer",
    description:
      "I build AI systems that work in production, not just demos. Agentic pipelines • RAG • GTM automation. Available fractional & full-time, remote worldwide.",
    siteName: "Baraar Sreesha",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Baraar Sreesha — Applied AI & GTM Engineer",
    description:
      "Agentic AI • RAG • GTM automation that ships to production. Bengaluru, remote worldwide.",
  },
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
