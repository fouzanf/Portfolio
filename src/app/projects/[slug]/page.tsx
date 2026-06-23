import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, ExternalLink, Shield, Cpu, Layout, Eye } from "lucide-react";
import { Github } from "@/components/ui/Icons";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProjectDetail {
  title: string;
  subtitle: string;
  problemStatement: string;
  tech: string[];
  architecture: string;
  highlights: string[];
  features: string[];
  githubUrl: string;
  liveUrl: string;
  bannerGradient: string;
}

const projectDetails: Record<string, ProjectDetail> = {
  "enpassant": {
    title: "EnPassant: AI Proxy Gateway",
    subtitle: "Production-grade AI proxy combining PII redaction, O(1) semantic caching, and sliding window rate limiting.",
    problemStatement: "Securing and optimizing LLM requests at scale requires filtering sensitive data, caching queries to minimize latency and token costs, and guarding against abuse. EnPassant achieves this as a single drop-in service with O(1) semantic cache and token protection.",
    tech: ["Python", "FastAPI", "MongoDB Atlas", "Next.js", "Tailwind CSS", "Vercel"],
    architecture: "EnPassant operates as an intelligent gateway using FastAPI to process incoming prompts. It uses MongoDB Atlas for semantic vector search, enabling O(1) caching of responses. The proxy filters PII data dynamically before forwarding queries to OpenAI/Gemini APIs.",
    highlights: ["O(1) semantic caching returning queries in 2-5ms.", "Zero token costs for cached prompts.", "PII redaction and rate limiting as a unified gateway."],
    features: ["Dynamic PII scrubbing.", "Sliding window rate limiting.", "Semantic cache similarity threshold control.", "Performance dashboard."],
    githubUrl: "https://github.com/fouzanf/enpassant",
    liveUrl: "https://en-passant-six.vercel.app/",
    bannerGradient: "from-blue-600/20 via-cyan-500/5 to-black"
  },
  "graphenautic": {
    title: "Graphenautic: Knowledge Graph & RAG Platform",
    subtitle: "Multi-tenant RAG platform converting documents into interactive knowledge graphs.",
    problemStatement: "Traditional vector databases fail at complex multi-hop queries that require relational reasoning across documents. Graphenautic solves this by transforming unstructured text into interactive Neo4j knowledge graphs combined with Pinecone vector retrieval.",
    tech: ["Next.js", "FastAPI", "Neo4j", "Pinecone", "Gemini API", "Zustand"],
    architecture: "Graphenautic ingests document files, leverages Gemini API to extract entities and connections, and builds a relational graph in Neo4j. It runs hybrid queries combining Pinecone semantic similarity with graph traversal to fetch highly contextual search results without cross-tenant leakage.",
    highlights: ["Multi-tenant isolation ensuring zero cross-tenant leakage.", "Hybrid Neo4j graph traversal + Pinecone vector RAG.", "Interactive force-directed graph canvas for visual RAG mapping."],
    features: ["Interactive graph visualization canvas.", "Secure multi-tenant data isolation.", "Document uploader and automated graph builder.", "AI-powered query assistant."],
    githubUrl: "https://github.com/fouzanf/graphenautic",
    liveUrl: "https://graphenautic.vercel.app/",
    bannerGradient: "from-purple-600/20 via-pink-500/5 to-black"
  },
  "vehiql": {
    title: "Vehiql: AI-Native Marketplace",
    subtitle: "High-performance vehicle marketplace with automated AI metadata extraction.",
    problemStatement: "Traditional vehicle listing platforms force users to manually enter dozens of vehicle specifications, leading to high drop-off rates and inaccurate listings. Vehiql automates the entire flow by using computer vision to extract precise vehicle features from a single photograph.",
    tech: ["Next.js", "Prisma", "Supabase", "Gemini API", "Clerk"],
    architecture: "Vehiql is an AI-native marketplace designed to automate vehicle listing creation. It integrates the Gemini API for 100% automated metadata extraction from vehicle images. The database layer is optimized using Prisma and Supabase to guarantee sub-100ms response times for complex searches and scheduling. Role-based access control is managed via Clerk, featuring admin dashboards for listing approvals and analytics.",
    highlights: [
      "Gemini AI API pipeline for 100% automated vehicle metadata extraction from photos.",
      "Optimized query performance using Supabase and Prisma ORM, yielding sub-100ms response times.",
      "Robust Role-Based Access Control (RBAC) via Clerk for admin approval flows and metrics tracking.",
      "Custom booking engine for test-drive scheduling with support for showroom hours and holiday handling."
    ],
    features: [
      "Automated listings from simple drag-and-drop image uploads.",
      "Advanced search filter with low-latency indexing.",
      "Admin validation pipeline for vehicle verification.",
      "Real-time test drive scheduling calendar."
    ],
    githubUrl: "https://github.com/fouzanf/AI-Car-Marketplace",
    liveUrl: "https://vehiqlai.vercel.app/",
    bannerGradient: "from-green-600/20 via-emerald-500/5 to-black"
  },
  "veritas-ai": {
    title: "Veritas AI misinformation detector",
    subtitle: "Real-time misinformation detection using the Gemini API.",
    problemStatement: "The rapid spread of misinformation makes fact-checking online claims tedious and slow. Veritas AI builds a high-speed vector-search and reasoning pipeline to analyze inputs against authenticated databases in real-time.",
    tech: ["Next.js 15", "Gemini API", "NextAuth", "Framer Motion"],
    architecture: "Veritas AI leverages the latest Gemini models to cross-reference claims against verified sources in real-time. The interface is built mobile-first, utilizing a unique 3D depth aesthetic to present credibility scores intuitively.",
    highlights: [
      "Integration with Gemini API for advanced reasoning and fact-checking.",
      "Secure Single Sign-On (SSO) implemented via NextAuth.",
      "Highly interactive, hardware-accelerated 3D UI."
    ],
    features: [
      "Credibility dial rating system showing verified sources.",
      "Article scraping pipeline pulling latest context.",
      "Interactive 3D depth user interface using Framer Motion.",
      "Personal history dashboard to track processed claims."
    ],
    githubUrl: "https://github.com/fouzanf/veritas-ai-detector",
    liveUrl: "https://veritas-ai-detector-pi.vercel.app/",
    bannerGradient: "from-cyan-600/20 via-blue-500/5 to-black"
  },
  "sensai": {
    title: "SENSAI: AI Career Coach",
    subtitle: "Automated mock interview platform with real-time Gemini AI feedback.",
    problemStatement: "Practicing for technical and behavioral interviews is difficult without real-time, constructive feedback. SENSAI builds an automated mock interview environment that evaluates responses on the fly and generates actionable reports.",
    tech: ["Next.js", "TypeScript", "Gemini API", "Neon DB", "Clerk", "Inngest"],
    architecture: "SENSAI leverages Next.js and TypeScript on the frontend. When a user submits an audio or text response, Gemini AI analyzes it asynchronously via Inngest queues, saving performance logs into a Neon PostgreSQL database.",
    highlights: ["Real-time AI feedback on interview answers.", "Asynchronous inference pipeline using Inngest.", "Detailed performance tracking over time stored in Neon DB."],
    features: ["Custom mock interview generation.", "Voice-to-text response capturing.", "Interactive feedback dashboard.", "Async task scheduling for low-latency UX."],
    githubUrl: "https://github.com/fouzanf/AI-Career-Coach-Sensai",
    liveUrl: "https://sensai-rose.vercel.app/",
    bannerGradient: "from-rose-600/20 via-red-500/5 to-black"
  }
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const project = projectDetails[resolvedParams.slug];

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-cyan-500/30 overflow-x-hidden">
      <Navbar />

      {/* Hero Banner Section */}
      <section className={`relative pt-40 pb-20 w-full overflow-x-hidden bg-gradient-to-b ${project.bannerGradient} border-b border-white/5`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <Link href="/#projects" className="inline-flex items-center text-white/50 hover:text-cyan-400 transition-colors mb-8 mt-8 group font-mono text-sm">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            BACK TO PORTFOLIO
          </Link>

          <h1 className="text-4xl md:text-7xl font-bold font-heading mb-4 tracking-tighter break-words">{project.title}</h1>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl leading-relaxed mb-8 break-words">{project.subtitle}</p>

          <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-white/10">
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t: string) => (
                <Badge key={t} variant="glass" className="bg-white/5 border-white/10 text-cyan-400">{t}</Badge>
              ))}
            </div>

            {/* flex-wrap so the two buttons stack on very narrow viewports */}
            <div className="flex flex-wrap gap-3">
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors bg-white/5 border border-white/10 px-4 py-2 rounded-xl hover:border-cyan-400/50">
                <Github className="w-4 h-4" /> Source
              </a>
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-xl hover:border-cyan-400/50">
                <ExternalLink className="w-4 h-4" /> Live Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Content */}
      <section className="py-20 px-6 max-w-5xl mx-auto overflow-x-hidden">
        <div className="grid md:grid-cols-3 gap-12">

          {/* Main Info */}
          <div className="md:col-span-2 space-y-12 min-w-0">

            {/* Problem Statement */}
            <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-cyan-400" />
              {/* shrink-0 on icon + min-w-0 on text span lets the heading wrap on mobile */}
              <h2 className="text-2xl font-bold font-heading mb-4 flex items-center gap-2 flex-wrap">
                <Shield className="w-5 h-5 text-cyan-400 shrink-0" />
                <span className="min-w-0 break-words">The Problem</span>
              </h2>
              <p className="text-white/80 leading-relaxed text-lg break-words">
                {project.problemStatement}
              </p>
            </div>

            {/* Architecture */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold font-heading flex items-center gap-2 flex-wrap">
                <Cpu className="w-5 h-5 text-cyan-400 shrink-0" />
                <span className="min-w-0 break-words">Engineering Architecture</span>
              </h2>
              <p className="text-white/70 leading-relaxed text-lg break-words">
                {project.architecture}
              </p>
            </div>

          </div>

          {/* Side Info */}
          <div className="space-y-8 min-w-0">

            {/* Key Features */}
            <div className="glass-panel p-5 md:p-6 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold font-heading mb-6 flex items-center gap-2 flex-wrap">
                <Layout className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="min-w-0 break-words">Key Features</span>
              </h3>
              <ul className="space-y-4 text-sm text-white/80">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-cyan-400 mt-0.5 shrink-0">✔</span>
                    <span className="break-words min-w-0">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Highlights */}
            <div className="glass-panel p-5 md:p-6 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold font-heading mb-6 flex items-center gap-2 flex-wrap">
                <Eye className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="min-w-0 break-words">Technical Highlights</span>
              </h3>
              <ul className="space-y-4 text-sm text-white/80">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-cyan-400 mt-0.5 shrink-0">▹</span>
                    <span className="break-words min-w-0">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
