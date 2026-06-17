# GTM Engineer Positioning and Refined ICP

For Baraar Sreesha Sreenivas  
Positioning lane: Applied AI + GenAI engineering + technical GTM automation for revenue teams

## 1. What a GTM Engineer Does

A GTM Engineer sits between growth, sales, marketing ops, RevOps, data, and engineering. The role is not just "automation" and not just "campaign execution." The strongest GTM engineers build the technical operating system that helps a company find, enrich, prioritize, contact, route, and convert the right customers.

### Core GTM Engineer Responsibilities

| GTM area | What happens in the business | What a GTM Engineer builds |
|---|---|---|
| ICP and segmentation | Decide who the company should target | Account lists, filters, enrichment logic, scoring rules, market maps |
| Lead sourcing | Find companies and people matching the ICP | Scrapers, Apollo/Clay workflows, directory pulls, enrichment pipelines |
| Data enrichment | Turn raw names/domains into usable records | Clay tables, Apollo enrichment, Clearbit/ZoomInfo-style enrichment, custom APIs |
| Lead scoring | Prioritize accounts by fit and buying intent | Scoring models, trigger detection, CRM fields, ranking formulas |
| CRM routing | Move qualified records into the sales system | HubSpot/Salesforce workflows, owner routing, lifecycle stages, dedupe |
| Outbound workflows | Help SDRs/founders reach the right people | Personalized email/LinkedIn logic, sequence inputs, AI research snippets |
| RevOps automation | Reduce manual sales and marketing operations | n8n/Make/Zapier workflows, CRM hygiene, alerts, status updates |
| Analytics and feedback | Track what converts and improve the system | Dashboards, campaign metrics, funnel reports, conversion analysis |
| AI workflow layer | Use LLMs where rules are not enough | Research agents, qualification agents, proposal generators, RAG assistants |
| Integration and deployment | Make the GTM stack reliable | FastAPI services, webhooks, Dockerized workers, auth, monitoring, error handling |

## 2. The GTM Process From End to End

### Stage 1: Strategy and ICP

The GTM team defines the customer segment, pain, buyer, region, company size, budget, and triggers.

Your technical role:
- Convert fuzzy ICP into searchable filters.
- Build account scoring logic.
- Translate business signals into data fields.
- Create vertical-specific lead lists.
- Identify which signals can be scraped, enriched, or inferred.

Examples you can own:
- "Recruiting agencies in the US with 11-100 employees hiring SDRs."
- "Money exchange/remittance firms in UAE/UK with manual KYC workflows."
- "B2B services firms using HubSpot but with no RevOps/automation hire."

### Stage 2: Account and Lead Sourcing

The GTM team needs companies and contacts.

Your technical role:
- Pull companies from Apollo, LinkedIn, Google Maps, directories, job boards, BuiltWith, and niche sources.
- Build scrapers where no clean source exists.
- Clean and normalize company names, domains, locations, titles, and LinkedIn URLs.
- Create repeatable workflows instead of one-time CSV pulls.

Tools you can credibly sell:
- Apollo
- Clay
- Google Maps scraping
- Custom Python scrapers
- LinkedIn/manual enrichment workflows
- FastAPI enrichment endpoints

### Stage 3: Enrichment and Research

Raw leads are usually low quality. Enrichment turns them into sales-ready records.

Your technical role:
- Add emails, LinkedIn URLs, company size, region, industry, tech stack, hiring signals, and buyer titles.
- Use Clay formulas and AI columns to create custom research.
- Use LLMs to summarize company pain and generate account context.
- Deduplicate, validate, and clean records before CRM push.

Your best angle:
"I do not just give you a lead list. I build the enrichment engine that keeps producing qualified sales-ready accounts."

### Stage 4: Qualification and Scoring

Sales teams waste time on weak leads. GTM engineering fixes prioritization.

Your technical role:
- Build ICP-fit scoring.
- Score triggers like hiring, funding, tech adoption, CRM usage, outdated websites, manual admin roles, or expansion signals.
- Create tiers such as A/B/C accounts.
- Route only qualified accounts to sales.

Scoring dimensions you can use:
- Industry fit
- Employee count
- Region
- Buyer availability
- Manual ops signal
- CRM/tool signal
- Hiring signal
- AI/automation readiness
- Budget likelihood

### Stage 5: CRM Push and Routing

Qualified leads must enter HubSpot/Salesforce cleanly.

Your technical role:
- Push records into HubSpot/Salesforce.
- Create lifecycle stages, lead sources, custom fields, tags, and owners.
- Prevent duplicates.
- Trigger Slack/email alerts for high-intent leads.
- Build follow-up tasks and sequence enrollment logic.

