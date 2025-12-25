
import React from 'react';
import { X, Trash2, ShoppingCart, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { BUSINESS_INFO } from '../constants';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToMenu?: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, onNavigateToMenu, items, onUpdateQuantity, onRemove }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = items.length > 0 ? 150 : 0;
  const total = subtotal + deliveryFee;

  const handleOrder = () => {
    const itemString = items.map(i => `${i.name} x${i.quantity}`).join(', ');
    const message = encodeURIComponent(`Assalamu Alaikum Food Punch! I'd like to place an order for: ${itemString}. Total bill: Rs. ${total}.`);
    window.open(`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${message}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold dark:text-white">Your Order</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors text-gray-400">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-24 h-24 bg-gray-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300 dark:text-slate-700">
                <ShoppingCart className="w-12 h-12" />
              </div>
              <p className="text-gray-500 font-medium">Your cart is empty.</p>
              <button 
                onClick={onNavigateToMenu || onClose}
                className="mt-6 px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-gray-900 transition-all"
              >
                Go to Menu
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex space-x-4">
                <img src={item.image} className="w-20 h-20 object-cover rounded-2xl shadow-sm" alt={item.name} />
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-900 dark:text-white leading-tight">{item.name}</h3>
                    <button onClick={() => onRemove(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-primary font-bold text-sm mb-3">Rs. {item.price}</p>
                  <div className="flex items-center bg-gray-50 dark:bg-slate-800 rounded-xl px-1 w-fit">
                    <button onClick={() => onUpdateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center hover:text-primary text-gray-400">-</button>
                    <span className="w-8 text-center font-bold text-gray-900 dark:text-white text-sm">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center hover:text-primary text-gray-400">+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-8 border-t border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/30 space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-gray-500 dark:text-slate-400"><span>Subtotal</span><span className="text-gray-900 dark:text-white font-medium">Rs. {subtotal}</span></div>
              <div className="flex justify-between text-gray-500 dark:text-slate-400"><span>Delivery</span><span className="text-gray-900 dark:text-white font-medium">Rs. {deliveryFee}</span></div>
              <div className="flex justify-between text-2xl font-black text-gray-900 dark:text-white pt-4 border-t border-gray-100 dark:border-slate-700">
                <span>Total</span><span className="text-primary">Rs. {total}</span>
              </div>
            </div>
            <button onClick={handleOrder} className="w-full py-5 bg-primary text-white font-black uppercase tracking-widest rounded-2xl hover:bg-gray-900 transition-all shadow-xl shadow-primary/20 flex items-center justify-center space-x-3">
              <ShoppingCart className="w-5 h-5" />
              <span>Checkout WhatsApp</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
