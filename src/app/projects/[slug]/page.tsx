import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Github } from "@/components/ui/Icons";
import Link from "next/link";
import { notFound } from "next/navigation";
interface ProjectDetail {
  title: string;
  subtitle: string;
  tech: string[];
  architecture: string;
  highlights: string[];
  githubUrl: string;
  liveUrl: string;
}

const projectDetails: Record<string, ProjectDetail> = {
  "enpassant": {
    title: "EnPassant AI Proxy Gateway",
    subtitle: "High-performance AI proxy featuring regex-based PII redaction and an O(1) semantic cache.",
    tech: ["FastAPI", "MongoDB Atlas", "Python", "Docker"],
    architecture: "The core challenge was to build a routing layer for LLM requests that could sanitize Personal Identifiable Information (PII) in real-time without introducing significant latency. The solution utilizes a highly optimized regex pipeline combined with a sliding window rate limiter.",
    highlights: [
      "O(1) Semantic Cache using MongoDB Atlas Vector Search.",
      "Custom sliding window rate limiting for high-throughput environments.",
      "Regex-based PII redaction pipeline with sub-millisecond overhead."
    ],
    githubUrl: "https://github.com/fouzanf/EnPassant",
    liveUrl: "https://en-passant-six.vercel.app/"
  },
  "graphenautic": {
    title: "Graphenautic Platform",
    subtitle: "Knowledge Graph & RAG Platform combining Pinecone and Neo4j.",
    tech: ["Next.js", "FastAPI", "Pinecone", "Neo4j"],
    architecture: "Graphenautic addresses the limitations of standard RAG systems by enriching semantic vector search with deterministic graph relationships. Documents are processed in parallel, chunked with rate-limit awareness to prevent API throttling during bulk ingestions.",
    highlights: [
      "Hybrid search engine querying both Pinecone (Semantic) and Neo4j (Graph).",
      "Rate-limit-aware parallel document chunking pipeline.",
      "Next.js frontend for visualization of the generated knowledge graph."
    ],
    githubUrl: "https://github.com/fouzanf/Graphenautic",
    liveUrl: "https://graphenautic.vercel.app/"
  },
  "veritas-ai": {
    title: "Veritas AI",
    subtitle: "Real-time misinformation detection using the Gemini API.",
    tech: ["Next.js 15", "Gemini API", "NextAuth", "Framer Motion"],
    architecture: "Veritas AI leverages the latest Gemini models to cross-reference claims against verified sources in real-time. The interface is built mobile-first, utilizing a unique 3D depth aesthetic to present credibility scores intuitively.",
    highlights: [
      "Integration with Gemini API for advanced reasoning and fact-checking.",
      "Secure Single Sign-On (SSO) implemented via NextAuth.",
      "Highly interactive, hardware-accelerated 3D UI."
    ],
    githubUrl: "https://github.com/fouzanf/veritas-ai-detector",
    liveUrl: "https://veritas-ai-detector-pi.vercel.app/"
  },
  "sensai": {
    title: "SENSAI Career Coach",
    subtitle: "Automated mock interviews and persistent performance tracking.",
    tech: ["Neon DB", "Inngest", "React", "Node.js"],
    architecture: "SENSAI conducts dynamic, conversational mock interviews based on user resumes. Background tasks, such as generating detailed feedback reports and updating the Neon DB analytics dashboard, are offloaded to Inngest for reliable processing.",
    highlights: [
      "Real-time conversational AI interview engine.",
      "Robust background job processing with Inngest.",
      "High-performance serverless PostgreSQL via Neon DB."
    ],
    githubUrl: "https://github.com/fouzanf/AI-Career-Coach-Sensai",
    liveUrl: "https://sensai-rose.vercel.app/"
  },
  "vehiql": {
    title: "Vehiql: AI-Native Marketplace",
    subtitle: "High-performance vehicle marketplace with automated AI metadata extraction.",
    tech: ["Next.js", "Prisma", "Supabase", "Gemini API", "Clerk"],
    architecture: "Vehiql is an AI-native marketplace designed to automate vehicle listing creation. It integrates the Gemini API for 100% automated metadata extraction from vehicle images. The database layer is optimized using Prisma and Supabase to guarantee sub-100ms response times for complex searches and scheduling. Role-based access control is managed via Clerk, featuring admin dashboards for listing approvals and analytics.",
    highlights: [
      "Gemini AI API pipeline for 100% automated vehicle metadata extraction from photos.",
      "Optimized query performance using Supabase and Prisma ORM, yielding sub-100ms response times.",
      "Robust Role-Based Access Control (RBAC) via Clerk for admin approval flows and metrics tracking.",
      "Custom booking engine for test-drive scheduling with support for showroom hours and holiday handling."
    ],
    githubUrl: "https://github.com/fouzanf/AI-Car-Marketplace",
    liveUrl: "https://vehiqlai.vercel.app/"
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
    <main className="min-h-screen bg-background selection:bg-blue-500/30">
      <Navbar />
      
      <article className="pt-32 pb-24 px-6 max-w-4xl mx-auto min-h-[80vh]">
        <Link href="/#projects" className="inline-flex items-center text-white/60 hover:text-white transition-colors mb-12">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Portfolio
        </Link>

        <header className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">{project.title}</h1>
          <p className="text-xl text-white/60 mb-8">{project.subtitle}</p>
          
          <div className="flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t: string) => (
                <Badge key={t} variant="glass">{t}</Badge>
              ))}
            </div>
            
            <div className="flex gap-4">
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors">
                <Github className="w-4 h-4" /> Source
              </a>
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
                <ExternalLink className="w-4 h-4" /> Live Demo
              </a>
            </div>
          </div>
        </header>

        <section className="prose prose-invert prose-lg max-w-none">
          <h2 className="text-2xl font-bold mb-4">Architecture & Engineering</h2>
          <p className="text-white/80 leading-relaxed mb-12">
            {project.architecture}
          </p>

          <h2 className="text-2xl font-bold mb-4">Technical Highlights</h2>
          <ul className="space-y-4 text-white/80">
            {project.highlights.map((highlight: string, idx: number) => (
              <li key={idx} className="flex gap-3">
                <span className="text-blue-500 mt-1">▹</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </section>
      </article>

      <Footer />
    </main>
  );
}
