"use client";

import { useState, useRef, useEffect } from 'react';
import MainLayout from '@/components/layout/main-layout';
import Image from 'next/image';

// Define types for our messages
interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

export default function AIChat() {
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

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponses = [
        "I'm a simple AI clone of Prarthan. I'm still learning about him!",
        "Prarthan is passionate about development and cinema.",
        "Prarthan is a CS student at SRM University and loves designing minimalist UIs.",
        "You can check out Prarthan's projects on his GitHub profile.",
        "Prarthan enjoys exploring new technologies and creating cool projects.",
      ];

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];

      const aiMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        isUser: false,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
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
              href="https://sdk.vercel.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-body md:hover:text-primary underline-offset-4 transition duration-150 ease-in-out md:hover:underline"
            >
              Vercel AI SDK
            </a>. Make sure to double-check important information.
          </p>
        </div>
      </section>
    </MainLayout>
  );
}
