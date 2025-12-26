
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, MessageSquare } from 'lucide-react';
import { getChatbotResponse } from '../services/geminiService';
import { ChatMessage, MenuItem, Content, Part } from '../types';
import { MENU_ITEMS } from '../constants';

interface ChatbotProps {
  onAddToCart?: (item: MenuItem, openCart?: boolean) => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ onAddToCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hi! I\'m your Food Punch assistant. How can I help you with your order today?' }
  ]);
  const [apiHistory, setApiHistory] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsgText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsgText }]);
    setIsLoading(true);

    const userContent: Content = { role: 'user', parts: [{ text: userMsgText }] };
    let currentHistory = [...apiHistory, userContent];

    try {
      const result1 = await getChatbotResponse(currentHistory);

      if (result1.toolCalls && result1.toolCalls.length > 0 && onAddToCart) {
        // Tool was called
        if (result1.modelContent) {
           currentHistory = [...currentHistory, result1.modelContent];
        }

        const functionResponses: Part[] = [];

        for (const call of result1.toolCalls) {
          if (call.name === 'addToCart') {
            const itemsToAdd = (call.args as any).items || [];
            let addedDescription = "";
            for (const itemRequest of itemsToAdd) {
              const matchedItem = MENU_ITEMS.find(m => 
                m.name.toLowerCase().includes(itemRequest.itemName.toLowerCase()) || 
                itemRequest.itemName.toLowerCase().includes(m.name.toLowerCase())
              );

              if (matchedItem) {
                const qty = itemRequest.quantity || 1;
                for(let i=0; i<qty; i++) {
                  onAddToCart(matchedItem, false);
                }
                addedDescription += `${qty}x ${matchedItem.name}, `;
              }
            }
            
            functionResponses.push({
              functionResponse: {
                id: call.id,
                name: call.name,
                response: { result: { success: true, message: `Successfully added: ${addedDescription}` } }
              }
            });
          }
        }

        const toolResponseContent: Content = { role: 'function', parts: functionResponses };
        currentHistory = [...currentHistory, toolResponseContent];

        // Get final response after tool execution
        const result2 = await getChatbotResponse(currentHistory);
        
        if (result2.text) {
          setMessages(prev => [...prev, { role: 'model', text: result2.text }]);
          if (result2.modelContent) {
             setApiHistory([...currentHistory, result2.modelContent]);
          } else {
             setApiHistory(currentHistory);
          }
        } else {
           setMessages(prev => [...prev, { role: 'model', text: "I've added those items for you!" }]);
           setApiHistory(currentHistory);
        }

      } else {
        // Normal text response
        if (result1.text) {
          setMessages(prev => [...prev, { role: 'model', text: result1.text }]);
        } else {
           // If somehow text is empty and no tools
           setMessages(prev => [...prev, { role: 'model', text: "I'm listening, but I didn't quite catch that." }]);
        }

        if (result1.modelContent) {
          setApiHistory([...currentHistory, result1.modelContent]);
        } else if (result1.text) {
          setApiHistory([...currentHistory, { role: 'model', parts: [{ text: result1.text }] }]);
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having a bit of trouble connecting. Please try again!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
      {isOpen && (
        <div className="w-80 sm:w-96 h-[500px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-gray-100 animate-in fade-in zoom-in duration-200 origin-bottom-right">
          <div className="p-4 bg-red-600 text-white flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Food Punch AI</h3>
                <p className="text-[10px] text-white/80">Online | Homemade with love</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto bg-gray-50 space-y-4 scroll-smooth">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-red-600 text-white rounded-tr-none' : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 rounded-tl-none flex space-x-1">
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t bg-white">
            <div className="flex space-x-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Order Khawsa or ask a question..."
                className="flex-grow px-4 py-2 bg-gray-100 text-gray-900 placeholder-gray-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-600/20"
              />
              <button onClick={handleSend} disabled={isLoading} className="p-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="w-14 h-14 bg-red-600 text-white rounded-full shadow-lg hover:shadow-red-200 hover:scale-110 transition-all flex items-center justify-center group">
        {isOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7" />}
      </button>
    </div>
  );
};

export default Chatbot;
