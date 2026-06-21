"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Bot, Sparkles, Trash2, ArrowRight } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_REPLIES = [
  "View Projects",
  "Tech Stack",
  "Contact Me",
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Mohammed's AI assistant. Ask me about his projects, skills, or experience 👋",
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
  }, [messages, isLoading, isOpen])  // Block scroll from leaving the chatbot messages area
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const stopPropagation = (e: WheelEvent) => {
      const atTop = el.scrollTop === 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight;

      if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
        e.preventDefault();
      }
      e.stopPropagation();
    };

    el.addEventListener('wheel', stopPropagation, { passive: false });
    return () => el.removeEventListener('wheel', stopPropagation);
  }, []);

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

  const handleQuickReply = (reply: string) => {
    let actualMsgText = reply;
    if (reply === "View Projects") {
      actualMsgText = "Tell me about Mohammed's projects";
    } else if (reply === "Tech Stack") {
      actualMsgText = "What is Mohammed's technical stack?";
    } else if (reply === "Contact Me") {
      actualMsgText = "How can I contact Mohammed?";
    }
    handleSubmit(actualMsgText);
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Hi! I'm Mohammed's AI assistant. Ask me about his projects, skills, or experience 👋",
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, rotateX: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{ transformOrigin: "bottom right", perspective: "1000px" }}
            className="chatbot-window mb-3 md:mb-6"
          >
            {/* SVG Animated Neural Network Background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.08] z-0">
              <svg width="100%" height="100%">
                <defs>
                  <linearGradient id="netGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#00F5FF" />
                  </linearGradient>
                </defs>
                <circle cx="15%" cy="20%" r="4" fill="url(#netGrad)" />
                <circle cx="80%" cy="15%" r="6" fill="url(#netGrad)" />
                <circle cx="45%" cy="50%" r="5" fill="url(#netGrad)" />
                <circle cx="20%" cy="80%" r="4" fill="url(#netGrad)" />
                <circle cx="85%" cy="75%" r="5" fill="url(#netGrad)" />
                <line x1="15%" y1="20%" x2="45%" y2="50%" stroke="white" strokeWidth="1" />
                <line x1="80%" y1="15%" x2="45%" y2="50%" stroke="white" strokeWidth="1" />
                <line x1="20%" y1="80%" x2="45%" y2="50%" stroke="white" strokeWidth="1" />
                <line x1="85%" y1="75%" x2="45%" y2="50%" stroke="white" strokeWidth="1" />
              </svg>
            </div>

            {/* Header */}
            <div className="chatbot-header relative z-10">
              <div className="chatbot-avatar">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm text-white tracking-tight flex items-center gap-1.5">
                  Mohammed.ai
                </h3>
                <p className="text-[11px] text-white/50">Neural Assistant</p>
              </div>

              <div className="flex items-center gap-1">
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

            {/* Messages Area */}
            <div ref={scrollRef} data-lenis-prevent className="chatbot-messages relative z-10 flex-1">
              {messages.map((msg, index) => {
                const isUser = msg.role === "user";
                return (
                  <div
                    key={index}
                    className={isUser ? "message-user" : "message-ai"}
                  >
                    {msg.content}
                  </div>
                );
              })}
              
              {/* Typing indicator */}
              {isLoading && (
                <div className="typing-indicator">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              )}
            </div>

            {/* Quick Reply Chips below first message */}
            {messages.length === 1 && !isLoading && (
              <div className="px-5 pb-3 flex flex-wrap gap-2 z-10">
                {QUICK_REPLIES.map((reply, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickReply(reply)}
                    className="text-[11px] text-cyan-200 hover:text-white bg-white/5 hover:bg-cyan-500/20 border border-white/5 hover:border-cyan-400/50 px-3 py-2 rounded-xl flex items-center gap-1 transition-all duration-200 cursor-pointer"
                  >
                    <span>{reply}</span>
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
              className="chatbot-input-area relative z-10"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message Neural Assistant..."
                className="chatbot-input"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="chatbot-send-btn text-white"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="chatbot-launcher">
        {/* Spinning gradient ring */}
        <div className="chatbot-ring" />
        
        {/* Online badge — ABOVE and to the RIGHT, z-index 10 */}
        {!isOpen && (
          <div className="online-badge">
            <span className="online-dot" />
            <span className="online-text">Online</span>
          </div>
        )}
        
        {/* Button on top of ring */}
        <button 
          className="chatbot-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
}
