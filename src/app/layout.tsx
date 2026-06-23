import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Chatbot } from "@/components/Chatbot";
import { Cursor } from "@/components/ui/Cursor";
import { PageLoader } from "@/components/ui/PageLoader";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohammed Muneeb Fouzan | Generative AI & Full-Stack Developer",
  description: "Portfolio of Mohammed Muneeb Fouzan, building production-grade RAG pipelines, AI proxy gateways, knowledge graphs, and LLM-integrated web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <SmoothScroll>
          <ScrollToTop />
          <PageLoader />
          <Cursor />
          {children}
          <Chatbot />
          <Toaster theme="dark" closeButton richColors position="bottom-right" />
        </SmoothScroll>
      </body>
    </html>
  );
}
