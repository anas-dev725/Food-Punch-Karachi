
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Signature' | 'Weekly Specials' | 'Popular' | 'Appetizers';
  image: string;
  tag?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
}

// AI Types (Decoupled from @google/genai for client-side use)
export interface Part {
  text?: string;
  inlineData?: {
    mimeType: string;
    data: string;
  };
  functionCall?: {
    name: string;
    args: Record<string, any>;
    id?: string;
  };
  functionResponse?: {
    name: string;
    response: Record<string, any>;
    id?: string;
  };
}

export interface Content {
  role: string;
  parts: Part[];
}
