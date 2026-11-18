import { blogPosts } from "@/lib/blog-posts";

const resume = "/Baraar_Sreesha_Resume_ATS_2026.pdf";
const book = "https://calendly.com/baraarsreesha/intro_call";

const projects = [
  { sector: "Enterprise knowledge", title: "Answers with a paper trail", result: "Under 2 min", unit: "to find an answer", story: "Employees spent 30–90 minutes searching across hundreds of internal PDFs. I built a retrieval assistant that combines keyword and vector search and links each answer to its source.", stack: "Python · BM25 · FAISS · FastAPI" },
  { sector: "Revenue operations", title: "A fresher lead list in HubSpot", result: "Under 30 min", unit: "of daily SDR research", story: "A US software sales team spent 3–4 hours a day researching prospects. I connected sourcing, enrichment and CRM routing so reps could work from records refreshed every 7–14 days.", stack: "Clay · Python · n8n · HubSpot API" },
  { sector: "Hyderabad Forex Limited", title: "Less retyping at onboarding", result: "40% less", unit: "manual data entry", story: "I built an OCR pipeline and FastAPI endpoints to extract KYC details from documents. The forex team cut onboarding turnaround by 30%.", stack: "OCR · Python · FastAPI · REST APIs" },
  { sector: "Sales enablement", title: "From account brief to pitch deck", result: "Under 10 min", unit: "per deck and email", story: "Preparing a deck and a personalized email took a sales team 2–4 hours. I connected account research to Google Slides and Gmail, with a human review before outreach.", stack: "Gemini · n8n · Google Slides API · Gmail API" },
];

const experience = [
  ["Jul 2026 – present", "Associate Consultant · Motiveminds", "I help enterprise teams scope AI projects, compare models and deploy systems within their operating budgets."],
  ["Jul 2025 – Jun 2026", "Engineering · Motiveminds Consulting", "Built GenAI workflows across SAP and Salesforce, including evaluation and monitoring."],
  ["Jan – Jul 2025", "W3 SaaS Technologies", "Built lead enrichment and outbound systems with Clay, n8n and CRM APIs."],
  ["Jul – Dec 2024", "Blockchain Laboratories", "Benchmarked multi-agent orchestration and tested retrieval quality."],
  ["Apr – Aug 2024", "Hyderabad Forex Limited", "Built document extraction and onboarding APIs for a regulated forex team."],
];

function OnboardingStudy() {
  return (
    <figure className="astra-study" aria-labelledby="study-title">
      <figcaption>
        <small>Client case study</small>
        <h2 id="study-title">Hyderabad Forex</h2>
        <p>Reading KYC documents with OCR</p>
      </figcaption>
      <div className="astra-measures">
        <div><span>Manual data entry</span><strong>−40%</strong><i className="astra-track"><b /></i></div>
        <div><span>Onboarding time</span><strong>−30%</strong><i className="astra-track"><b /></i></div>
      </div>
      <a href="#forex-study">Read the project <span aria-hidden="true">↓</span></a>
    </figure>
  );
}

export function Fieldnotes() {
  return <div className="fn" id="top">
    <a className="fn-skip" href="#main">Skip to content</a>
    <header className="fn-header fn-wrap">
      <a className="fn-brand" href="#top"><img src="/avatar-logo.webp" alt="" width="36" height="36" />Baraar Sreesha</a>
      <nav aria-label="Main navigation"><a href="#work">Work</a><a href="#about">Experience</a><a href="#blog">Writing</a></nav>
      <a className="fn-header-link" href="#contact">Get in touch ↗</a>
    </header>
    <main id="main">
      <section className="fn-hero fn-wrap" aria-labelledby="intro">
        <div className="fn-intro">
          <p className="fn-label"><i/> Bengaluru, India · Available remotely</p>
          <h1 id="intro">Applied AI<br/><em>engineer.</em></h1>
          <p className="fn-lead">I’m Baraar Sreesha. I build AI systems that help teams find answers in their documents, research leads and move work through their CRM.</p>
          <div className="fn-actions"><a className="fn-button" href="#work">Explore my work <b>↓</b></a><a className="fn-text-link" href={resume}>View résumé ↗</a></div>
        </div>
        <OnboardingStudy/>
      </section>
      <section className="fn-section fn-wrap" id="work">
        <div className="fn-heading"><h2>Selected <em>work.</em></h2><span className="fn-label">Four case studies</span></div>
        {projects.map(p => <details className="fn-project" id={p.sector === "Hyderabad Forex Limited" ? "forex-study" : undefined} key={p.title}>
          <summary><span><small>{p.sector}</small><strong>{p.title}</strong></span><span className="fn-result">{p.result}<small>{p.unit}</small></span><span className="fn-plus" aria-hidden="true"/></summary>
          <div className="fn-detail"><p>{p.story}</p><small>{p.stack}</small></div>
        </details>)}
      </section>
      <section className="fn-wash" id="about"><div className="fn-wrap fn-split">
        <div><p className="fn-label">Baraar Sreesha Sreenivas</p><h2>Experience<span>.</span></h2><p>I work with the people who will run the system. We map the workflow, agree on what a good output looks like, then measure it against real examples.</p><a className="fn-text-link" href={resume}>Read my full résumé ↗</a>
          <p className="fn-feature"><a href="https://www.youtube.com/shorts/yYd5TDdlD0A">Watch my DataStax AI Hero interview ↗</a></p></div>
        <div>{experience.map(([date, org, note]) => <article className="fn-job" key={org}><small>{date}</small><h3>{org}</h3><p>{note}</p></article>)}</div>
      </div></section>
      <section className="fn-section fn-wrap fn-services" id="services">
        <div className="fn-heading"><h2>AI <em>consulting.</em></h2></div>
        <div className="fn-notes">
          <article><h3>Search internal knowledge</h3><p>I connect internal documents to a search assistant, add citations and test answers against questions from your team.</p></article>
          <article><h3>Automate CRM research</h3><p>I connect account research, enrichment and routing to HubSpot or Salesforce, with a review step where your team needs one.</p></article>
          <article><h3>Evaluate an AI workflow</h3><p>I map the manual steps, compare model costs and measure quality before you commit to a production build.</p></article>
        </div>
      </section>
      <section className="fn-section fn-wrap" id="blog">
        <div className="fn-heading"><h2>Field <em>notes.</em></h2><a className="fn-text-link" href="/blog">All writing ↗</a></div>
        <div className="fn-notes">{blogPosts.slice(0,3).map(p => <a key={p.slug} href={'/blog/'+p.slug}><small>{p.category} · {p.readingTime} read</small><h3>{p.title}</h3><span aria-hidden="true">↗</span></a>)}</div>
      </section>
      <section className="fn-foot" id="contact"><div className="fn-wrap">
        <p className="fn-label">Consulting &amp; engineering roles</p><h2>What are you<br/><em>working on?</em></h2>
        <p>Bring a workflow you want to improve, or a role you think I’d fit.</p>
        <div className="fn-actions"><a className="fn-button" href={book}>Book a 20-minute call ↗</a><a className="fn-text-link" href="mailto:ssbaraar02@gmail.com">Email me ↗</a></div>
        <footer><strong>Baraar Sreesha</strong><div><a href="https://github.com/ssbaraar">GitHub ↗</a><a href="https://linkedin.com/in/baraarsreesha">LinkedIn ↗</a></div></footer>
      </div></section>
    </main>
  </div>;
}
