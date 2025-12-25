
import { GoogleGenAI } from "@google/genai";
import { BUSINESS_INFO, MENU_ITEMS } from "../constants";

export const getChatbotResponse = async (userPrompt: string, history: { role: 'user' | 'model', text: string }[]) => {
  // Always initialize with named parameter apiKey from process.env.API_KEY
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const menuStr = MENU_ITEMS.map(item => `${item.name}: Rs. ${item.price}`).join(', ');
  
  const systemInstruction = `
    You are a friendly AI assistant for "Food Punch Karachi", a home-based food business in Karachi.
    Business Info: ${BUSINESS_INFO.description} ${BUSINESS_INFO.tagline}.
    Contact: ${BUSINESS_INFO.whatsapp}.
    Menu: ${menuStr}.
    Specialties: Memoni Khawsa and Singaporean Rice.
    Tone: Warm, helpful, and polite. Encourage users to place orders via the cart or WhatsApp.
    Keep answers concise.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        // Map history to the expected Content format
        ...history.map(h => ({ 
          role: h.role === 'user' ? 'user' : 'model', 
          parts: [{ text: h.text }] 
        })),
        { role: 'user', parts: [{ text: userPrompt }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    // Use .text property directly (not a method)
    return response.text || "I'm sorry, I'm having a little trouble connecting. Please feel free to message us on WhatsApp!";
  } catch (error) {
    console.error("Chatbot error:", error);
    return "Our apologies! Something went wrong. You can reach us directly at " + BUSINESS_INFO.whatsapp;
  }
};
