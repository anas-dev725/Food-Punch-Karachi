
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Catering from './components/Catering';
import Cart from './components/Cart';
import Chatbot from './components/Chatbot';
import { CartItem, MenuItem } from './types';
import { BUSINESS_INFO, REVIEWS, MENU_ITEMS } from './constants';
import { 
  ArrowLeft, 
  ArrowRight, 
  Star, 
  Phone, 
  Heart, 
  Instagram, 
  Facebook, 
  ShoppingCart,
  ChefHat,
  Truck,
  Utensils,
  Award,
  Users,
  Clock,
  HelpCircle,
  MapPin,
  ShieldCheck
} from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'menu' | 'catering'>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return localStorage.getItem('theme') as 'light' | 'dark' || 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Scroll to top whenever currentPage changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const addToCart = (item: MenuItem, openCart = true) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    if (openCart) {
      setIsCartOpen(true);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Home Page Specialties
  const signatures = MENU_ITEMS.filter(item => 
    item.id === 'khawsa-1' || item.id === 'singaporean-1' || item.id === 'kachri-qeema-1'
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 font-sans">
      <Navbar 
        cartCount={totalItems} 
        onCartClick={() => setIsCartOpen(true)} 
        theme={theme} 
        toggleTheme={toggleTheme} 
        onNavigate={setCurrentPage}
        currentPage={currentPage}
      />
      
      <main>
        {currentPage === 'home' ? (
          <>
            <Hero onExplore={() => setCurrentPage('menu')} />

            {/* Our Story Section - ALTERNATING BG (Gray) */}
            <section className="py-24 bg-gray-50 dark:bg-slate-900 overflow-hidden border-t border-gray-100 dark:border-slate-800">
              <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                  {/* Image Side */}
                  <div className="w-full lg:w-1/2 relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-primary/10 rounded-[3rem] -rotate-3 transform scale-105 -z-10"></div>
                    <img
                      src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&q=80&w=1000"
                      alt="Preparing food with love"
                      className="w-full h-auto block rounded-[3rem] shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 object-cover"
                    />
                    <div className="absolute -bottom-10 -right-10 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 max-w-xs hidden md:block">
                       <p className="text-sm font-bold text-gray-900 dark:text-white italic">"The secret ingredient is always love."</p>
                    </div>
                  </div>

                  {/* Text Side */}
                  <div className="w-full lg:w-1/2">
                    <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">Our Story</span>
                    <h2 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-tight tracking-tight mb-8">
                      Born in a <span className="text-primary">Karachi Kitchen</span>
                    </h2>
                    <div className="space-y-6 text-gray-500 dark:text-slate-400 font-medium text-lg leading-relaxed">
                      <p>
                        It all started with a simple belief: authentic Memoni food shouldn't be hard to find. Food Punch Karachi was born out of a passion for preserving the rich, spicy, and coconutty flavors of traditional Khawsa and Singaporean Rice.
                      </p>
                      <p>
                        We are not a commercial factory. We are a home-based kitchen where every pot is stirred with patience, and every ingredient is picked with care. We refuse to compromise on hygiene or quality, ensuring that every box delivered to you tastes like it was made by your own family.
                      </p>
                    </div>
                    
                    <div className="mt-10 flex items-center space-x-8">
                       <div>
                          <span className="block text-3xl font-black text-gray-900 dark:text-white">100%</span>
                          <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Homemade</span>
                       </div>
                       <div className="w-px h-12 bg-gray-200 dark:bg-slate-800"></div>
                       <div>
                          <span className="block text-3xl font-black text-gray-900 dark:text-white">0%</span>
                          <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Preservatives</span>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Signatures Section - ALTERNATING BG (White) */}
            <section className="py-24 bg-white dark:bg-slate-950 border-t border-gray-100 dark:border-slate-900 dot-grid">
              <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                  <div className="max-w-xl text-center md:text-left">
                    <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">Recommended for you</span>
                    <h2 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-tight tracking-tight">Our Signature Punches</h2>
                  </div>
                  <button 
                    onClick={() => setCurrentPage('menu')}
                    className="text-gray-500 dark:text-slate-400 hover:text-primary font-bold flex items-center space-x-2 transition-all group"
                  >
                    <span>BROWSE FULL MENU</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {signatures.map((item) => (
                    <div 
                      key={item.id} 
                      className="group flex flex-col bg-white dark:bg-slate-900 rounded-[2.5rem] p-5 border border-gray-100 dark:border-slate-800 hover:border-primary/30 shadow-sm hover:shadow-xl transition-all duration-500 h-full"
                    >
                      <div className="relative aspect-[4/3] mb-8 overflow-hidden rounded-[2rem]">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {item.tag && (
                          <div className="absolute top-4 right-4 bg-secondary text-gray-900 text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-lg">
                            {item.tag}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col flex-grow px-3">
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest mb-3">{item.category}</span>
                        <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight group-hover:text-primary transition-colors">{item.name}</h3>
                        <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 mb-6 font-medium">{item.description}</p>
                        <div className="mt-auto pt-6 border-t border-gray-50 dark:border-slate-800 flex items-center justify-between">
                          <div>
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Total Bill</span>
                            <span className="text-2xl font-black text-gray-900 dark:text-white">Rs. {item.price}</span>
                          </div>
                          <button 
                            onClick={() => addToCart(item)}
                            className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg hover:bg-gray-900 transition-all active:scale-95"
                          >
                            <ShoppingCart className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* How It Works Section - ALTERNATING BG (Gray) */}
            <section className="py-24 bg-gray-50 dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
              <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-20">
                    <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">The Process</span>
                    <h2 className="text-3xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight">From Our Kitchen to Yours</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 dark:bg-slate-800 -z-0"></div>
                    
                    <div className="relative z-10 flex flex-col items-center text-center group">
                        <div className="w-24 h-24 bg-white dark:bg-slate-900 border-4 border-gray-100 dark:border-slate-800 rounded-3xl flex items-center justify-center text-primary mb-8 shadow-xl group-hover:scale-110 transition-transform duration-300">
                            <Utensils className="w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4">1. Choose Your Punch</h3>
                        <p className="text-gray-500 dark:text-slate-400 font-medium leading-relaxed max-w-xs">Browse our menu of authentic Memoni delicacies and pick your favorites.</p>
                    </div>

                    <div className="relative z-10 flex flex-col items-center text-center group">
                        <div className="w-24 h-24 bg-white dark:bg-slate-900 border-4 border-gray-100 dark:border-slate-800 rounded-3xl flex items-center justify-center text-primary mb-8 shadow-xl group-hover:scale-110 transition-transform duration-300">
                            <ChefHat className="w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4">2. Cooked Fresh</h3>
                        <p className="text-gray-500 dark:text-slate-400 font-medium leading-relaxed max-w-xs">We prepare everything from scratch using premium home ingredients upon order.</p>
                    </div>

                    <div className="relative z-10 flex flex-col items-center text-center group">
                        <div className="w-24 h-24 bg-white dark:bg-slate-900 border-4 border-gray-100 dark:border-slate-800 rounded-3xl flex items-center justify-center text-primary mb-8 shadow-xl group-hover:scale-110 transition-transform duration-300">
                            <Truck className="w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4">3. Fast Delivery</h3>
                        <p className="text-gray-500 dark:text-slate-400 font-medium leading-relaxed max-w-xs">Hot, fresh, and hygienic food delivered straight to your doorstep in Karachi.</p>
                    </div>
                </div>
              </div>
            </section>

            {/* Stats Banner */}
            <section className="py-24 bg-primary text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center divide-x-0 md:divide-x divide-white/20">
                        <div className="flex flex-col items-center">
                            <Users className="w-8 h-8 mb-4 opacity-80" />
                            <div className="text-4xl lg:text-5xl font-black mb-2">5k+</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">Happy Eaters</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <Truck className="w-8 h-8 mb-4 opacity-80" />
                            <div className="text-4xl lg:text-5xl font-black mb-2">1.2k</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">Orders Delivered</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <Award className="w-8 h-8 mb-4 opacity-80" />
                            <div className="text-4xl lg:text-5xl font-black mb-2">50+</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">Signature Dishes</div>
                        </div>
                         <div className="flex flex-col items-center">
                            <Star className="w-8 h-8 mb-4 opacity-80" />
                            <div className="text-4xl lg:text-5xl font-black mb-2">4.9</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">Average Rating</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section - ALTERNATING BG (White) */}
            <section className="py-24 bg-white dark:bg-slate-950 border-t border-gray-100 dark:border-slate-900">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">Got Questions?</span>
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Frequently Asked Questions</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gray-50 dark:bg-slate-900 p-8 rounded-[2rem] border border-gray-100 dark:border-slate-800">
                            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-primary mb-6 shadow-sm">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Do you deliver all over Karachi?</h3>
                            <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed font-medium">Yes! We deliver to most major areas in Karachi. Delivery charges are calculated based on your distance from our kitchen.</p>
                        </div>
                         <div className="bg-gray-50 dark:bg-slate-900 p-8 rounded-[2rem] border border-gray-100 dark:border-slate-800">
                            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-primary mb-6 shadow-sm">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Is the food hygienic?</h3>
                            <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed font-medium">Absolutely! We are a home-based kitchen, not a commercial setup. We maintain strict hygiene standards and use only premium home ingredients.</p>
                        </div>
                         <div className="bg-gray-50 dark:bg-slate-900 p-8 rounded-[2rem] border border-gray-100 dark:border-slate-800">
                            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-primary mb-6 shadow-sm">
                                <Clock className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">How long does delivery take?</h3>
                            <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed font-medium">Since we cook fresh upon order, please allow 45-60 minutes for preparation and delivery, depending on your location.</p>
                        </div>
                         <div className="bg-gray-50 dark:bg-slate-900 p-8 rounded-[2rem] border border-gray-100 dark:border-slate-800">
                            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-primary mb-6 shadow-sm">
                                <HelpCircle className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">How do I place an order?</h3>
                            <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed font-medium">You can add items to your cart here and checkout via WhatsApp, or simply message us directly on WhatsApp to place your order.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reviews - ALTERNATING BG (Gray) */}
            <section className="py-24 bg-gray-50 dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
              <div className="max-w-6xl mx-auto px-6">
                <div className="flex items-center space-x-4 mb-16 justify-center">
                  <Heart className="text-primary fill-primary" />
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Our Happy Customers</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {REVIEWS.map((review) => (
                    <div key={review.id} className="bg-white dark:bg-slate-950 p-8 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col hover:translate-y-[-5px] transition-transform duration-300">
                      <div className="flex space-x-1 mb-6">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-secondary fill-secondary" />
                        ))}
                      </div>
                      <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed mb-8 flex-grow font-medium">"{review.text}"</p>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs mr-3">
                          {review.name.charAt(0)}
                        </div>
                        <span className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest">{review.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA Section - ALTERNATING BG (White) */}
            <section className="py-12 bg-white dark:bg-slate-950 mb-12 border-t border-gray-100 dark:border-slate-900">
              <div className="max-w-5xl mx-auto px-6">
                <div className="bg-gray-900 dark:bg-slate-900 rounded-[3rem] p-12 md:p-24 relative overflow-hidden shadow-2xl text-center border border-gray-800">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>
                    
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">Craving Authentic Taste?</h2>
                        <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium">Don't settle for average. Experience the true homemade flavor of Karachi today.</p>
                        <button 
                            onClick={() => setCurrentPage('menu')}
                            className="px-14 py-6 bg-white text-gray-900 font-black uppercase tracking-widest rounded-2xl hover:bg-primary hover:text-white transition-all transform hover:scale-105 shadow-xl"
                        >
                            Order Now
                        </button>
                    </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <div className="pt-32 min-h-screen dot-grid">
            <div className="max-w-6xl mx-auto px-6 mb-16">
              <button 
                onClick={() => setCurrentPage('home')}
                className="flex items-center space-x-2 text-gray-400 hover:text-primary font-extrabold transition-all mb-8 text-[10px] tracking-widest uppercase group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Return to Home</span>
              </button>
              <h2 className="text-5xl lg:text-7xl font-black text-gray-900 dark:text-white tracking-tighter leading-tight">
                {currentPage === 'menu' ? 'Pick Your Punch' : 'Catering'}
              </h2>
            </div>
            {currentPage === 'menu' ? (
              <Menu onAddToCart={addToCart} />
            ) : (
              <Catering />
            )}
          </div>
        )}
      </main>

      <footer className="bg-white dark:bg-slate-950 pt-24 pb-12 border-t border-gray-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div className="lg:col-span-2">
              <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-2xl mb-8 mx-auto md:mx-0">FP</div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Food Punch Karachi</h2>
              <p className="text-gray-500 dark:text-slate-400 max-w-sm mb-8 font-medium mx-auto md:mx-0">Authentic Karachi taste delivered to your home. Pure hygiene, zero compromises.</p>
              <div className="flex justify-center md:justify-start space-x-4">
                <a href="#" className="p-4 bg-gray-50 dark:bg-slate-900 rounded-2xl text-gray-400 hover:text-primary transition-all border border-gray-100 dark:border-slate-800"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="p-4 bg-gray-50 dark:bg-slate-900 rounded-2xl text-gray-400 hover:text-primary transition-all border border-gray-100 dark:border-slate-800"><Facebook className="w-5 h-5" /></a>
              </div>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-8 text-gray-400">Quick Links</h4>
              <nav className="flex flex-col space-y-4 font-bold text-sm">
                <button onClick={() => setCurrentPage('home')} className="text-gray-900 dark:text-gray-300 hover:text-primary text-center md:text-left">Home</button>
                <button onClick={() => setCurrentPage('menu')} className="text-gray-900 dark:text-gray-300 hover:text-primary text-center md:text-left">Menu</button>
                <a href={BUSINESS_INFO.foodpanda} target="_blank" className="text-gray-900 dark:text-gray-300 hover:text-primary">Foodpanda</a>
              </nav>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-8 text-gray-400">Support</h4>
              <div className="flex flex-col space-y-4 font-bold text-sm">
                <div className="flex items-center justify-center md:justify-start space-x-3 text-gray-900 dark:text-gray-300"><Phone className="w-4 h-4 text-primary" /><span>{BUSINESS_INFO.whatsapp}</span></div>
                <div className="flex items-center justify-center md:justify-start space-x-3 text-gray-900 dark:text-gray-300"><Clock className="w-4 h-4 text-primary" /><span>11:00 AM - 11:00 PM</span></div>
              </div>
            </div>
          </div>
          <div className="pt-10 border-t border-gray-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-widest gap-4">
            <span>© 2024 FOOD PUNCH KARACHI</span>
            <span className="text-primary">Karachi, Pakistan</span>
          </div>
        </div>
      </footer>

      {/* Chatbot and Cart */}
      <Chatbot onAddToCart={addToCart} />

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onNavigateToMenu={() => { setCurrentPage('menu'); setIsCartOpen(false); }}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
    </div>
  );
};

export default App;
