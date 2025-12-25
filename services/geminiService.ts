
import { GoogleGenAI, FunctionDeclaration, Type, Content } from "@google/genai";
import { BUSINESS_INFO, MENU_ITEMS } from "../constants";

// Define the tool
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
    
    IMPORTANT RULES:
    1. Do NOT use asterisks (*) for bolding or markdown. Keep response plain text.
    2. Keep answers concise.
    3. If the user says "Yes", "Confirm order", "I want this", or clearly confirms they want to add specific items to their order, call the 'addToCart' tool with the item details.
    4. When you call the 'addToCart' tool, YOU MUST STOP and wait for the tool execution. Do NOT generate text in the same turn as the tool call.
    5. After the tool output is provided to you (confirming items are added), THEN you reply to the user confirming the action verbally and asking if they want anything else.
    6. Do not call the tool if the user is just asking for information.
  `;

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

    let text = response.text || "";
    // Remove asterisks if any slipped through
    text = text.replace(/\*/g, '');

    return {
      text,
      toolCalls: response.functionCalls,
      // Helper to construct the model's turn in the history for the next request
      modelContent: response.candidates?.[0]?.content
    };
  } catch (error) {
    console.error("Chatbot error:", error);
    return {
      text: "Our apologies! Something went wrong connecting to the AI. You can reach us directly at " + BUSINESS_INFO.whatsapp,
      toolCalls: undefined,
      modelContent: undefined
    };
  }
};
