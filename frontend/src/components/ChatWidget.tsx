"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Loader2, ArrowRight } from "lucide-react";

// For Next.js we use NEXT_PUBLIC variables
const API_URL = (process.env.NEXT_PUBLIC_API_URL || "") + "/api/chat";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [leadEmail, setLeadEmail] = useState("");
  const [leadDesc, setLeadDesc] = useState("");
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // Lazy initialize from sessionStorage to prevent wipeouts on refresh
  const [messages, setMessages] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("nexorith_chat");
      if (saved) return JSON.parse(saved);
    }
    return [{ role: "model", text: "Hi, I'm the Nexorith Studio AI. How can I help you with your project today?" }];
  });

  // Sync to sessionStorage on every update
  useEffect(() => {
    sessionStorage.setItem("nexorith_chat", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, isOpen]);

  const handleSend = async (textOrEvent?: string | React.FormEvent) => {
    if (typeof textOrEvent !== "string" && textOrEvent?.preventDefault) {
      textOrEvent.preventDefault();
    }
    
    const userMessage = (typeof textOrEvent === "string" ? textOrEvent : input).trim();
    if (!userMessage || isLoading) return;

    setInput("");
    const newHistory = [...messages, { role: "user", text: userMessage }];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Front-end token optimization: only send the latest 6 messages
        body: JSON.stringify({ message: userMessage, history: newHistory.slice(-6) }),
      });

      const data = await response.json();
      setMessages([...newHistory, { role: "model", text: data.reply || "Something went wrong." }]);
    } catch (error) {
      setMessages([...newHistory, { role: "model", text: "Network error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingLead(true);
    try {
      const { submitLead } = await import("../lib/api");
      await submitLead({
        name: "Chatbot Lead",
        email: leadEmail,
        projectType: "AI Chatbot Inquiry",
        budgetRange: "TBD",
        message: leadDesc
      });
      setLeadSubmitted(true);
    } catch (err) {
      console.error("Failed to submit lead:", err);
      // Fallback in case of error
      alert("Failed to submit request. Please try again.");
    } finally {
      setIsSubmittingLead(false);
    }
  };

  const renderMessageContent = (msg: any, idx: number) => {
    const isModel = msg.role === "model";
    const hasFormTrigger = isModel && msg.text.includes("[SHOW_LEAD_FORM]");
    const cleanText = msg.text.replace("[SHOW_LEAD_FORM]", "").trim();

    return (
      <div key={idx} className="flex flex-col gap-2 w-full">
        <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          !isModel 
            ? "bg-blue-600 text-white self-end rounded-br-sm font-medium" 
            : "bg-gray-800 text-gray-100 border border-gray-700 self-start rounded-bl-sm"
        }`}>
          {cleanText}
        </div>
        
        {hasFormTrigger && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-[90%] self-start bg-gray-800 border border-gray-700 rounded-xl p-4 mt-2">
            <p className="text-xs font-bold text-blue-400 mb-3 uppercase tracking-wider">Start Your Project</p>
            {leadSubmitted ? (
              <p className="text-sm text-green-400 font-medium">✅ Request sent! Sahil, Om, Devansh, and the team will be in touch shortly.</p>
            ) : (
              <form className="flex flex-col gap-2" onSubmit={handleLeadSubmit}>
                <input type="email" value={leadEmail} onChange={e => setLeadEmail(e.target.value)} placeholder="Email Address" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" required disabled={isSubmittingLead} />
                <textarea value={leadDesc} onChange={e => setLeadDesc(e.target.value)} placeholder="Brief project description..." rows={2} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" required disabled={isSubmittingLead} />
                <button type="submit" disabled={isSubmittingLead} className="w-full bg-white text-black font-bold text-sm rounded-lg py-2 mt-1 flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors disabled:opacity-50">
                  {isSubmittingLead ? <Loader2 className="w-4 h-4 text-black animate-spin" /> : "Submit Request"} <ArrowRight size={14} />
                </button>
              </form>
            )}
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[320px] sm:w-[380px] h-[550px] max-h-[70vh] bg-gray-900 shadow-2xl flex flex-col overflow-hidden rounded-2xl border border-gray-700"
          >
            <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center bg-gray-800">
              <h3 className="text-white font-bold text-sm flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" /> Nexorith Assistant
              </h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors"><X size={18} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {messages.map((msg, idx) => renderMessageContent(msg, idx))}
              
              {messages.length === 1 && !isLoading && (
                <div className="flex flex-col gap-2 my-2">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1">
                    Frequently Asked Questions
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "What services do you offer?",
                      "Can I see your portfolio?",
                      "How do we start a project?"
                    ].map((chip, i) => (
                      <button 
                        key={i} 
                        onClick={() => handleSend(chip)}
                        className="text-xs bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-xl hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all font-medium text-left shadow-sm"
                      >
                        {chip} →
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {isLoading && <div className="bg-gray-800 border border-gray-700 self-start rounded-2xl rounded-bl-sm px-4 py-3"><Loader2 className="w-4 h-4 text-blue-400 animate-spin" /></div>}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-gray-700 bg-gray-900">
              <form onSubmit={handleSend} className="relative flex items-center">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about our services..." className="w-full bg-gray-800 border border-gray-700 rounded-full pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" />
                <button type="submit" disabled={isLoading || !input.trim()} className="absolute right-1.5 p-2 text-blue-400 hover:bg-gray-700 rounded-full disabled:opacity-50 transition-colors"><Send size={16} /></button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg text-white transition-transform"
      >
        {isOpen ? <X size={24} /> : <img src="/memoji.jpg" alt="AI Chatbot" className="w-full h-full object-cover rounded-full" />}
      </motion.button>
    </div>
  );
}