This is where your engineering background matters more than a normal RevOps profile.

### Stage 6: Outbound and Personalization

The GTM team needs relevant outreach.

Your technical role:
- Generate personalized first lines.
- Generate account summaries.
- Create pain-point hypotheses.
- Build email/LinkedIn research packets for SDRs or founders.
- Auto-create proposal decks and follow-up emails.

Your proof:
- n8n + Gemini pitch deck generator.
- Clay + n8n + LLM outbound framework.

### Stage 7: Workflow Automation

Once leads flow, operations become messy.

Your technical role:
- Build n8n/Make/Zapier workflows for handoffs.
- Automate reminders, CRM updates, follow-up creation, lead recycling, enrichment refreshes, and internal alerts.
- Connect forms, CRMs, spreadsheets, Slack, email, and custom APIs.

This is your strongest fractional wedge.

### Stage 8: AI Agents and Internal Assistants

This is where you differentiate from a normal GTM ops contractor.

Your technical role:
- Build agents that research accounts, classify leads, summarize call notes, answer sales/product questions, or route requests.
- Build RAG assistants over sales collateral, product docs, pricing docs, policies, or compliance documents.
- Build FastAPI services around these workflows so they can run in production.

## 3. Where You Should Position Yourself

Your strongest positioning is not "general AI engineer" and not "general automation freelancer."

Use this:

> Fractional GTM Engineer for AI-powered lead intelligence, RevOps automation, and outbound systems.

Longer version:

> I help startups and SMBs build the technical layer of GTM: lead sourcing, enrichment, scoring, CRM routing, AI research agents, and workflow automation using Clay, n8n, HubSpot, Apollo, Python, FastAPI, and LLMs.

Resume/job version:

> Applied AI / GTM Engineer building production lead intelligence pipelines, AI agents, RAG systems, and RevOps automations with Python, FastAPI, LangGraph, Clay, n8n, HubSpot, and Apollo.

GenAI engineer version:

> GenAI Engineer with a CSE background building RAG systems, multi-agent workflows, FastAPI LLM services, vector-search applications, document automation, and AI integrations for business workflows.

Contract version:

> I build done-for-you GTM automation systems for founders, agencies, and revenue teams: Clay workflows, n8n automations, Apollo enrichment, HubSpot routing, AI personalization, and custom FastAPI integrations.

## 4. Your Fractional GTM Engineer Scope

You should not pitch yourself as owning the entire GTM strategy, brand, copywriting, sales management, or closing process. You can support those areas, but your paid lane should be the technical GTM system.

### You Own

| Area | Your ownership |
|---|---|
| ICP translation | Convert target customer definition into searchable filters and scoring |
| Lead operations | Source, enrich, clean, dedupe, and score leads |
| Clay systems | Build Clay tables, waterfall enrichment, formulas, AI columns, exports |
| Apollo systems | Searches, enrichment, contact pulls, list building, handoff |
| n8n/Make automation | Webhooks, CRM workflows, alerts, proposal flows, enrichment refresh |
| CRM integration | HubSpot/Salesforce field mapping, routing, lifecycle updates |
| AI personalization | First lines, company summaries, account research, email inputs |
| RAG/agent workflows | Knowledge assistants, research agents, decision workflows |
| Backend integration | FastAPI services, custom APIs, Dockerized automation workers |
| Reporting foundation | Pipeline status, workflow health, lead quality dashboards |

### You Support

| Area | Your role |
|---|---|
| Offer strategy | Help translate offer into data/search criteria |
| Copywriting | Provide AI-personalized inputs and drafts, not own brand voice fully |
| Sales process | Build handoffs, lead packets, and CRM automation |
| Campaign operations | Build the machine; founder/SDR runs the conversations |

### You Avoid Owning

| Area | Why |
|---|---|
| Closing sales calls | Not your core monetizable edge right now |
| Brand strategy | Too broad and subjective |
| Paid ads management | Different skill lane |
| Full CRM admin forever | Can become low-value maintenance unless packaged |
| Generic VA/data-entry work | Pulls you away from $40+/hr positioning |

## 5. Refined ICP

The previous ICP of "non-tech traditional SMBs, $1M-$5M revenue, 10-75 staff" is directionally right, but for your current goal it should split into two ICPs.

### ICP A: Job Search ICP

These are companies where you apply as a full-time or contract GTM/AI/GenAI engineer.

