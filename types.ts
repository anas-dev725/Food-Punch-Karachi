
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
