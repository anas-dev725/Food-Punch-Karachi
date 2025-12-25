
import React from 'react';
import { BUSINESS_INFO } from '../constants';
import { ArrowRight, Utensils, ShieldCheck, Truck } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden dot-grid">
      {/* Food-themed Background Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] hero-gradient rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge - Now clearly visible due to increased padding */}
        <div className="inline-flex items-center space-x-3 bg-white dark:bg-slate-800 px-8 py-4 rounded-full border-2 border-primary/20 shadow-[0_0_40px_rgba(239,68,68,0.25)] mb-8 animate-in fade-in slide-in-from-top-4 duration-700 hover:scale-105 transition-transform cursor-default">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-widest">100% Homemade & Hygienic</span>
        </div>

        {/* 3-Line Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-[76px] font-extrabold text-gray-900 dark:text-white leading-[1.05] mb-8 tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Hi, We're <span className="text-primary">Food Punch</span><br />
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Authentic Memoni</span> Taste<br />
          <span className="text-gray-400 dark:text-slate-400">Karachi-Style Flavors</span>
        </h1>

        <p className="text-lg text-gray-500 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-8 duration-1000">
          Bringing the legendary Khawsa and Singaporean Rice to your doorstep. <br className="hidden md:block" />
          Zero compromise on hygiene, pure family recipes from our kitchen to yours.
        </p>

        {/* Action Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <button 
            onClick={onExplore}
            className="px-12 py-5 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            Explore Menu
          </button>
          <a 
            href={`https://wa.me/${BUSINESS_INFO.whatsapp}`}
            target="_blank"
            className="px-12 py-5 bg-white dark:bg-slate-900 text-gray-900 dark:text-white font-bold rounded-2xl border border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all flex items-center space-x-2 shadow-sm"
          >
            <span>WhatsApp Order</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Feature Cards - Redesigned to match image */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-in fade-in duration-1000 delay-500">
          {[
            { icon: <Utensils className="w-6 h-6" />, title: 'Pure Taste', sub: 'Traditional recipes' },
            { icon: <ShieldCheck className="w-6 h-6" />, title: 'Top Hygiene', sub: 'Home-prep safety' },
            { icon: <Truck className="w-6 h-6" />, title: 'Fast Delivery', sub: 'Karachi wide' }
          ].map((item, idx) => (
            <div key={idx} className="group flex flex-col items-center p-8 bg-white dark:bg-slate-900 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 w-full md:w-64 mx-auto">
              <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-[1.5rem] flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