| Attribute | Target |
|---|---|
| Company type | AI SaaS, B2B SaaS, GTM tooling, data tooling, RevOps tooling, automation platforms, GenAI product companies, AI consultancies |
| Stage | Seed to Series C, or profitable remote-first SaaS |
| Geography | US, Canada, UK, EU, remote global |
| Team | Has sales/growth team needing technical automation, or product/engineering team building GenAI features |
| Pain | GTM data fragmentation, manual outbound, CRM chaos, AI workflow experiments, RAG quality, LLM app reliability, AI integration backlog |
| Titles to target | GTM Engineer, AI GTM Engineer, Applied AI Engineer, GenAI Engineer, AI Engineer, Forward Deployed AI Engineer, Growth Engineer, AI Automation Engineer |
| Your proof | Clay/n8n outbound, lead intelligence, FastAPI GenAI services, RAG, agents, Python backend, CSE foundation |
| Minimum comp goal | Full-time remote US/global pay, or contract $40+/hr |

Best company signals:
- Hiring SDRs, RevOps, Sales Ops, Growth, or Marketing Ops.
- Has HubSpot/Salesforce in job posts.
- Mentions Clay, Apollo, Outreach, Salesloft, n8n, Make, Zapier, Census, Hightouch, Clearbit, ZoomInfo.
- Hiring for AI workflows, automation, agentic systems, or customer deployment.
- Hiring for RAG, LangChain, LangGraph, LlamaIndex, OpenAI API, vector databases, FastAPI, Python, Docker, document AI, or AI agents.
- Remote-friendly and open seniority.

### ICP A2: GenAI Engineer Job ICP

This is the CSE-background lane. It expands you beyond GTM-only roles without weakening the GTM story.

| Attribute | Target |
|---|---|
| Company type | AI-native SaaS, AI automation platforms, vertical SaaS adding AI, consulting/implementation firms, B2B SaaS with AI copilots |
| Stage | Seed to Series C, remote-first scaleups, AI consultancies serving US/EU clients |
| Geography | US, UK, Europe, Canada, Australia, UAE, global remote |
| Team | Product engineering, AI engineering, platform, solutions, forward-deployed, customer implementation |
| Pain | Need to ship LLM features, RAG, agent workflows, integrations, document automation, internal copilots |
| Titles | GenAI Engineer, AI Engineer, Applied AI Engineer, LLM Engineer, RAG Engineer, AI Automation Engineer, Forward Deployed AI Engineer, AI Solutions Engineer |
| Strong keywords | Python, FastAPI, LangChain, LangGraph, RAG, vector DB, Qdrant, Pinecone, FAISS, Docker, OpenAI API, Azure OpenAI, GCP Vertex AI |
| Why you fit | You combine CSE fundamentals with production AI workflows, API deployment, RAG, agents, and customer-facing automation |

Best GenAI job signals:
- Job post says "build LLM applications" rather than pure ML research.
- Mentions RAG, agents, workflow automation, APIs, integrations, or customer deployments.
- Open to 2-4 years or no hard 5+ years requirement.
- Values shipping, product sense, and integrations over PhD-level modeling.
- Has remote/global hiring or contractor-friendly language.

### ICP B: Fractional Client ICP

These are companies that can pay you directly for technical GTM systems.

| Attribute | Target |
|---|---|
| Company type | Founder-led SMB, agency, B2B services firm, recruiting firm, brokerage, consultancy, traditional company with manual operations |
| Revenue | $1M-$10M preferred; $1M-$5M acceptable |
| Headcount | 10-100 employees |
| Geography | USA first, then UK, UAE/GCC, Australia |
| Tech maturity | Uses spreadsheets/CRM/tools but no engineering team |
| Buyer | Founder, CEO, COO, Head of Sales, RevOps Lead, Agency Owner |
| Pain | Manual prospecting, poor lead quality, slow follow-up, messy CRM, too much admin |
| Budget | Can afford $1.5k-$5k project or $1k-$3k/month retainer |
| Your offer | Build the GTM and AI automation layer without hiring an internal engineer |

Strongest verticals:
1. Recruiting and staffing agencies
2. B2B lead generation and outbound agencies
3. AI automation agencies that need technical delivery
4. Insurance and mortgage brokerages
5. Forex, remittance, and money exchange firms
6. B2B consultancies and professional services
7. Real estate brokerages and property management
8. Wholesale/distribution businesses
9. Logistics and freight brokers
10. Small law/accounting firms with document-heavy intake

### ICP B2: Non-Tech Traditional SMB ICP

This is the exact client segment where your profile outshines typical B2B needs.

