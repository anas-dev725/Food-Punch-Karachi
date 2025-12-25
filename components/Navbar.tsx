
import React from 'react';
import { ShoppingBag, Moon, Sun } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onNavigate: (page: 'home' | 'menu') => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick, theme, toggleTheme, onNavigate, currentPage }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 pt-6">
      <div className="max-w-6xl mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-gray-200 dark:border-slate-800 rounded-3xl shadow-lg">
        <div className="flex justify-between items-center h-20 px-8">
          {/* Logo Section */}
          <div 
            onClick={() => onNavigate('home')} 
            className="flex items-center space-x-3 cursor-pointer group"
          >
            {BUSINESS_INFO.logoUrl ? (
              <img 
                src={BUSINESS_INFO.logoUrl} 
                alt="Food Punch Logo" 
                className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform" 
              />
            ) : (
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
                FP
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-base font-extrabold text-gray-900 dark:text-white leading-none tracking-tighter">FOOD PUNCH</span>
              <span className="text-[9px] font-bold text-primary tracking-[0.3em] uppercase">Karachi</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            {['home', 'menu'].map((page) => (
              <button 
                key={page}
                onClick={() => onNavigate(page as any)}
                className={`text-[10px] font-bold uppercase tracking-widest transition-all ${currentPage === page ? 'text-primary' : 'text-gray-500 dark:text-gray-400 hover:text-primary'}`}
              >
                {page}
              </button>
            ))}
            <button className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-primary">Catering</button>
          </div>

          <div className="flex items-center space-x-6">
            <button 
              onClick={toggleTheme}
              className="p-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-2xl transition-all"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            
            <button 
              onClick={onCartClick}
              className="relative p-3 bg-primary text-white rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all group"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-secondary text-gray-900 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-md">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
