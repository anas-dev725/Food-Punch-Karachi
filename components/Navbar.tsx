
import React, { useState } from 'react';
import { ShoppingBag, Moon, Sun, Menu as MenuIcon, X } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onNavigate: (page: 'home' | 'menu' | 'catering') => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick, theme, toggleTheme, onNavigate, currentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileNavigate = (page: 'home' | 'menu' | 'catering') => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 md:px-6 md:pt-6">
      <div className="max-w-6xl mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-gray-200 dark:border-slate-800 rounded-3xl shadow-lg relative">
        <div className="flex justify-between items-center h-16 md:h-20 px-4 md:px-8">
          {/* Logo Section */}
          <div 
            onClick={() => handleMobileNavigate('home')} 
            className="flex items-center space-x-2 md:space-x-3 cursor-pointer group flex-shrink-0"
          >
            {BUSINESS_INFO.logoUrl ? (
              <img 
                src={BUSINESS_INFO.logoUrl} 
                alt="Food Punch Logo" 
                className="w-8 h-8 md:w-10 md:h-10 rounded-xl object-cover shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform" 
              />
            ) : (
              <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform text-xs md:text-base">
                FP
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-sm md:text-base font-extrabold text-gray-900 dark:text-white leading-none tracking-tighter">FOOD PUNCH</span>
              <span className="text-[8px] md:text-[9px] font-bold text-primary tracking-[0.3em] uppercase">Karachi</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {['home', 'menu', 'catering'].map((page) => (
              <button 
                key={page}
                onClick={() => onNavigate(page as any)}
                className={`text-[10px] font-bold uppercase tracking-widest transition-all ${currentPage === page ? 'text-primary' : 'text-gray-500 dark:text-gray-400 hover:text-primary'}`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Actions & Mobile Toggle */}
          <div className="flex items-center space-x-2 md:space-x-6">
            <button 
              onClick={toggleTheme}
              className="p-2 md:p-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-2xl transition-all"
            >
              {theme === 'light' ? <Moon className="w-4 h-4 md:w-5 md:h-5" /> : <Sun className="w-4 h-4 md:w-5 md:h-5" />}
            </button>
            
            <button 
              onClick={onCartClick}
              className="relative p-2 md:p-3 bg-primary text-white rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all group"
            >
              <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-secondary text-gray-900 text-[9px] md:text-[10px] font-black w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-2xl transition-all"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-4 right-4 mt-3 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2rem] shadow-2xl p-4 flex flex-col space-y-2 md:hidden animate-in slide-in-from-top-4 fade-in duration-300">
          {['home', 'menu', 'catering'].map((page) => (
            <button 
              key={page}
              onClick={() => handleMobileNavigate(page as any)}
              className={`w-full py-4 rounded-xl text-sm font-black uppercase tracking-widest transition-all flex items-center justify-between px-6 ${
                currentPage === page 
                ? 'bg-primary/10 text-primary' 
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'
              }`}
            >
              <span>{page}</span>
              {currentPage === page && <div className="w-2 h-2 rounded-full bg-primary"></div>}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