| Attribute | Ideal |
|---|---|
| Revenue | $1M-$5M sweet spot; up to $10M if they have visible manual ops pain |
| Headcount | 10-75 ideal; up to 100 acceptable |
| Geography | USA first, then UAE/GCC, UK/EU, Australia |
| Technical exposure | Low to medium: uses spreadsheets, email, WhatsApp, basic CRM, accounting tools, maybe HubSpot, but no internal engineering team |
| Buyer | Founder/Owner, Managing Director, COO, Ops Manager, Head of Sales, Agency Owner |
| Budget maturity | Can pay for outcomes but cannot justify a full-time engineer |
| Pain profile | Manual lead research, manual data entry, slow follow-up, document-heavy workflows, messy CRM, repeated admin tasks |
| Sales cycle | Founder-led, practical, ROI-driven, low procurement complexity |
| Best wedge | "I can automate the manual workflow that is slowing revenue or operations without you hiring a developer." |
| Avoid | Venture-scale companies with internal RevOps/eng teams, very small businesses under $500k revenue, heavily regulated enterprise buyers, low-budget local service providers |

Perfect-fit signs:
- Hiring admin/data-entry/SDR roles because ops are manual.
- Uses HubSpot/Salesforce/Zoho but has poor hygiene.
- Sales team still researches prospects manually.
- Intake/onboarding depends on PDFs, emails, scanned docs, or spreadsheets.
- Owner posts about growth, hiring, expansion, slow operations, or missed follow-ups.
- Website looks business-valid but technically basic.
- No AI/automation person on LinkedIn.

## 6. Prioritized ICP Refinement

### Tier 1: Best Immediate Targets

| ICP | Why it fits you | Offer to lead with |
|---|---|---|
| Recruiting/staffing agencies | Obvious lead-sourcing pain; easy to explain ROI | Candidate/client lead intelligence engine |
| B2B outbound/lead gen agencies | Already understand Clay/Apollo; need builders | Clay + n8n production workflow buildout |
| AI automation agencies | They sell automation but need implementation capacity | White-label AI/n8n/FastAPI delivery partner |
| Founder-led B2B SaaS | Strong fit for GTM Engineer jobs and contracts | AI GTM ops system: sourcing to HubSpot |

### Tier 2: Strong But Needs Better Case Study Framing

| ICP | Why it fits | Required proof |
|---|---|---|
| Forex/remittance | Your OCR proof is excellent | Turn Hyderabad Forex into a clear case study |
| Insurance/mortgage | Document-heavy workflows | Show OCR + routing + RAG assistant demo |
| Real estate/property mgmt | Lead routing and follow-up pain | Show speed-to-lead workflow |
| Professional services | Proposal and outbound pain | Show AI pitch deck/proposal automation |

### Tier 3: Opportunistic

| ICP | Why secondary |
|---|---|
| Dental/clinics | Useful but healthcare compliance can slow sales |
| Law firms | Good RAG fit but trust cycle is longer |
| Trades/home services | Good automation pain but lower technical budget |
| Import/export | Good document pain but harder list-building and qualification |

## 7. Service Packages

### Package 1: GTM Lead Intelligence Sprint

Best for: founders, agencies, B2B services, staffing firms  
Price target: $1,500-$3,000 fixed project or $40-$75/hr  
Timeline: 1-2 weeks

Deliverables:
- ICP filters and account criteria
- Lead sourcing workflow
- Clay/Apollo enrichment
- Lead scoring
- Google Sheet/Airtable/HubSpot handoff
- 100-500 enriched leads depending on source/tool access

### Package 2: Clay + n8n Outbound Engine

Best for: outbound agencies, SaaS teams, sales-led SMBs  
Price target: $2,500-$5,000 fixed project or $50-$85/hr  
Timeline: 2-4 weeks

Deliverables:
- Clay table architecture
- Waterfall enrichment
- LLM personalization
- n8n workflow automation
- HubSpot/Salesforce push
- Slack/email alerts
- Error handling and documentation

### Package 3: AI Research Agent for Sales Teams

Best for: SaaS, agencies, B2B consultancies  
Price target: $2,000-$6,000  
Timeline: 2-4 weeks

Deliverables:
- Account research agent
- Website/LinkedIn/company summary extraction
- Pain-point and trigger detection
- Structured JSON output
- CRM-ready account briefs
- FastAPI endpoint or n8n workflow integration

### Package 4: Document Intake + RAG Assistant

Best for: forex, insurance, mortgage, legal, consulting  
Price target: $3,000-$8,000  
Timeline: 3-6 weeks

Deliverables:
- PDF/document ingestion
- OCR or parser pipeline
- Vector database setup
- RAG assistant
- Internal search/chat interface or API
- Workflow handoff into CRM/ops tools

### Package 5: Fractional GTM Systems Retainer

