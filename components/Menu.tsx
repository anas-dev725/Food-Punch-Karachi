
import React, { useState } from 'react';
import { Plus, ShoppingCart, Star, Search } from 'lucide-react';
import { MENU_ITEMS } from '../constants';
import { MenuItem } from '../types';

interface MenuProps {
  onAddToCart: (item: MenuItem) => void;
}

const Menu: React.FC<MenuProps> = ({ onAddToCart }) => {
  const categories = ['All', 'Signature', 'Weekly Specials', 'Popular', 'Appetizers'];
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="pb-32 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12 relative">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all shadow-lg shadow-gray-100/50 dark:shadow-none text-gray-900 dark:text-white placeholder-gray-400 font-medium"
          />
        </div>

        {/* Modern Category Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-20 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border-2 ${
                activeCategory === cat 
                  ? 'bg-red-600 border-red-600 text-white shadow-xl shadow-red-500/30' 
                  : 'bg-white dark:bg-slate-900 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-slate-800 hover:border-red-600/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No dishes found</h3>
            <p className="text-gray-500 dark:text-slate-400">Try adjusting your search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="group flex flex-col bg-white dark:bg-slate-900 rounded-[2.5rem] p-5 border border-gray-100 dark:border-slate-800 hover:border-red-600/30 shadow-sm hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 h-full"
              >
                {/* Card Image */}
                <div className="relative aspect-[4/3] mb-8 overflow-hidden rounded-[2rem]">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                    <Star className="text-yellow-400 w-5 h-5 fill-yellow-400" />
                  </div>
                  
                  {item.tag && (
                    <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-lg">
                      {item.tag}
                    </div>
                  )}
                </div>
                
                {/* Content Area - Flex Grow Ensures Alignment */}
                <div className="flex flex-col flex-grow px-3">
                  <span className="text-[10px] font-black text-red-600 dark:text-red-400 uppercase tracking-widest mb-3">{item.category}</span>
                  <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight group-hover:text-red-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 font-medium mb-6">
                    {item.description}
                  </p>

                  {/* Footer Section */}
                  <div className="mt-auto pt-6 border-t border-gray-50 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Bill</span>
                      <span className="text-2xl font-black text-gray-900 dark:text-white">Rs. {item.price}</span>
                    </div>
                    
                    <button 
                      onClick={() => onAddToCart(item)}
                      className="w-14 h-14 bg-red-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/20 hover:bg-gray-900 hover:-translate-y-1 transition-all active:scale-95"
                    >
                      <Plus className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;
