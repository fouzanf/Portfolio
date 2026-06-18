"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Sparkles, Trash2, ArrowRight } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "Explain EnPassant's O(1) cache",
  "How does Vehiql extract metadata?",
  "What is Fouzan's core tech stack?",
  "Details on Graphenautic RAG system",
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm Fouzan's AI agent. I can tell you about his projects, skills, or his recent internship at Deccan AI. What would you like to explore?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, isOpen]);

  const handleSubmit = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage = textToSend.trim();
    setInput("");
    
    const updatedMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");
      const data = await response.json();
      
      if (data.text) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.text }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "I encountered an error. Please try again." },
        ]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection error. Please check your network." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Chat cleared! Let's start fresh. What would you like to know about Fouzan's achievements?",
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans select-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 260 }}
            className="glass-panel mb-4 w-[380px] sm:w-[420px] h-[600px] rounded-3xl flex flex-col overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 relative"
          >
            {/* Ambient Background Glow inside panel */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="relative p-5 border-b border-white/10 bg-slate-950/40 backdrop-blur-md flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <Sparkles className="w-5 h-5 text-white animate-pulse" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white tracking-tight flex items-center gap-1.5">
                    Fouzan.ai
                    <span className="text-[9px] font-semibold bg-blue-500/10 border border-blue-500/30 text-blue-400 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                      v2.5
                    </span>
                  </h3>
                  <p className="text-[11px] text-white/50">Personal AI Assistant</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={clearChat}
                  title="Clear Chat"
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Message List */}
            <div
              ref={scrollRef}
              className="relative flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-white/10 z-10"
            >
              {messages.map((msg, index) => {
                const isUser = msg.role === "user";
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-3 max-w-[85%] ${
                      isUser ? "ml-auto flex-row-reverse" : "mr-auto"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border shadow-inner ${
                        isUser
                          ? "bg-gradient-to-br from-purple-600/80 to-purple-800/80 border-purple-500/30 text-white"
                          : "bg-slate-900/80 border-white/10 text-blue-400"
                      }`}
                    >
                      {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div
                      className={`p-3.5 rounded-2xl text-[13px] leading-relaxed shadow-lg ${
                        isUser
                          ? "bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white rounded-tr-none border border-blue-400/20"
                          : "bg-white/5 border border-white/10 text-white/90 rounded-tl-none backdrop-blur-md"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                );
              })}
              
              {/* Typing Loader */}
              {isLoading && (
                <div className="flex gap-3 max-w-[85%] mr-auto">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-slate-900 border border-white/10 text-blue-400">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-3.5 bg-white/5 border border-white/10 text-white/90 rounded-2xl rounded-tl-none flex items-center gap-1.5 backdrop-blur-md">
                    <span className="w-2 h-2 bg-blue-400/80 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-indigo-400/80 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-purple-400/80 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Suggestions */}
            {messages.length === 1 && !isLoading && (
              <div className="px-5 pb-3 flex flex-wrap gap-2 z-10">
                {SUGGESTIONS.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSubmit(sug)}
                    className="text-[11px] text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all duration-200 cursor-pointer"
                  >
                    <span>{sug}</span>
                    <ArrowRight className="w-3 h-3 opacity-60" />
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(input);
              }}
              className="relative p-4 border-t border-white/10 bg-slate-950/40 backdrop-blur-md flex gap-2.5 items-center z-10"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message Fouzan's AI assistant..."
                className="flex-1 bg-white/5 hover:bg-white/8 focus:bg-white/10 text-white placeholder-white/30 text-xs px-4 py-3 rounded-2xl border border-white/5 focus:border-blue-500/40 outline-none transition-all duration-200"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center text-white shadow-lg shadow-blue-500/10 transition-all duration-200 shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-[0_8px_30px_rgb(59,130,246,0.3)] cursor-pointer relative group border border-white/20"
        aria-label="Toggle chat"
      >
        <span className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-500 opacity-60 blur group-hover:opacity-100 transition duration-300" />
        <span className="relative w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center">
          {isOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <div className="relative">
              <MessageSquare className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1.5 w-2 h-2 bg-blue-400 rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1.5 w-2 h-2 bg-blue-400 rounded-full" />
            </div>
          )}
        </span>
      </motion.button>
    </div>
  );
}