Best for: companies with ongoing GTM operations  
Price target: $1,500-$4,000/month, depending on hours  
Timeline: monthly

Deliverables:
- Weekly workflow improvements
- Enrichment fixes
- CRM automation support
- New lead sources
- AI personalization improvements
- Reporting and documentation

## 8. Messaging

### One-Line Positioning

I build the technical GTM engine behind outbound: lead sourcing, enrichment, scoring, AI research, CRM routing, and workflow automation.

### Short Pitch

I help founders and revenue teams replace manual prospecting and messy CRM work with AI-powered GTM systems using Clay, n8n, Apollo, HubSpot, Python, FastAPI, and LLMs.

### Client-Facing Pitch

Most teams do outbound with scattered spreadsheets, manual research, and messy CRM updates. I build the technical GTM layer that connects sourcing, enrichment, scoring, AI personalization, and CRM routing into one repeatable system.

### Job-Application Pitch

I am an Applied AI/GTM Engineer with hands-on experience building lead intelligence pipelines, Clay+n8n outbound systems, FastAPI GenAI services, RAG assistants, and multi-agent workflows. I fit roles where GTM, RevOps, AI, and engineering overlap.

## 9. Discovery Questions For Clients

Use these on sales calls:

1. Where do your leads currently come from?
2. What tools do you use for CRM, enrichment, outbound, and automation?
3. How much manual research happens before a lead is sales-ready?
4. What makes a company a good-fit account for you?
5. What buyer titles are you targeting?
6. What happens after a lead is found?
7. Where do leads get lost today?
8. How do you score or prioritize accounts?
9. Are you using HubSpot, Salesforce, Apollo, Clay, Outreach, Salesloft, n8n, Make, or Zapier?
10. What manual workflow would save the most time if automated this month?

## 10. Outreach Angles By ICP

### Recruiting and Staffing Agencies

Pain:
Manual sourcing, weak enrichment, slow outreach, candidate/client list chaos.

Hook:
I can build a lead intelligence engine that finds, enriches, scores, and routes hiring companies or candidate/client prospects into your CRM.

### B2B Outbound Agencies

Pain:
They sell outbound but need better technical delivery and workflow reliability.

Hook:
I build Clay+n8n systems for agencies that need production-grade enrichment, personalization, routing, and automation.

### AI Automation Agencies

Pain:
They can sell automation but need a technical builder for delivery.

Hook:
I can be your white-label AI automation engineer for n8n, FastAPI, RAG, agents, and GTM workflows.

### Founder-Led SaaS

Pain:
Founder-led sales, no RevOps engineer, messy CRM, inconsistent outbound.

Hook:
I can build the GTM automation layer between your ICP, Apollo/Clay, HubSpot, and outbound motion.

### Forex / Remittance

Pain:
Manual KYC, document upload, compliance lookup, onboarding delays.

Hook:
I built an OCR automation pipeline that reduced manual data entry by 40% and onboarding turnaround by 30% for a forex business.

## 11. Search Terms

### For Jobs

Use:
- GTM Engineer
- AI GTM Engineer
- Applied AI Engineer
- Forward Deployed Engineer
- Forward Deployed AI Engineer
- AI Automation Engineer
- Growth Engineer
- RevOps Engineer AI
- Marketing Operations AI
- Solutions Engineer AI
- Deployment Engineer AI

Boolean:

```text
("GTM Engineer" OR "AI GTM Engineer" OR "Applied AI Engineer" OR "Forward Deployed Engineer" OR "AI Automation Engineer" OR "Growth Engineer" OR "RevOps Engineer") AND (AI OR automation OR Clay OR n8n OR HubSpot OR Apollo) AND remote
```

### For Clients

Use:
- "staffing agency" "HubSpot"
- "recruitment agency" "Apollo"
- "B2B lead generation agency" "Clay"
- "outbound agency" "Clay"
- "AI automation agency" "n8n"
- "HubSpot agency" "workflow automation"
- "money exchange" "KYC"
- "insurance brokerage" "manual intake"
- "mortgage broker" "document automation"

## 12. Recommended Next Move

Build two market-facing assets:

1. Job resume: Applied AI / GTM Engineer
2. Client one-pager: Fractional GTM Engineer for lead intelligence and AI automation

Then run two pipelines in parallel:

| Pipeline | Weekly target |
|---|---|
| Remote jobs | 25 targeted applications/week |
| Fractional clients | 100 ICP prospects/week, 20 personalized outreaches/day |

Your strongest path is not choosing between job and client work. It is using the same positioning for both:

> I build the technical GTM engine: lead intelligence, AI research, enrichment, scoring, CRM routing, and automation.
