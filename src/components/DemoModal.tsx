import React, { useState } from 'react';
import { X, Calendar, MessageCircle, PlaySquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sport, setSport] = useState('cricket');

  if (!isOpen) return null;

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetNumber = "919079911681";
    const message = `*Free Demo Request*\n\nName: ${name}\nPhone: ${phone}\nSport: ${sport}\nInterested In: Joining Academy`;
    const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onClose();

    // Reset form
    setName('');
    setPhone('');
    setSport('cricket');
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
        
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-[#161F33] border border-white/5 rounded-[2.5rem] w-full max-w-lg relative z-10"
        >
          <button 
            onClick={onClose}
            className="absolute right-6 top-6 text-slate-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="p-8 md:p-10">
            <h2 className="text-3xl font-black uppercase italic text-white mb-2 tracking-tight flex items-center gap-3">
              <PlaySquare className="w-8 h-8 text-blue-500" />
              Book Free Demo
            </h2>
            <p className="text-slate-400 text-sm mb-8 font-medium">Not sure yet? Come visit us, experience the facilities, and have a free session before deciding.</p>

            <form className="space-y-6" onSubmit={handleDemoSubmit}>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Full Name</label>
                  <input type="text" placeholder="John Doe" required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-[#111827] border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Phone Number</label>
                  <input type="tel" placeholder="+91 XXXXX XXXXX" required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-[#111827] border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Sport</label>
                <select value={sport} onChange={(e) => setSport(e.target.value)} className="w-full bg-[#111827] border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none font-medium">
                  <option value="cricket">Cricket</option>
                  <option value="basketball">Basketball</option>
                  <option value="skating">Skating</option>
                </select>
              </div>

              <button type="submit" className="w-full bg-green-500 text-white hover:bg-green-400 font-black uppercase tracking-widest py-5 rounded-2xl transition-colors text-sm shadow-xl mt-2 flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Request Demo via WhatsApp
              </button>

            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
