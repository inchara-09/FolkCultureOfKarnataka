import React, { useState } from 'react';
import { useAppContext } from '../App';
import { Category } from '../types';

const KannadaFlag: React.FC = () => (
    <div 
        style={{ animationDelay: '400ms' }} 
        className="w-20 h-12 md:w-24 md:h-16 rounded-md overflow-hidden shadow-lg mx-auto mb-2 ring-1 ring-black/10 dark:ring-white/10 opacity-0 animate-fade-in-down"
    >
        <div className="h-1/2 bg-yellow-400"></div>
        <div className="h-1/2 bg-red-600"></div>
    </div>
);


const HeaderControls: React.FC = () => {
    const { language, setLanguage, theme, toggleTheme, t } = useAppContext();
    const isDark = theme === 'dark';

    const langActiveClasses = "bg-gradient-to-r from-rose-700 to-red-600 text-white shadow-md scale-105";
    const langInactiveClasses = "bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-slate-700/80";
    
    return (
        <>
            {/* Theme Toggle on the Left */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
                <button 
                    onClick={toggleTheme} 
                    className="w-14 h-8 rounded-full p-1 flex items-center transition-colors duration-300 bg-black/10 dark:bg-white/10 shadow-sm" 
                    aria-label="Toggle theme"
                >
                    <span className={`relative w-6 h-6 rounded-full bg-white/80 dark:bg-slate-800/80 shadow-md transform transition-transform duration-500 ease-in-out ${isDark ? 'translate-x-6' : 'translate-x-0'}`}>
                        <svg className={`absolute inset-0 p-1 text-amber-500 transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-100'}`} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.106a.75.75 0 011.06-1.06l1.591 1.59a.75.75 0 01-1.06 1.061l-1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5h2.25a.75.75 0 01.75.75zM17.894 18.894a.75.75 0 011.06 1.06l-1.59 1.591a.75.75 0 01-1.061-1.06l1.59-1.591zM12 18a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.106 17.894a.75.75 0 01-1.06 1.06l-1.591-1.59a.75.75 0 011.06-1.061l1.591 1.59zM4.5 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H5.25a.75.75 0 01-.75-.75zM6.106 7.106a.75.75 0 01-1.06-1.06l1.591-1.59a.75.75 0 011.06 1.061L6.106 7.106z"></path></svg>
                        <svg className={`absolute inset-0 p-1.5 text-slate-300 transition-opacity duration-300 ${isDark ? 'opacity-100' : 'opacity-0'}`} viewBox="0 0 24 24" fill="currentColor"><path d="M11.999 3.125a.75.75 0 01.75.75v.01a.75.75 0 01-1.5 0v-.01a.75.75 0 01.75-.75zm6.363 3.492a.75.75 0 011.06 1.06l-.009.01a.75.75 0 01-1.06-1.06l.01-.009zm-13.785 0a.75.75 0 011.06-1.06l.009.01a.75.75 0 01-1.06 1.06l-.01-.01zm15.682 6.375a.75.75 0 010 1.5h-.01a.75.75 0 010-1.5h.01zm-17.625 0a.75.75 0 010 1.5h-.01a.75.75 0 010-1.5h.01zM12 17.25a.75.75 0 01.75.75v.01a.75.75 0 01-1.5 0v-.01a.75.75 0 01.75-.75zm6.363 3.492a.75.75 0 011.06 1.06l-.009.01a.75.75 0 01-1.06-1.06l.01-.009zm-13.785 0a.75.75 0 011.06-1.06l.009.01a.75.75 0 01-1.06 1.06l-.01-.01z"></path></svg>
                    </span>
                </button>
            </div>

            {/* Language Toggle on the Right */}
            <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20 flex items-center space-x-2 p-1 bg-black/10 dark:bg-white/10 rounded-full shadow-sm">
                <button
                    onClick={() => setLanguage('kn')}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${language === 'kn' ? langActiveClasses : langInactiveClasses}`}>
                    {t.kannada}
                </button>
                <button
                    onClick={() => setLanguage('en')}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${language === 'en' ? langActiveClasses : langInactiveClasses}`}>
                    {t.english}
                </button>
            </div>
        </>
    );
};

