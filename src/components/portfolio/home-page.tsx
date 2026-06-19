"use client";

import { Navbar } from "@/components/portfolio/navbar";
import { Hero } from "@/components/portfolio/hero";
import { Marquee } from "@/components/portfolio/marquee";
import { Stats } from "@/components/portfolio/stats";
import { AudienceToggle } from "@/components/portfolio/audience-toggle";
import { Problem } from "@/components/portfolio/problem";
import { Services } from "@/components/portfolio/services";
import { CaseStudies } from "@/components/portfolio/case-studies";
import { Process } from "@/components/portfolio/process";
import { TechStack } from "@/components/portfolio/tech-stack";
import { About } from "@/components/portfolio/about";
import { FAQ } from "@/components/portfolio/faq";
import { Blog } from "@/components/portfolio/blog";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";
import { AntiInspect } from "@/components/portfolio/anti-inspect";
import { AdminPanel } from "@/components/portfolio/admin-panel";
import { PageViewTracker } from "@/components/portfolio/page-view-tracker";

export function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <PageViewTracker />
      <AntiInspect />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <Stats />
        <AudienceToggle />
        <Problem />
        <Services />
        <CaseStudies />
        <Process />
        <TechStack />
        <About />
        <FAQ />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <AdminPanel />
    </div>
  );
}
