"use client";

import { memo, useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles } from "lucide-react";

interface AICopilotProps {
    symbol: string;
}

interface Message {
    id: number;
    text: string;
    sender: 'ai' | 'user';
}

const AICopilot = ({ symbol }: AICopilotProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initial greeting / context switch
    useEffect(() => {
        const greeting: Message = {
            id: Date.now(),
            text: `System initialized for ${symbol}. I am currently monitoring the order books, dark pool activity, and real-time sentiment for this asset. How would you like to proceed?`,
            sender: 'ai',
        };
        setMessages([greeting]);
    }, [symbol]);

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSend = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim()) return;

        const userMsg: Message = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const aiMsg: Message = {
                id: Date.now() + 1,
                text: `Analyzing your request regarding ${symbol}... The quantitative models suggest maintaining current positioning. Volatility is expected to compress over the next 4 hours.`,
                sender: 'ai'
            };
            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl h-full flex flex-col relative overflow-hidden group">
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between z-10 bg-black/50 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="font-bold text-neutral-200">Quant Copilot</h2>
                        <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            ACTIVE
                        </div>
                    </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-400 flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-amber-400" /> Model: GPT-5.Quant
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar z-10">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${msg.sender === 'user'
                                ? 'bg-indigo-600 text-white rounded-tr-none'
                                : 'bg-white/5 text-neutral-300 border border-white/10 rounded-tl-none'
                            }`}>
                            {msg.sender === 'ai' && (
                                <div className="text-[10px] font-mono text-indigo-400 mb-1 mb-1.5">TradeBias System</div>
                            )}
                            {msg.text}
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-white/5 text-neutral-400 border border-white/10 rounded-2xl rounded-tl-none p-4 flex gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/5 mt-auto z-10 bg-[#0A0A0A]">
                <form onSubmit={handleSend} className="relative group/input">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={`Ask AI about ${symbol}...`}
                        className="w-full bg-black border border-white/10 hover:border-white/20 focus:border-indigo-500 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder-neutral-500 transition-all focus:outline-none focus:ring-1 focus:ring-indigo-500 input-shadow"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isTyping}
                        className="absolute right-2 top-2 p-1.5 bg-indigo-500 hover:bg-indigo-400 disabled:bg-neutral-800 disabled:text-neutral-500 text-white rounded-lg transition-colors"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default memo(AICopilot);
