
import { MenuItem, Review } from './types';

export const BUSINESS_INFO = {
  name: 'Food Punch Karachi',
  whatsapp: '+923312721804',
  foodpanda: 'https://www.foodpanda.pk/restaurant/fpk/food-punch-karachi',
  tagline: 'Authenticity in Every Punch!',
  description: 'Karachi\'s premier home-based food delivery, specializing in traditional Memoni Khawsa and Singaporean Rice.',
  // Use a food-related vector or your actual logo URL here. 
  // If this string is empty, it defaults to the "FP" text icon.
  logoUrl: 'https://raw.githubusercontent.com/anas-dev725/Food-Punch-Karachi/7f6f6282c38aae6d9ca3a1d19446175e53f91610/food%20punch.jpg'
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'khawsa-1',
    name: 'Special Chicken Khawsa',
    description: 'Loaded with tender chicken, rich coconut curry, bold spices, and crunchy toppings. Pure Karachi-style satisfaction in every bite.',
    price: 850,
    category: 'Signature',
    // Coconut curry noodle soup style image
    image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80&w=800',
    tag: 'Famous'
  },
  {
    id: 'singaporean-1',
    name: 'Singaporean Rice',
    description: 'Layers of premium rice, noodles, spicy chicken, and our signature mayo-garlic sauce topping. A crowd favorite.',
    price: 750,
    category: 'Signature',
    // Rice bowl with toppings style image
    image: 'https://images.unsplash.com/photo-1603133872878-684f1084263d?auto=format&fit=crop&q=80&w=800',
    tag: 'Signature'
  },
  {
    id: 'kachri-qeema-1',
    name: 'Kachri Qeema',
    description: 'A perfect blend of spices and tender meat that melts in your mouth. A signature delicacy of Food Punch.',
    price: 950,
    category: 'Signature',
    // Minced meat dish style image
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=800',
    tag: 'Signature Dish'
  },
  {
    id: 'chicken-makhni-monday',
    name: 'Chicken Makhni with 2 Rotis',
    description: 'Start your week with a creamy delight! Rich and flavorful Chicken Makhni served with soft, fresh rotis.',
    price: 700,
    category: 'Weekly Specials',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800',
    tag: 'Monday Special'
  },
  {
    id: 'curry-combo-wednesday',
    name: 'Curry Pakora & Memoni Khichri',
    description: 'The perfect comfort food duo for a Wholesome Wednesday. Traditional taste!',
    price: 550,
    category: 'Weekly Specials',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800',
    tag: 'Wednesday Special'
  },
  {
    id: 'green-pulao-friday',
    name: 'Green Chicken Pulao & Raita',
    description: 'Fragrant pulao made with fresh green herbs and succulent chicken. Served with cooling mint raita.',
    price: 750,
    category: 'Weekly Specials',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=800',
    tag: 'Friday Special'
  },
  {
    id: 'daigi-biryani-friday',
    name: 'Daigi Chicken Biryani',
    description: 'Perfectly spiced and packed with tender chicken, this biryani will make your taste buds dance.',
    price: 800,
    category: 'Weekly Specials',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&q=80&w=800',
    tag: 'Friday Special'
  },
  {
    id: 'shami-kebab',
    name: 'Beef Shami Kebab (Dozen)',
    description: 'Home-made beef shami kebabs prepared with fresh spices. Frozen and ready to fry.',
    price: 1200,
    category: 'Popular',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'fried-onions-delight',
    name: 'Fried Onions Delight (500g)',
    description: 'Elevate your dishes with this essential topping, adding a burst of flavor and crunch.',
    price: 550,
    category: 'Popular',
    image: 'https://images.unsplash.com/photo-1619683548700-1c70258557d3?auto=format&fit=crop&q=80&w=800',
    tag: 'Essentials'
  },
  {
    id: 'frozen-fries-1kg',
    name: 'Frozen French Fries (1kg)',
    description: 'Enjoy hot, crunchy fries anytime straight from your freezer to your plate!',
    price: 700,
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1573016608438-301f642afb79?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'spring-rolls',
    name: 'Veggie Spring Rolls (12pc)',
    description: 'Crispy, hand-rolled appetizers with fresh garden vegetables and mild spices.',
    price: 450,
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800'
  }
];

export const REVIEWS: Review[] = [
  { id: 'r1', name: 'Zainab Ahmed', text: 'The Khawsa took me back to my grandmother\'s house. Authentic and spicy!', rating: 5 },
  { id: 'r2', name: 'Omar Malik', text: 'Best Singaporean rice in Karachi. The sauce is addictive.', rating: 5 },
  { id: 'r3', name: 'Sara Khan', text: 'Hygiene is clearly a priority. Everything was packaged so well.', rating: 5 },
  { id: 'r4', name: 'Mustafa Jalal', text: 'Ordered the Monday Special. The Makhni was incredibly creamy and fresh.', rating: 5 }
];

export const CATERING_SERVICES = [
  {
    id: 'bulk',
    title: 'Bulk Orders',
    description: 'Family gatherings or religious events? Order our famous Khawsa or Biryani by the Daig.',
    icon: 'Package'
  },
  {
    id: 'corporate',
    title: 'Corporate Events',
    description: 'Premium lunch boxes and executive catering for office meetings and seminars.',
    icon: 'Briefcase'
  },
  {
    id: 'live-station',
    title: 'Live Stations',
    description: 'Add charm to your parties with our live Kachri Qeema or Fry Kebab stations.',
    icon: 'Flame'
  },
  {
    id: 'hi-tea',
    title: 'Hi-Tea Platters',
    description: 'Assorted finger foods including Shami Kebabs, Spring Rolls, and Sandwiches.',
    icon: 'Coffee'
  }
];
