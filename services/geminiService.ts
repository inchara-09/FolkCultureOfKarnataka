import { GoogleGenAI, Chat } from "@google/genai";
import { ChatMessage, Language } from '../types';

const getChatbotResponse = async (messages: ChatMessage[], language: Language): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const systemInstruction = language === 'kn' 
    ? `You are 'Sanskriti', a friendly AI expert on Karnataka's rural folk culture. 
       - Respond ONLY in Kannada language (using Kannada script).
       - Keep your answers concise and engaging, around 5-6 sentences.
       - Use markdown for formatting: bold is **text** and italics is *text*. Do not use triple asterisks.
       - Your knowledge is strictly limited to the folk arts, music, dance, rituals, crafts, and traditions of rural Karnataka.
       - Politely decline any questions outside this topic.`
    : `You are 'Sanskriti', a friendly AI expert on Karnataka's rural folk culture. 
       - Respond ONLY in English.
       - Keep your answers concise and engaging, around 5-6 sentences.
       - Use markdown for formatting: bold is **text** and italics is *text*. Do not use triple asterisks.
       - Your knowledge is strictly limited to the folk arts, music, dance, rituals, crafts, and traditions of rural Karnataka.
       - Politely decline any questions outside this topic.`;


    const chat: Chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: systemInstruction,
        },
        // We convert our message format to the one the API expects
        history: messages.slice(0, -1).map(msg => ({
            role: msg.role,
            parts: [{ text: msg.text }],
        })),
    });

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.role !== 'user') {
        return "I can't respond without a user message.";
    }

    const result = await chat.sendMessage({ message: lastMessage.text });
    return result.text;
  } catch (error) {
    console.error("Error fetching Gemini response:", error);
    return language === 'kn'
      ? "ಕ್ಷಮಿಸಿ, ದೋಷವೊಂದು ಸಂಭವಿಸಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ."
      : "Sorry, an error occurred. Please try again.";
  }
};

export default getChatbotResponse;