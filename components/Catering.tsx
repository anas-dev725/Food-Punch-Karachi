
import React from 'react';
import { Package, Briefcase, Flame, Coffee, CheckCircle, ArrowRight } from 'lucide-react';
import { CATERING_SERVICES, BUSINESS_INFO } from '../constants';

const Catering: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Package': return <Package className="w-8 h-8" />;
      case 'Briefcase': return <Briefcase className="w-8 h-8" />;
      case 'Flame': return <Flame className="w-8 h-8" />;
      case 'Coffee': return <Coffee className="w-8 h-8" />;
      default: return <Package className="w-8 h-8" />;
    }
  };

  return (
    <section className="pb-32 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Intro Section */}
        <div className="max-w-3xl mb-16">
          <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">Event Services</span>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-tight tracking-tight mb-6">
            Make Your Events <span className="text-primary">Unforgettable</span>
          </h2>
          <p className="text-gray-500 dark:text-slate-400 text-lg font-medium leading-relaxed">
            From intimate home gatherings to grand corporate events, Food Punch brings the authentic taste of Karachi to your table. We offer customized menus, live stations, and bulk orders tailored to your needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {CATERING_SERVICES.map((service) => (
            <div key={service.id} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 group">
              <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                {getIcon(service.icon)}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-500 dark:text-slate-400 font-medium leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="bg-gray-50 dark:bg-slate-900/50 rounded-[3rem] p-10 md:p-16 mb-20">
           <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-10 text-center">Why Choose Food Punch Catering?</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                "100% Hygienic Preparation",
                "Authentic Memoni Taste",
                "Timely Delivery & Setup"
              ].map((text, idx) => (
                <div key={idx} className="flex items-center space-x-4 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="font-bold text-gray-900 dark:text-white text-sm">{text}</span>
                </div>
              ))}
           </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-block p-1 bg-gradient-to-r from-primary to-secondary rounded-2xl">
            <div className="bg-white dark:bg-slate-950 rounded-[12px] px-10 py-12 md:px-20 md:py-16">
              <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Ready to Plan Your Event?</h3>
              <p className="text-gray-500 dark:text-slate-400 mb-8 max-w-lg mx-auto">Contact us on WhatsApp to discuss your menu and requirements. We recommend booking at least 48 hours in advance.</p>
              <a 
                href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=Hi%20Food%20Punch!%20I'm%20interested%20in%20your%20catering%20services.`}
                target="_blank"
                className="inline-flex items-center space-x-3 px-10 py-5 bg-primary text-white font-bold rounded-xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
              >
                <span>Chat on WhatsApp</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Catering;
