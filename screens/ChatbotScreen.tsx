import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../App';
import getChatbotResponse from '../services/geminiService';
import { ChatMessage } from '../types';

const MarkdownRenderer: React.FC<{ text: string }> = ({ text }) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return (
        <p className="whitespace-pre-wrap">
            {parts.map((part, index) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={index}>{part.slice(2, -2)}</strong>;
                }
                if (part.startsWith('*') && part.endsWith('*')) {
                    return <em key={index}>{part.slice(1, -1)}</em>;
                }
                return part;
            })}
        </p>
    );
};


const ChatMessageBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
    const isUser = message.role === 'user';
    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} opacity-0 ${isUser ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}>
            <div className={`relative max-w-xs md:max-w-md lg:max-w-2xl px-4 py-3 rounded-2xl shadow-md ${isUser ? 'bg-gradient-to-br from-rose-700 to-red-600 text-white rounded-br-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-lg ring-1 ring-slate-200 dark:ring-slate-700'}`}>
                <div className={`absolute bottom-0 w-3 h-3 ${isUser ? 'right-0 translate-x-[3px] bg-red-600' : 'left-0 -translate-x-[3px] bg-slate-100 dark:bg-slate-800'}`} style={{ clipPath: 'polygon(0 0, 100% 100%, 100% 0)' }}></div>
                <MarkdownRenderer text={message.text} />
            </div>
        </div>
    );
};

const ChatbotScreen: React.FC = () => {
    const { t, language, goHome } = useAppContext();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);
    
    useEffect(() => {
        setMessages([{ role: 'model', text: t.chatbotGreeting }]);
    }, [language, t.chatbotGreeting]);

    const handleSend = async (messageText?: string) => {
        const text = (messageText || input).trim();
        if (!text || isLoading) return;

        const newMessages: ChatMessage[] = [...messages, { role: 'user', text }];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        const response = await getChatbotResponse(newMessages, language);
        
        setMessages(prev => [...prev, { role: 'model', text: response }]);
        setIsLoading(false);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSend();
    };

    return (
        <div className="h-screen flex flex-col p-2 sm:p-4 animate-fade-in">
            <header className="relative text-center mb-4 flex-shrink-0">
                <button onClick={goHome} className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-full hover:bg-white/90 dark:hover:bg-slate-700/80 transition-colors text-slate-700 dark:text-slate-300 z-20 ring-1 ring-black/5 dark:ring-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t.backButton}
                </button>
                <div className="flex items-center justify-center gap-3">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-rose-700 dark:text-rose-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M13 7h-2v6h2V7zm0 8h-2v2h2v-2z"></path>
                     </svg>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200">{t.chatbotTitle}</h1>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-2xl shadow-inner ring-1 ring-black/5 dark:ring-white/10">
                {messages.map((msg, index) => (
                    <ChatMessageBubble key={index} message={msg} />
                ))}
                {isLoading && (
                    <div className="flex justify-start opacity-0 animate-slide-in-left">
                        <div className="max-w-xs md:max-w-md px-4 py-3 rounded-2xl shadow-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-lg ring-1 ring-slate-200 dark:ring-slate-700">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={chatEndRef}></div>
            </main>

            <footer className="flex-shrink-0 pt-4">
                <div className="flex items-center justify-center flex-wrap gap-2 mb-4">
                    {t.chatbotPredefinedQuestions.map((q, i) => (
                        <button 
                            key={i} 
                            onClick={() => handleSend(q)}
                            style={{ animationDelay: `${100 + i * 100}ms` }}
                            className="px-3 py-1.5 text-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-full hover:bg-white/90 dark:hover:bg-slate-700/80 transition-colors text-slate-700 dark:text-slate-300 ring-1 ring-black/5 dark:ring-white/10 opacity-0 animate-fade-in-up"
                        >
                            {q}
                        </button>
                    ))}
                </div>
                <form onSubmit={handleFormSubmit} className="flex items-center gap-2 p-2 bg-white/80 dark:bg-slate-800/70 backdrop-blur-lg rounded-full shadow-lg ring-1 ring-black/5 dark:ring-white/10">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={t.sendMessagePlaceholder}
                        className="flex-1 w-full bg-transparent px-4 py-2 text-slate-800 dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-rose-700 to-red-600 text-white transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                        aria-label="Send message"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                        )}
                    </button>
                </form>
            </footer>
        </div>
    );
};

export default ChatbotScreen;