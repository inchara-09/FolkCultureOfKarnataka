export type Language = 'en' | 'kn';
export type Theme = 'light' | 'dark';

export type Screen = 'home' | 'detail' | 'chat';

export interface CategoryDetail {
  title: string;
  description: string;
  image: string;
}

export interface Category {
  id: string;
  title: string;
  image: string;
  details: CategoryDetail[];
}

export interface Content {
  patrioticQuote: string;
  rajyotsavaWishes: string;
  title: string;
  tagline: string;
  categories: Category[];
  funFactTitle: string;
  funFactButton: string;
  funFacts: string[];
  chatbotTitle: string;
  chatbotGreeting: string;
  chatbotPredefinedQuestions: string[];
  detailScreenTitle: (category: string) => string;
  backButton: string;
  sendMessagePlaceholder: string;
  loadingMessage: string;
  kannada: string;
  english: string;
}

export interface LocalizedContent {
  en: Content;
  kn: Content;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}