const CategoryCard: React.FC<{ category: Category; index: number }> = ({ category, index }) => {
    const { navigateToDetail } = useAppContext();
    return (
        <div
            onClick={() => navigateToDetail(category.id)}
            style={{ animationDelay: `${500 + index * 100}ms` }}
            className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer shadow-lg dark:shadow-black/30 hover:shadow-xl hover:shadow-rose-800/20 dark:hover:shadow-rose-500/20 transform hover:-translate-y-2 transition-all duration-300 ease-in-out opacity-0 animate-fade-in-up ring-1 ring-black/5 dark:ring-white/10"
        >
            <img src={category.image} alt={category.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
             <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-amber-500/40 dark:ring-amber-400/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <h3 className="absolute bottom-4 left-4 text-lg md:text-xl font-bold text-white transition-colors duration-300 group-hover:text-amber-300">
                {category.title}
            </h3>
        </div>
    );
};

const ChatbotIcon: React.FC = () => {
    const { navigateToChat } = useAppContext();
    return (
        <button
            onClick={navigateToChat}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-rose-700 to-red-600 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 hover:scale-110 animate-float animate-glow"
            aria-label="Open Chatbot"
        >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" viewBox="0 0 24 24" fill="white">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
        </button>
    );
};

const HomeScreen: React.FC = () => {
    const { t } = useAppContext();
    const [funFact, setFunFact] = useState<string | null>(null);

    const generateFunFact = () => {
        const randomIndex = Math.floor(Math.random() * t.funFacts.length);
        setFunFact(t.funFacts[randomIndex]);
    };

    return (
        <div className="min-h-screen p-4 md:p-8 flex flex-col items-center overflow-x-hidden">
            <div className="relative w-full max-w-7xl">
                <HeaderControls />
                <header className="text-center my-8 md:my-12 pt-16 flex flex-col items-center">
                    <h2 style={{ animationDelay: '200ms' }} className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-800 via-red-600 to-amber-500 dark:from-rose-500 dark:via-red-500 dark:to-amber-400 font-kannada opacity-0 animate-fade-in-down animate-shimmer">
                        {t.patrioticQuote}
                    </h2>
                    <KannadaFlag />
                    <p style={{ animationDelay: '600ms' }} className="text-xl md:text-2xl font-bold text-rose-800 dark:text-rose-300 opacity-0 animate-fade-in-down drop-shadow-sm">{t.rajyotsavaWishes}</p>
                    <h1 style={{ animationDelay: '800ms' }} className="text-4xl md:text-6xl font-extrabold mt-6 text-slate-900 dark:text-slate-100 drop-shadow-sm opacity-0 animate-fade-in-down">{t.title}</h1>
                    <p style={{ animationDelay: '1000ms' }} className="mt-4 text-lg md:text-xl text-slate-600 dark:text-slate-400 opacity-0 animate-fade-in-down">{t.tagline}</p>
                </header>
            </div>


            <main className="w-full max-w-6xl mx-auto flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {t.categories.map((cat, index) => (
                        <CategoryCard key={cat.id} category={cat} index={index} />
                    ))}
                </div>

                <section style={{ animationDelay: '800ms' }} className="text-center my-12 md:my-20 p-6 bg-white/50 dark:bg-slate-800/40 backdrop-blur-md rounded-xl shadow-md opacity-0 animate-fade-in-up ring-1 ring-black/5 dark:ring-white/10">
                    <h3 className="text-2xl font-semibold text-rose-800 dark:text-rose-300 flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 dark:text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M11 3a1 1 0 100 2h.01a1 1 0 100-2H11zM10.707 8.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 001.414 1.414l3-3zM10 12a1 1 0 100 2h.01a1 1 0 100-2H10z" />
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                        </svg>
                        {t.funFactTitle}
                    </h3>
                    <button
                        onClick={generateFunFact}
                        className="mt-4 px-8 py-3 bg-gradient-to-r from-rose-700 to-red-600 text-white font-bold rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200 animate-pulse-slow"
                    >
                        {t.funFactButton}
                    </button>
                    {funFact && (
                        <div className="mt-6 p-4 bg-rose-50/70 dark:bg-rose-900/30 text-rose-900 dark:text-rose-200 rounded-lg italic transition-all duration-500 animate-pop-in ring-1 ring-rose-200/50 dark:ring-rose-500/20">
                            <p>{funFact}</p>
                        </div>
                    )}
                </section>
            </main>
            <ChatbotIcon />
        </div>
    );
};

export default HomeScreen;