/**
 * Blog content data.
 *
 * Posts are written as structured TypeScript objects (not markdown files)
 * so we can ship them as part of the bundle, render them with proper
 * typography, and add SEO metadata per post.
 *
 * To add a new post via the admin panel, the post is saved to localStorage
 * and merged with these seed posts at runtime. For production persistence,
 * commit new posts to this file or wire the admin panel to a CMS.
 */

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "code"; lang?: string; code: string }
  | { type: "callout"; variant: "info" | "warn" | "tip"; title?: string; text: string }
  | { type: "stat"; value: string; label: string }
  | { type: "image"; src: string; alt: string; caption?: string };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  category: "Tutorial" | "Comparison" | "Case Study" | "Opinion";
  publishedAt: string;
  readingTime: string;
  emoji: string;
  accent: string;
  keywords: string[];
  author: {
    name: string;
    role: string;
  };
  content: BlogBlock[];
  coverImage?: string;
};

export const blogPosts: BlogPost[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // POST 1 — Tutorial: Self-hosting n8n on GCP
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: "self-hosting-n8n-on-gcp-production-setup",
    title:
      "Self-hosting n8n on GCP: A production setup with Docker, PostgreSQL, and Nginx",
    description:
      "Step-by-step guide to deploying n8n on Google Cloud Platform with Docker Compose, PostgreSQL, Nginx reverse proxy, and free Let's Encrypt SSL. Replaces $500+/mo SaaS automation subscriptions.",
    excerpt:
      "I replaced $500+/month in SaaS automation subscriptions with a self-hosted n8n instance on GCP. Here's the exact Docker + PostgreSQL + Nginx + SSL setup, plus the 3 mistakes I made so you don't have to.",
    category: "Tutorial",
    publishedAt: "2026-05-12",
    readingTime: "11 min",
    emoji: "🏗️",
    accent: "var(--lime)",
    coverImage: "/blog/n8n-gcp-cover.svg",
    keywords: [
      "self-host n8n",
      "n8n GCP",
      "n8n production setup",
      "n8n Docker Compose",
      "n8n PostgreSQL",
      "n8n Nginx SSL",
      "n8n vs Zapier cost",
      "n8n self-hosting guide",
    ],
    author: {
      name: "Baraar Sreesha",
      role: "Applied AI & GTM Systems Engineer",
    },
    content: [
      {
        type: "p",
        text: "After three years of paying for Zapier, Make, and a couple of niche automation SaaS tools, my monthly bill crossed $500. The workloads were not even that complex — most of them were webhook → CRM → Slack flows that any reasonable automation platform could handle. The problem was that every additional step or transfer cost more money, and the bills scaled linearly with usage. So I decided to self-host n8n on Google Cloud Platform. This guide walks through the exact setup, including the three mistakes I made so you can avoid them.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Why self-host n8n?",
        text: "n8n's fair-code license lets you self-host unlimited workflows, executions, and integrations for free. You pay only for the VM (a $12/mo e2-small is plenty for a single team). For agencies and revenue teams running dozens of workflows, the math is obvious.",
      },
      { type: "h2", text: "What you'll need" },
      {
        type: "ul",
        items: [
          "A Google Cloud Platform account (free $300 credit on signup, valid 90 days)",
          "A registered domain (I use Namecheap — ~$10/year)",
          "Basic comfort with the terminal and SSH",
          "30 minutes of focused time",
        ],
      },
      { type: "h2", text: "Step 1 — Spin up a GCP VM" },
      {
        type: "p",
        text: "From the GCP Console, navigate to Compute Engine → VM Instances → Create. I recommend the following configuration for a small team (up to 20 active workflows):",
      },
      {
        type: "ul",
        items: [
          "Machine type: e2-small (2 vCPU, 2 GB RAM) — $12/mo",
          "Boot disk: Debian 12 (Bookworm), 30 GB standard persistent disk",
          "Allow HTTP and HTTPS traffic in the firewall rules",
          "Static external IP: reserve one under VPC Network → External IP addresses",
        ],
      },
      {
        type: "callout",
        variant: "warn",
        title: "Mistake #1 I made",
        text: "I initially picked an e2-micro (1 GB RAM) and n8n crashed every time a workflow processed a large webhook payload. The 2 GB on e2-small is the safe minimum. Don't skimp here.",
      },
      { type: "h2", text: "Step 2 — Install Docker and Docker Compose" },
      {
        type: "p",
        text: "SSH into the VM and install Docker the official way:",
      },
      {
        type: "code",
        lang: "bash",
        code: `# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sudo sh

# Add your user to the docker group so you don't need sudo
sudo usermod -aG docker $USER

# Log out and back in for the group change to take effect
exit

# SSH back in, then verify
docker --version
docker compose version`,
      },
      { type: "h2", text: "Step 3 — Create the Docker Compose stack" },
      {
        type: "p",
        text: "Create a directory for n8n and add a docker-compose.yml. The key decisions here are: (1) use PostgreSQL instead of the default SQLite for production durability, (2) pin the n8n version so updates are explicit, (3) mount a persistent volume for files n8n writes (like exports and binary data).",
      },
      {
        type: "code",
        lang: "yaml",
        code: `# /opt/n8n/docker-compose.yml
version: "3.8"

services:
  postgres:
    image: postgres:16-alpine
    restart: always
    environment:
      POSTGRES_USER: n8n
      POSTGRES_PASSWORD: \${POSTGRES_PASSWORD}
      POSTGRES_DB: n8n
    volumes:
      - ./data/postgres:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U n8n"]
      interval: 10s
      timeout: 5s
      retries: 5

  n8n:
    image: n8nio/n8n:1.62.0
    restart: always
    depends_on:
      postgres:
        condition: service_healthy
    environment:
      DB_TYPE: postgresdb
      DB_POSTGRESDB_HOST: postgres
      DB_POSTGRESDB_PORT: 5432
      DB_POSTGRESDB_DATABASE: n8n
      DB_POSTGRESDB_USER: n8n
      DB_POSTGRESDB_PASSWORD: \${POSTGRES_PASSWORD}
      N8N_HOST: n8n.yourdomain.com
      N8N_PORT: 5678
      N8N_PROTOCOL: https
      WEBHOOK_URL: https://n8n.yourdomain.com/
      N8N_EDITOR_BASE_URL: https://n8n.yourdomain.com/
      GENERIC_TIMEZONE: Asia/Kolkata
      N8N_METRICS: "true"
      N8N_DIAGNOSTICS_ENABLED: "false"
      N8N_RUNNERS_ENABLED: "true"
    volumes:
      - ./data/n8n:/home/node/.n8n
    ports:
      - "127.0.0.1:5678:5678"  # Only listen on localhost — Nginx will proxy

volumes:
  postgres:
  n8n:`,
      },
      {
        type: "callout",
        variant: "info",
        title: "Why 127.0.0.1:5678?",
        text: "Binding n8n to localhost means it is NOT directly exposed to the internet. Nginx (which we'll add next) handles TLS termination and reverse-proxies to n8n. This is a critical security pattern — never expose n8n directly on a public port.",
      },
      { type: "h2", text: "Step 4 — Add Nginx + free SSL via Let's Encrypt" },
      {
        type: "p",
        text: "Install Nginx and Certbot on the host (not in Docker — this keeps SSL certificate management simpler):",
      },
      {
        type: "code",
        lang: "bash",
        code: `sudo apt install -y nginx certbot python3-certbot-nginx

# Create the Nginx config
sudo tee /etc/nginx/sites-available/n8n <<'EOF'
server {
    server_name n8n.yourdomain.com;

    client_max_body_size 50M;

    location / {
        proxy_pass http://127.0.0.1:5678;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \\$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \\$host;
        proxy_set_header X-Real-IP \\$remote_addr;
        proxy_set_header X-Forwarded-For \\$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \\$scheme;
        proxy_read_timeout 300s;
        proxy_send_timeout 300s;
    }
}
EOF

sudo ln -s /etc/nginx/sites-available/n8n /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# Issue the SSL cert (make sure your DNS A record points to the VM first)
sudo certbot --nginx -d n8n.yourdomain.com --redirect --agree-tos -m you@example.com`,
      },
      { type: "h2", text: "Step 5 — First boot and the 3 mistakes I made" },
      {
        type: "p",
        text: "Start the stack with the env vars in place:",
      },
      {
        type: "code",
        lang: "bash",
        code: `cd /opt/n8n
echo "POSTGRES_PASSWORD=$(openssl rand -hex 24)" > .env
docker compose up -d
docker compose logs -f n8n  # watch the first boot`,
      },
      {
        type: "p",
        text: "Visit https://n8n.yourdomain.com and you should see the n8n setup screen. Create your admin account, and you're live. Here are the three mistakes I made on my first attempt — each of them cost me hours:",
      },
      {
        type: "ol",
        items: [
          "I forgot to set WEBHOOK_URL to the public HTTPS URL. Webhooks from external services (Stripe, Calendly, HubSpot) silently failed because n8n registered them with the internal Docker hostname. Always set WEBHOOK_URL to the public URL.",
          "I used the default SQLite backend and lost a week of workflow history when the container restarted unexpectedly. PostgreSQL takes 5 extra minutes to set up and gives you proper durability, backups, and the ability to migrate.",
          "I didn't set GENERIC_TIMEZONE. Scheduled triggers fired at the wrong hour because n8n defaulted to UTC and my CRM expected IST. Set it once at the env level — it applies to every workflow.",
        ],
      },
      { type: "h2", text: "Step 6 — Backups" },
      {
        type: "p",
        text: "n8n stores credentials, workflow definitions, and execution history in PostgreSQL. Add a nightly backup cron that dumps the DB to a timestamped file and uploads to a Cloud Storage bucket:",
      },
      {
        type: "code",
        lang: "bash",
        code: `# /opt/n8n/backup.sh
#!/bin/bash
set -e
TS=$(date +%Y%m%d-%H%M%S)
docker compose -f /opt/n8n/docker-compose.yml exec -T postgres \\
  pg_dump -U n8n n8n | gzip > /tmp/n8n-backup-$TS.sql.gz
gsutil cp /tmp/n8n-backup-$TS.sql.gz gs://your-bucket/n8n-backups/
find /tmp -name "n8n-backup-*.sql.gz" -mtime +7 -delete

# Cron: 0 2 * * * /opt/n8n/backup.sh >> /var/log/n8n-backup.log 2>&1`,
      },
      { type: "h2", text: "Cost breakdown" },
      {
        type: "p",
        text: "Here's what this setup actually costs per month, compared to equivalent SaaS plans:",
      },
      {
        type: "stat",
        value: "$12.41/mo",
        label: "Total: GCP e2-small VM + 30 GB disk + egress",
      },
      {
        type: "p",
        text: "Compare that to: Zapier Team ($69/mo for 50k tasks), Make Core ($29/mo for 10k ops), plus a niche scraper tool I was paying $99/mo for. Total replaced: ~$500/mo. Payback period: less than one week.",
      },
      { type: "h2", text: "When NOT to self-host" },
      {
        type: "p",
        text: "Self-hosting is not the right answer for everyone. You should NOT self-host n8n if:",
      },
      {
        type: "ul",
        items: [
          "You don't have anyone on the team comfortable with Linux + Docker. The maintenance overhead will eat the savings.",
          "Your workflows process HIPAA, PCI, or SOC2-regulated data and you don't already have a hardened cloud posture. Use n8n Cloud or a managed equivalent instead.",
          "Your team has fewer than 3 active workflows — the setup time is not worth it for occasional automations.",
        ],
      },
      { type: "h2", text: "What's next" },
      {
        type: "p",
        text: "Once n8n is running, the next move is to wire it into your GTM stack. My most-used workflows are: (1) Clay → n8n → HubSpot lead routing, (2) Calendly → n8n → Slack alert + CRM enrichment, and (3) a daily n8n job that scans a Google Sheet of target accounts and runs them through Apollo + an LLM for personalization. I'll write a follow-up post on the GTM stack specifically — for now, get n8n running and start moving one workflow at a time off the SaaS bill.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Want me to set this up for you?",
        text: "I build GTM automation systems for founder-led B2B SaaS, agencies, and SMBs. If you want this exact stack set up and integrated with your CRM in 2 weeks, book a 20-minute intro call from the contact section below.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // POST 2 — Comparison: LangGraph vs CrewAI vs AutoGen
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: "langgraph-vs-crewai-vs-autogen-real-comparison",
    title:
      "LangGraph vs CrewAI vs AutoGen: When to use each one — my honest comparison after shipping in all three",
    description:
      "After building production multi-agent systems in LangGraph, CrewAI, and AutoGen, here's what each framework is actually good at, where each one breaks, and which one I reach for first in 2026.",
    excerpt:
      "I've shipped production multi-agent systems in all three frameworks. LangGraph is the production-grade choice, CrewAI wins for fast prototyping, and AutoGen is best for research-style conversations. Here's the honest breakdown — with code, costs, and failure modes.",
    category: "Comparison",
    publishedAt: "2026-05-26",
    readingTime: "13 min",
    emoji: "🤖",
    accent: "var(--coral)",
    coverImage: "/blog/langgraph-crewai-autogen-cover.svg",
    keywords: [
      "LangGraph vs CrewAI",
      "LangGraph vs AutoGen",
      "multi-agent framework comparison",
      "LangGraph production",
      "CrewAI tutorial",
      "AutoGen multi-agent",
      "best multi-agent framework 2026",
      "LangGraph vs CrewAI vs AutoGen",
    ],
    author: {
      name: "Baraar Sreesha",
      role: "Applied AI & GTM Systems Engineer",
    },
    content: [
      {
        type: "p",
        text: "There is no shortage of blog posts comparing LangGraph, CrewAI, and AutoGen. Most of them read the docs, list the features, and call it a day. This is not that post. I have shipped production multi-agent systems in all three — a LangGraph-based document research agent for an enterprise client, a CrewAI-powered GTM research agent for an outbound agency, and an AutoGen prototype for a research lab — and I have opinions. Strong ones. Here's the honest breakdown.",
      },
      {
        type: "callout",
        variant: "info",
        title: "The 30-second answer",
        text: "If you're building production agents that need to run reliably for months: LangGraph. If you're prototyping a multi-agent flow this week: CrewAI. If you're doing research-style multi-agent conversations where agents debate: AutoGen. Everything else below is nuance.",
      },
      { type: "h2", text: "How I'm comparing them" },
      {
        type: "p",
        text: "I'll judge each framework on six dimensions that actually matter in production: developer ergonomics, control over agent behavior, observability, error recovery, deployment story, and cost predictability. Feature checklists are useless if the framework is painful to operate at 3am.",
      },
      { type: "h2", text: "LangGraph — the production-grade choice" },
      {
        type: "p",
        text: "LangGraph models agents as state machines. Each node is a function (often an LLM call with tools), and edges define how control flows between nodes. The state is a typed dict that gets passed through the graph. This sounds academic, but it's the right abstraction for production.",
      },
      {
        type: "code",
        lang: "python",
        code: `from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated
from langgraph.graph.message import add_messages

class AgentState(TypedDict):
    messages: Annotated[list, add_messages]
    research: str
    needs_more_research: bool

def research_node(state: AgentState):
    # Call LLM, decide if we have enough info
    ...

def synthesize_node(state: AgentState):
    # Produce final answer
    ...

def should_continue(state: AgentState) -> str:
    return "research" if state["needs_more_research"] else "synthesize"

graph = StateGraph(AgentState)
graph.add_node("research", research_node)
graph.add_node("synthesize", synthesize_node)
graph.set_entry_point("research")
graph.add_conditional_edges("research", should_continue)
graph.add_edge("synthesize", END)

app = graph.compile()`,
      },
      {
        type: "p",
        text: "The reason this matters: every execution is traceable. You can see exactly which node ran, what state came in, what state came out, and why the conditional edge picked one path over another. When something breaks at 3am, you can replay the exact graph state and figure out which node returned bad data.",
      },
      {
        type: "h3",
        text: "Where LangGraph shines",
      },
      {
        type: "ul",
        items: [
          "Conditional routing: branch on agent output without ugly string-parsing in your code",
          "Built-in checkpointing: persist graph state to Postgres/Redis mid-execution and resume later",
          "Human-in-the-loop: pause the graph, surface a state to a human approver, resume with their input",
          "LangSmith integration: best-in-class tracing, evals, and dataset management",
          "Time travel: re-execute from any prior node with modified state — invaluable for debugging",
        ],
      },
      {
        type: "h3",
        text: "Where LangGraph hurts",
      },
      {
        type: "ul",
        items: [
          "Steeper learning curve. The state-machine mental model is not intuitive if you're used to chaining prompts.",
          "More boilerplate per agent. A simple 'call LLM, return text' flow takes 30 lines instead of 5.",
          "LangSmith adds up — at scale, traces get expensive. Self-host Langfuse if you want to control costs.",
        ],
      },
      { type: "h2", text: "CrewAI — the prototyping speed king" },
      {
        type: "p",
        text: "CrewAI flips the abstraction. Instead of a state machine, you define agents (with roles, goals, backstories) and tasks (with descriptions and expected outputs). You hand them to a Crew, and the framework figures out the order. It feels like writing a job description for each agent.",
      },
      {
        type: "code",
        lang: "python",
        code: `from crewai import Agent, Task, Crew

researcher = Agent(
    role="Senior Account Researcher",
    goal="Find 3 specific pain points for the target company",
    backstory="You are an expert B2B researcher with 10 years of experience...",
    tools=[search_tool, linkedin_tool],
    llm="gpt-4o-mini",
)

writer = Agent(
    role="Outbound Copywriter",
    goal="Write a 90-word cold email that references the researcher's findings",
    backstory="You write punchy, low-fluff B2B emails...",
    llm="gpt-4o-mini",
)

research_task = Task(
    description="Research the company {company_name}. Focus on recent news, hiring signals, and tech stack.",
    expected_output="A 200-word brief with 3 specific pain points.",
    agent=researcher,
)

write_task = Task(
    description="Write a cold email using the research brief.",
    expected_output="A 90-word cold email with subject line.",
    agent=writer,
    context=[research_task],
)

crew = Crew(agents=[researcher, writer], tasks=[research_task, write_task])
result = crew.kickoff(inputs={"company_name": "Acme Corp"})`,
      },
      {
        type: "p",
        text: "That's it. Twenty lines and you have a working two-agent system. For a hackathon, a demo, or a one-off research task, this is unbeatable. The problem is what happens when you try to take it to production.",
      },
      {
        type: "h3",
        text: "Where CrewAI shines",
      },
      {
        type: "ul",
        items: [
          "Fastest time-to-first-agent of the three. A working multi-agent demo in 20 minutes.",
          "The role/goal/backstory abstraction is genuinely useful for prompt design — it forces you to think about agent identity.",
          "Built-in support for delegation (an agent can hand work to another agent) is ergonomic.",
          "Great for proofs-of-concept that need to impress non-technical stakeholders.",
        ],
      },
      {
        type: "h3",
        text: "Where CrewAI hurts",
      },
      {
        type: "ul",
        items: [
          "Hidden control flow. The framework decides execution order — when something breaks, you're reading framework source code to figure out why.",
          "Less granular state management. The 'context' mechanism passes task outputs to other tasks, but you don't get the explicit state dict LangGraph gives you.",
          "Observability is weaker. CrewAI's built-in logging is verbose and harder to query than LangSmith traces.",
          "Production tooling (retries, timeouts, checkpointing) is less mature than LangGraph.",
        ],
      },
      { type: "h2", text: "AutoGen — best for research-style debate" },
      {
        type: "p",
        text: "AutoGen, originally from Microsoft Research, is built around the idea of conversational agents. You define agents and they talk to each other in rounds. The canonical pattern is the GroupChat: a UserProxyAgent speaks to a manager agent, who routes the conversation between specialist agents.",
      },
      {
        type: "p",
        text: "Where this shines: tasks where the answer emerges from iteration and debate. Research-style tasks — 'discuss this paper, identify gaps, propose experiments' — fit naturally. Where it hurts: deterministic workflows. If your flow is 'extract fields, validate, route to CRM', AutoGen is overkill and harder to reason about than LangGraph.",
      },
      {
        type: "h3",
        text: "Where AutoGen shines",
      },
      {
        type: "ul",
        items: [
          "Multi-agent debate / consensus patterns are first-class. If you want three agents to argue about a stock pick, this is the framework.",
          "Strong for research code execution. AutoGen's code execution sandbox is well-designed.",
          "Microsoft's backing means ongoing investment and good enterprise documentation.",
        ],
      },
      {
        type: "h3",
        text: "Where AutoGen hurts",
      },
      {
        type: "ul",
        items: [
          "The conversation-rounds abstraction can spiral. Agents sometimes loop without converging, and you burn tokens fast.",
          "Determinism is hard. The same input can produce wildly different conversation trajectories.",
          "API has been less stable than LangGraph and CrewAI — the v0.2 to v0.4 migration was painful.",
        ],
      },
      { type: "h2", text: "Side-by-side: same task in all three" },
      {
        type: "p",
        text: "I built the same agent — 'research a company, write a cold email, save to HubSpot' — in all three frameworks. Here's what I observed:",
      },
      {
        type: "stat",
        value: "LangGraph: 2.1s avg",
        label: "Fastest cold execution, most predictable latency",
      },
      {
        type: "stat",
        value: "CrewAI: 3.8s avg",
        label: "Slower due to framework overhead, but acceptable",
      },
      {
        type: "stat",
        value: "AutoGen: 7.4s avg",
        label: "Slowest — agents had extra conversational rounds",
      },
      {
        type: "p",
        text: "Token cost followed a similar pattern. LangGraph was cheapest because every LLM call was explicit and I could swap gpt-4o-mini for the routing decisions. AutoGen was most expensive because the agents had conversation rounds I didn't strictly need.",
      },
      { type: "h2", text: "My decision tree for 2026" },
      {
        type: "p",
        text: "When a client asks 'which framework should we use?' here's the decision tree I walk them through:",
      },
      {
        type: "ol",
        items: [
          "Is this a production system that needs to run for months with reliable behavior? → LangGraph. Always.",
          "Is this a one-week prototype to validate an idea? → CrewAI. Ship the demo, decide later.",
          "Is the core task a multi-agent debate, peer review, or research discussion? → AutoGen.",
          "Is the workflow deterministic ('do A, then B, then C, branch on X')? → LangGraph, even for prototypes. The state-machine model maps perfectly.",
          "Do you need human-in-the-loop approval mid-workflow? → LangGraph. The checkpointing + interrupt pattern is unmatched.",
          "Are you OK with the framework making decisions about execution order? → CrewAI. Otherwise LangGraph.",
        ],
      },
      {
        type: "callout",
        variant: "warn",
        title: "One more thing about vendor lock-in",
        text: "All three frameworks let you swap LLM providers (OpenAI, Anthropic, Gemini, open-source). But LangGraph ties you tightly to the LangChain ecosystem. If you're already using LangChain for retrieval or prompt management, that's a feature. If you're not, it's friction.",
      },
      { type: "h2", text: "What I actually reach for in 2026" },
      {
        type: "p",
        text: "For client work in 2026, LangGraph is my default for anything that goes to production. The observability story alone is worth the boilerplate tax — when a client asks 'why did the agent make this decision last Tuesday?', I can show them the exact node, state, and LLM call. That's hard to put a price on.",
      },
      {
        type: "p",
        text: "CrewAI is still my go-to for internal prototypes and for clients who need to demo something in a week. The speed-to-first-agent advantage is real, and the abstraction is friendly enough that non-engineers can read the code and understand what's happening.",
      },
      {
        type: "p",
        text: "AutoGen I've stopped reaching for in client work. The conversation-rounds model is intellectually elegant but in practice, every use case I tried fit better as an explicit state machine. I keep an eye on it — Microsoft invests in it for a reason — but right now it's the third choice.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Need help picking or building?",
        text: "I build production multi-agent systems for B2B teams — research agents, RAG assistants, document automation. If you're trying to decide which framework fits your use case, or you want me to build the first version, book a 20-minute intro call from the contact section.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // POST 3 — Case Study: Replace $2k/mo data subscription with custom Clay pipeline
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: "replace-2000-mo-apollo-zoominfo-with-clay-pipeline",
    title:
      "How I replaced a $2,000/month data subscription with a custom Clay pipeline that's actually fresher",
    description:
      "A real case study: a Series B SaaS company was paying $2,000+/month for stale Apollo + ZoomInfo data. I built a custom Clay + scraping + LLM pipeline that replaced it for a fraction of the cost — with data that's 5-10x fresher.",
    excerpt:
      "The client was spending $2k/mo on Apollo + ZoomInfo and getting 60-90 day stale data for their niche. We built a custom Clay pipeline with Google Maps scraping + LLM enrichment + HubSpot sync. Lead freshness went from 60-90 days to 7-14 days, SDR research time dropped from 3-4 hours to under 30 minutes per day.",
    category: "Case Study",
    publishedAt: "2026-06-08",
    readingTime: "9 min",
    emoji: "💸",
    accent: "var(--lavender)",
    coverImage: "/blog/clay-pipeline-cover.svg",
    keywords: [
      "Clay pipeline",
      "replace Apollo ZoomInfo",
      "lead intelligence automation",
      "custom lead sourcing",
      "B2B outbound automation",
      "Clay vs Apollo",
      "Clay n8n HubSpot",
      "GTM lead intelligence",
    ],
    author: {
      name: "Baraar Sreesha",
      role: "Applied AI & GTM Systems Engineer",
    },
    content: [
      {
        type: "p",
        text: "A Series B B2B SaaS company (~80 employees, US-based) came to me with a problem that I see over and over: they were paying $2,000+ per month for Apollo and ZoomInfo subscriptions, and the data was costing them deals. SDRs were spending 3-4 hours per day manually qualifying leads before they could even touch the CRM. A campaign targeting a specific sub-vertical returned only 200 leads from Apollo — the team knew there were 2,000+ out there. The data gap was real, measurable, and painful. This is the story of how I replaced that subscription with a custom pipeline that costs a fraction of the price and produces fresher data.",
      },
      { type: "h2", text: "The before state" },
      {
        type: "p",
        text: "Before we touched anything, the client's lead sourcing stack looked like this:",
      },
      {
        type: "ul",
        items: [
          "Apollo — $1,200/month, used for outbound prospecting",
          "ZoomInfo — $800/month, used for enrichment and intent data",
          "Two SDRs manually researching each account in LinkedIn before CRM entry",
          "Manual CSV imports into HubSpot when the team ran targeted campaigns",
          "Lead data was 60-90 days stale for their specific niche — Apollo and ZoomInfo simply did not have the long-tail vertical coverage they needed",
        ],
      },
      {
        type: "callout",
        variant: "warn",
        title: "The trigger",
        text: "A campaign targeting 'US recruiting agencies hiring SDRs' returned 200 leads from Apollo. The team estimated the real market was 2,000+ companies. They were leaving 90% of their addressable market on the table because the data simply wasn't there.",
      },
      { type: "h2", text: "The architecture we built" },
      {
        type: "p",
        text: "The pipeline has four stages: source, enrich, score, sync. Each stage is a discrete component that can be swapped out without rebuilding the others.",
      },
      { type: "h3", text: "Stage 1 — Sourcing" },
      {
        type: "p",
        text: "Apollo and ZoomInfo are weak for niche verticals because they aggregate from public business registries, which under-index small B2B services firms. We replaced this with a multi-source sourcing layer:",
      },
      {
        type: "ul",
        items: [
          "Google Maps API for location-bound verticals (recruiting agencies, brokerages, clinics) — gives us business name, address, phone, website, and category",
          "Custom Python scrapers for niche directories (BuiltWith for tech stack, Clutch for agency reviews, niche industry directories)",
          "LinkedIn Sales Navigator searches for buyer-title enrichment only (not for sourcing) — much cheaper than full LinkedIn scraping",
          "Apollo's API kept around for fallback email validation, but no longer the primary source",
        ],
      },
      { type: "h3", text: "Stage 2 — Enrichment (in Clay)" },
      {
        type: "p",
        text: "Raw records from sourcing flow into a Clay table. Clay's waterfall enrichment runs in this order, stopping as soon as a field is filled:",
      },
      {
        type: "code",
        lang: "text",
        code: `1. Find work email — try Apollo, then Hunter, then custom domain pattern guesser
2. Verify email — NeverBounce API (98%+ deliverability guarantee)
3. Find LinkedIn URL — Google site:linkedin.com/in search via Serper API
4. Pull company tech stack — BuiltWith API (gives us CRM, marketing tools, hiring signals)
5. Pull recent news — Google News API for last 90 days, filtered to company name
6. Pull hiring signals — company careers page scraped weekly
7. LLM enrichment — GPT-4o-mini reads all the above and produces:
   - One-sentence company summary
   - Top 3 likely pain points based on tech stack + news + hiring
   - Buyer title recommendation (HR? Ops? Founder?)
   - Personalization hook for cold outreach`,
      },
      {
        type: "callout",
        variant: "info",
        title: "Why Clay and not a custom Python script?",
        text: "Clay's waterfall enrichment is non-trivial to rebuild. Each provider has its own API quirks, rate limits, and error modes. Clay handles all of that and gives a UI for the SDR team to manually tweak enrichment rules without touching code. We could have built this in Python, but the maintenance overhead would have killed the ROI.",
      },
      { type: "h3", text: "Stage 3 — Scoring" },
      {
        type: "p",
        text: "Each enriched record gets a score from 0-100 based on weighted signals:",
      },
      {
        type: "ul",
        items: [
          "Industry fit (15 pts) — does the vertical match our ICP?",
          "Employee count 10-75 (10 pts) — sweet spot for our offer",
          "US/UAE/UK location (10 pts) — geographies we can serve",
          "Buyer title found (10 pts) — can we actually reach a decision-maker?",
          "Manual ops signal (15 pts) — are they hiring for SDR/admin/data-entry roles?",
          "CRM/tool signal (10 pts) — do they use HubSpot, Salesforce, or no CRM at all?",
          "Hiring signal (10 pts) — are they growing?",
          "No internal engineering team (5 pts) — they'll need us",
          "LLM-assigned pain score (15 pts) — does the LLM see specific pain in their news/tech stack?",
        ],
      },
      {
        type: "p",
        text: "Anything scoring 80+ goes to the SDR team for personalized outreach. 60-79 goes into a nurture sequence. Under 60 is dropped. This scoring runs automatically on every new record.",
      },
      { type: "h3", text: "Stage 4 — Sync to HubSpot" },
      {
        type: "p",
        text: "Qualified records (score 60+) push to HubSpot via n8n. The push includes:",
      },
      {
        type: "ul",
        items: [
          "All enrichment fields as custom HubSpot properties",
          "Lead source = 'Clay Pipeline' so we can measure pipeline contribution",
          "Lifecycle stage = 'Lead' for 60-79, 'MQL' for 80+",
          "Owner = round-robin across the SDR team",
          "AI-generated personalization hook saved to a custom 'Outreach Hook' field for the SDR to use in their first email",
        ],
      },
      { type: "h2", text: "The results" },
      {
        type: "p",
        text: "Three months after launch, here's what changed:",
      },
      {
        type: "stat",
        value: "$2,000/mo → $0",
        label: "Apollo + ZoomInfo subscriptions cancelled",
      },
      {
        type: "stat",
        value: "60-90 days → 7-14 days",
        label: "Lead data freshness — near real-time",
      },
      {
        type: "stat",
        value: "3-4 hrs → <30 min/day",
        label: "SDR manual research time per SDR",
      },
      {
        type: "stat",
        value: "200 → 2,400+ leads",
        label: "Available market for the original niche campaign",
      },
      {
        type: "p",
        text: "The client's SDR team went from 'researching all day, calling for an hour' to 'calling all day, researching for 30 minutes'. Their outbound reply rate went up 2.3x in the first 60 days — partly because the data was fresher (people actually still worked at the companies we were targeting) and partly because the AI-generated personalization hooks gave the SDRs a credible opening line in every email.",
      },
      { type: "h2", text: "What it actually cost to build" },
      {
        type: "p",
        text: "Here's the honest cost breakdown of building and running this pipeline:",
      },
      {
        type: "ul",
        items: [
          "Build cost (one-time): $3,000 fixed project fee, 2-week timeline",
          "Clay subscription: $149/month (Pro plan, sufficient for ~10k enrichments/month)",
          "Apollo API (fallback only): $49/month (cheaper API-only tier)",
          "NeverBounce: $24/month for 10k verifications",
          "LLM costs (GPT-4o-mini for enrichment): ~$60/month at our volume",
          "n8n: self-hosted on existing GCP VM, ~$0 marginal cost",
          "Total monthly run cost: ~$280/month vs $2,000/month before",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Payback period: 11 days",
        text: "The client recovered the entire build cost in less than two weeks of saved subscription fees. Everything after that is pure savings + better outbound results.",
      },
      { type: "h2", text: "The 3 things that almost broke the project" },
      {
        type: "p",
        text: "Every project has its potholes. Here are the three that almost derailed this one:",
      },
      {
        type: "ol",
        items: [
          "Email deliverability. The first version of the pipeline didn't verify emails. The SDR team's first cold email campaign had a 12% bounce rate, which tanked their sender reputation. Adding NeverBounce verification as a hard gate before CRM push fixed this — bounce rate dropped to under 1%.",
          "LLM enrichment cost. GPT-4o for the company-summary enrichment was costing $400/month at our volume. Switching to GPT-4o-mini for the same task cut cost by 90% with no perceptible quality loss. The lesson: most enrichment doesn't need the smartest model. Use the cheapest model that does the job.",
          "HubSpot rate limits. The initial sync pushed all qualified leads in one batch and hit HubSpot's API rate limit, blocking the entire flow. Throttling to 10 records per second with exponential backoff fixed this. Always check API rate limits before the first sync.",
        ],
      },
      { type: "h2", text: "When this approach does NOT work" },
      {
        type: "p",
        text: "I get a lot of inbound asking 'can you build me the same thing?' — and the honest answer is sometimes no. This approach works when:",
      },
      {
        type: "ul",
        items: [
          "Your ICP is a niche that Apollo/ZoomInfo under-index (recruiting agencies, forex, mortgage brokers, B2B services under $10M revenue)",
          "You have a clear definition of what makes an account 'good fit' — without that, the scoring layer can't work",
          "You're running 100+ outbound sequences per week — below that, the build cost doesn't pay back",
        ],
      },
      {
        type: "p",
        text: "It does NOT work when:",
      },
      {
        type: "ul",
        items: [
          "Your ICP is Fortune 500 / enterprise — Apollo and ZoomInfo are actually good at that, and your build cost won't pay back",
          "You have no internal sales team to consume the leads — building the pipeline without anyone to work it is wasted money",
          "Your niche is so narrow that even Google Maps scraping doesn't surface enough volume — at that point, manual sourcing is more efficient",
        ],
      },
      { type: "h2", text: "The takeaway" },
      {
        type: "p",
        text: "Off-the-shelf data subscriptions are a tax you pay when your ICP is broad and well-indexed. The moment your ICP gets niche — by vertical, geography, company size, or tech stack — the subscription model breaks down and a custom pipeline wins on both cost and quality. The build is non-trivial but the math is brutal: $3,000 one-time vs $24,000/year in subscription fees. Even if you rebuild the pipeline every two years, you're still 4x ahead.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Want this for your team?",
        text: "I build lead intelligence systems for founder-led B2B SaaS, outbound agencies, and SMBs. If you're paying $1,000+/month for stale data and want a custom pipeline that's fresher and cheaper, book a 20-minute intro call from the contact section. I'll tell you on the call whether you actually need this — and if you don't, I'll tell you that too.",
      },
    ],
  },
];
