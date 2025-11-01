import React, { useEffect, useState } from 'react';
import { useAppContext } from '../App';
import { Category, CategoryDetail } from '../types';

const DetailCard: React.FC<{ detail: CategoryDetail; index: number }> = ({ detail, index }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100 + index * 150);
        return () => clearTimeout(timer);
    }, [index]);

    return (
        <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="group bg-white/70 dark:bg-slate-800/50 backdrop-blur-md rounded-xl overflow-hidden shadow-md flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-rose-800/20 dark:hover:shadow-rose-500/20 hover:scale-105 ring-1 ring-black/5 dark:ring-white/10">
                <div className="aspect-video bg-slate-200 dark:bg-slate-700">
                    <img src={detail.image} alt={detail.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 flex-grow">
                    <h3 className="text-xl font-bold text-rose-800 dark:text-rose-400">{detail.title}</h3>
                    <p className="mt-2 text-slate-700 dark:text-slate-300 text-sm">{detail.description}</p>
                </div>
                 <div className="absolute inset-0 rounded-xl ring-2 ring-inset ring-amber-500/80 dark:ring-amber-400/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
        </div>
    );
};

const DetailScreen: React.FC<{ categoryKey: string }> = ({ categoryKey }) => {
    const { t, goHome, language } = useAppContext();
    const category = t.categories.find(c => c.id === categoryKey);

    if (!category) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <p>Category not found.</p>
                <button onClick={goHome} className="mt-4 px-6 py-2 bg-rose-600 text-white rounded-lg">{t.backButton}</button>
            </div>
        );
    }
    
    // The title in Kannada can be just the category title itself.
    const title = language === 'en' ? t.detailScreenTitle(category.title.split(' ')[0]) : category.title;

    return (
        <div className="min-h-screen p-4 md:p-8 animate-fade-in-up">
            <header className="relative text-center mb-8">
                <button onClick={goHome} className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-full hover:bg-white/90 dark:hover:bg-slate-700/80 transition-colors text-slate-700 dark:text-slate-300 z-20 ring-1 ring-black/5 dark:ring-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t.backButton}
                </button>
                <div className="flex items-center justify-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-800 via-red-600 to-amber-500 dark:from-rose-500 dark:via-red-500 dark:to-amber-400 animate-fade-in-down">
                        {title}
                    </h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.details.map((detail, index) => (
                    <DetailCard key={index} detail={detail} index={index} />
                ))}
            </main>
        </div>
    );
};

export default DetailScreen;