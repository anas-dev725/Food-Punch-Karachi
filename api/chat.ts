
import { GoogleGenAI, FunctionDeclaration, Type } from "@google/genai";

// Inline constants to ensure zero dependency resolution issues on Vercel
const BUSINESS_INFO_LITE = {
  tagline: 'Authenticity in Every Punch!',
  description: 'Karachi\'s premier home-based food delivery, specializing in traditional Memoni Khawsa and Singaporean Rice.',
  whatsapp: '+92 331 2721804'
};

const MENU_SUMMARY = [
  "Special Chicken Khawsa: Rs. 850",
  "Singaporean Rice: Rs. 750",
  "Kachri Qeema: Rs. 950",
  "Chicken Makhni: Rs. 700",
  "Curry Pakora & Memoni Khichri: Rs. 550",
  "Green Chicken Pulao: Rs. 750",
  "Daigi Chicken Biryani: Rs. 800",
  "Beef Shami Kebab: Rs. 1200",
  "Fried Onions: Rs. 550",
  "Frozen Fries: Rs. 700",
  "Veggie Spring Rolls: Rs. 450"
].join(", ");

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

export default async function handler(req: any, res: any) {
  // 1. Handle CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 2. Validate Method
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // 3. Robust Body Parsing
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        console.error("JSON Parsing Error:", e);
      }
    }
    const history = body?.history || [];

    // 4. API Key Validation
    const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("Server Error: API_KEY is missing in environment variables.");
      return res.status(500).json({ text: "System Error: The AI assistant is not configured correctly (Missing API Key)." });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const systemInstruction = `
      You are a friendly AI assistant for "Food Punch Karachi".
      Info: ${BUSINESS_INFO_LITE.description}
      Menu: ${MENU_SUMMARY}
      Contact: ${BUSINESS_INFO_LITE.whatsapp}
      
      RULES:
      1. Plain text only. No markdown/asterisks.
      2. Keep responses short and friendly.
      3. Call 'addToCart' if user confirms they want to order specific items.
      4. After calling the tool, wait for result, then confirm to user.
    `;

    // 5. Generate Content
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: history,
      config: {
        systemInstruction,
        temperature: 0.7,
        tools: [{ functionDeclarations: [addToCartTool] }]
      },
    });

    // 6. Extract Response safely
    // Fallback to empty string if text is undefined (e.g. purely functional response or blocked)
    const text = response.text || "";

    return res.status(200).json({
      text: text.replace(/\*/g, ''),
      toolCalls: response.functionCalls,
      modelContent: response.candidates?.[0]?.content
    });

  } catch (error: any) {
    console.error("Gemini API Runtime Error:", error);
    // Return a valid JSON error that the frontend can display
    return res.status(500).json({ 
      text: "I'm having a little trouble connecting to the server right now. Please try again in a moment!",
      error: error.message 
    });
  }
}
