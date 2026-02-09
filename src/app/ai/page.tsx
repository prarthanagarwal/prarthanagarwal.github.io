"use client";

import { useState, useRef, useEffect } from 'react';
import MainLayout from '@/components/layout/main-layout';

// Define types for our messages
interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

export default function AIChat() {
  // Grounding context used to steer the AI to accurate, concise answers about Prarthan
  const PRARTHAN_CONTEXT =
    "You are answering as Prarthan's AI. Bio: Prarthan Agarwal is a designer-developer who builds clean, minimalist interfaces and pragmatic products. Interests: development, research, cinema, and new ideas. Public projects include CryBaby (emotional moments tracker at crybaby.app), craftads-ai (AI ad creation at craftads.live), Flowpad (minimal notepad at flowpad.live), Surf Time (browser extension), FRIDAY (open-source AI agent), and Pinbasket. Keep answers brief, friendly, and strictly about Prarthan; if unsure, ask a clarifying question or say you don't know. Provide links only if shown on the site.";

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi! I'm Prarthan's AI persona. Ask me anything about him or his work. I'll be happy to assist you.",
      isUser: false,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastRequestAtRef = useRef<number>(0);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    // Basic client-side rate limit to avoid accidental spam
    const now = Date.now();
    if (now - lastRequestAtRef.current < 1500) {
      return; // ignore if requests are too frequent
    }
    lastRequestAtRef.current = now;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Call Cloudflare Worker proxy (replace with your deployed Worker URL)
    // Prepare placeholder AI message for streaming updates
    const aiMsgId = `ai-${now}`;
    setMessages((prev) => [
      ...prev,
      { id: aiMsgId, content: "", isUser: false },
    ]);

    fetch("https://don-portfolio.prarthanagarwaljeen.workers.dev/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/plain",
      },
      body: JSON.stringify({
        system: PRARTHAN_CONTEXT,
        requestId: `${now}-${Math.random().toString(36).slice(2, 8)}`,
        messages: [...messages, userMessage],
        stream: true,
      }),
    })
      .then(async (res) => {
        // If the server doesn't stream, fall back to JSON
        const contentType = res.headers.get("Content-Type") || "";
        if (!res.body || (!contentType.includes("text/plain") && !contentType.includes("text/event-stream"))) {
          const data = await res.json().catch(() => null);
          const finalText = data?.text || "Sorry, I couldn't generate a reply.";
          setMessages((prev) => prev.map((m) => (m.id === aiMsgId ? { ...m, content: finalText } : m)));
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let done = false;
        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;
          if (value) {
            const chunk = decoder.decode(value, { stream: true });
            setMessages((prev) => prev.map((m) => (m.id === aiMsgId ? { ...m, content: m.content + chunk } : m)));
          }
        }
      })
      .catch(() => {
        setMessages((prev) => prev.map((m) => (m.id === aiMsgId ? { ...m, content: "Oops, something went wrong. Please try again." } : m)));
      })
      .finally(() => setIsTyping(false));
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <MainLayout showHomeLink>
      <div className="flex items-center justify-between">
        <h1 className="text-[2.5rem] font-serif tracking-tight text-primary">
          prarthan://ai
        </h1>
        <div className="rounded-full bg-emerald-100 px-2.5 py-1.5 text-xs font-medium text-emerald-700">
          <span>just for fun!</span>
        </div>
      </div>
      <h2 className="text-base font-medium tracking-tight text-title">
        have a chat with my AI to know more about me!
      </h2>

      <section className="pt-4">
        <div className="flex h-[600px] flex-col text-sm">
          <div className="flex-1 overflow-y-auto rounded-lg border border-body/20 bg-amber-50/50 p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                style={{ opacity: 1, transform: "none" }}
              >
                <div
                  className={`max-w-xs rounded-lg px-2.5 py-1.5 ${
                    message.isUser
                      ? 'bg-primary text-white'
                      : 'bg-green-100 text-emerald-700'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-xs rounded-lg bg-green-100 px-3 py-2 text-emerald-700">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-emerald-700"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-emerald-700" style={{ animationDelay: "0.2s" }}></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-emerald-700" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex w-full justify-between gap-2 pt-4 text-xs">
            <button
              onClick={() => handleQuickQuestion("What is your design philosophy?")}
              className="rounded-lg bg-rose-100 px-2.5 py-1.5 text-rose-700 transition duration-300 ease-in-out md:hover:scale-95 md:hover:bg-rose-200 md:hover:text-rose-900"
            >
              What is your design philosophy?
            </button>
            <button
              onClick={() => handleQuickQuestion("Are you available for hire?")}
              className="rounded-lg bg-violet-100 px-2.5 py-1.5 text-violet-700 transition duration-300 ease-in-out md:hover:scale-95 md:hover:bg-violet-200 md:hover:text-violet-900"
            >
              Are you available for hire?
            </button>
            <button
              onClick={() => handleQuickQuestion("How much time does it take for you to design & code a website?")}
              className="rounded-lg bg-amber-100 px-2.5 py-1.5 text-amber-700 transition duration-300 ease-in-out md:hover:scale-95 md:hover:bg-amber-200 md:hover:text-amber-900"
            >
              How much time does it take for you to design & code a website?
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex-none pt-4">
            <div className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about me or my work!"
                className="w-full flex-1 rounded-l-full border border-body/20 px-4 py-3 focus:outline-none focus:ring-0"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                aria-label="Send message"
                className="rounded-r-full border border-l-0 border-body/20 px-1.5 focus:outline-none focus:ring-0"
              >
                <div className={`rounded-full p-2 ${inputValue.trim() && !isTyping ? 'bg-primary' : 'bg-hoverColor'} transition duration-300 ease-in-out`}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    stroke={inputValue.trim() && !isTyping ? "#fbfbf3" : "#7c7c74"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 2L11 13" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                  </svg>
                </div>
              </button>
            </div>
          </form>

          <p className="pt-4 text-sm text-body/80">
            Everyone makes mistakes, including this AI powered by{" "}
            <a
              href="https://ai.google.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-body md:hover:text-primary underline-offset-4 transition duration-150 ease-in-out md:hover:underline"
            >
              Google's Gemini 2.0 Flash
            </a>{" "}
            and{" "}
            <a
              href="https://developers.cloudflare.com/workers/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-body md:hover:text-primary underline-offset-4 transition duration-150 ease-in-out md:hover:underline"
            >
              Cloudflare Worker
            </a>. Make sure to double-check important information.
          </p>
        </div>
      </section>
    </MainLayout>
  );
}
