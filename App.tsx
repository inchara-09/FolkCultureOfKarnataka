import React, { useState, createContext, useContext, useMemo, useEffect } from 'react';
import { Language, Screen, Content, Theme } from './types';
import { content } from './data/content';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import ChatbotScreen from './screens/ChatbotScreen';

interface AppContextType {
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  theme: Theme;
  toggleTheme: () => void;
  t: Content;
  navigateToDetail: (categoryKey: string) => void;
  navigateToChat: () => void;
  goHome: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('kn');
  const [theme, setTheme] = useState<Theme>('light');
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string | null>(null);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };
  
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);


  const navigateToDetail = (categoryKey: string) => {
    setSelectedCategoryKey(categoryKey);
    setScreen('detail');
  };

  const navigateToChat = () => setScreen('chat');
  const goHome = () => setScreen('home');

  const t = useMemo(() => content[language], [language]);

  const contextValue = {
    language,
    setLanguage,
    theme,
    toggleTheme,
    t,
    navigateToDetail,
    navigateToChat,
    goHome
  };

  const renderScreen = () => {
    switch (screen) {
      case 'detail':
        return <DetailScreen categoryKey={selectedCategoryKey!} />;
      case 'chat':
        return <ChatbotScreen />;
      case 'home':
      default:
        return <HomeScreen />;
    }
  };
  
  return (
    <AppContext.Provider value={contextValue}>
      <div className={`min-h-screen bg-fixed bg-gradient-to-br from-amber-100 via-rose-100 to-yellow-100 text-slate-800 dark:from-teal-950 dark:via-slate-900 dark:to-stone-950 dark:text-slate-200 ${language === 'kn' ? 'font-kannada' : 'font-poppins'}`}>
        <div className="relative z-10">
          {renderScreen()}
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default App;