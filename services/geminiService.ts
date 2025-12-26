
import { GoogleGenAI, FunctionDeclaration, Type } from "@google/genai";
import { BUSINESS_INFO, MENU_ITEMS } from "../constants";
import { Content } from "../types";

// Initialize AI Client
const apiKey = process.env.API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey || '' });

// 1. Prepare System Instruction
const menuStr = MENU_ITEMS.map(item => `${item.name}: Rs. ${item.price} (${item.category})`).join(', ');

const systemInstruction = `
  You are a friendly AI assistant for "Food Punch Karachi", a home-based food business.
  
  Business Info:
  - Tagline: ${BUSINESS_INFO.tagline}
  - Description: ${BUSINESS_INFO.description}
  - WhatsApp: ${BUSINESS_INFO.whatsapp}
  
  Menu:
  ${menuStr}
  
  Specialties: Memoni Khawsa and Singaporean Rice.
  
  Your Goal:
  - Answer questions about the menu, prices, and ingredients.
  - Be warm, polite, and helpful (like a caring home cook).
  - If a user explicitly confirms they want to order specific items (e.g., "Yes, add 2 Khawsa"), use the 'addToCart' tool.
  - Do NOT call 'addToCart' if they are just asking for price or info. Only if they confirm intent to buy.
  - Keep responses concise and avoid using Markdown formatting (no asterisks/bolding).
`;

// 2. Define Tools
const addToCartTool: FunctionDeclaration = {
  name: 'addToCart',
  parameters: {
    type: Type.OBJECT,
    description: 'Add items to the user\'s shopping cart when they explicitly confirm an order.',
    properties: {
      items: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
             itemName: { type: Type.STRING, description: 'The exact name of the item from the menu.' },
             quantity: { type: Type.INTEGER, description: 'The quantity to add. Default is 1.' }
          }
        }
      }
    },
    required: ['items']
  }
};

export const getChatbotResponse = async (history: Content[]) => {
  if (!apiKey) {
    console.error("API Key is missing!");
    return {
      text: "I'm sorry, I'm not configured correctly (Missing API Key).",
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: history,
      config: {
        systemInstruction,
        temperature: 0.7,
        tools: [{ functionDeclarations: [addToCartTool] }]
      },
    });

    const text = response.text || "";

    return {
      text: text.replace(/\*/g, ''), // Clean up any markdown
      toolCalls: response.functionCalls,
      modelContent: response.candidates?.[0]?.content
    };
    
  } catch (error: any) {
    console.error("Gemini Service Error:", error);
    return {
      text: "I'm having trouble connecting to the kitchen right now. Please try again!",
      error: error.message
    };
  }
};
