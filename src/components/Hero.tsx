import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface HeroProps {
  onBookGround: () => void;
  onJoinAcademy: () => void;
  onBookDemo: () => void;
}

export default function Hero({ onBookGround, onJoinAcademy, onBookDemo }: HeroProps) {
  return (
    <section className="relative pt-32 pb-6 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="bg-[#0A0F1E] rounded-[2.5rem] p-10 md:p-16 flex flex-col justify-center relative overflow-hidden min-h-[70vh] border border-white/5">
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <img 
              src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2805&auto=format&fit=crop" 
              alt="Stadium" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-transparent to-transparent"></div>
          </motion.div>

          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 blur-[100px] rounded-full -mr-20 -mt-20 pointer-events-none z-0"></div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="z-10 relative"
          >
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.8, type: "spring" }}
              className="text-6xl md:text-8xl lg:text-9xl font-black uppercase italic leading-none mb-6">
              Train.<br/>Play.<br/>Compete.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
              className="text-lg md:text-xl text-blue-100 max-w-xl leading-relaxed mb-10 font-medium">
              Professional Cricket, Basketball & Skating Coaching with Premium Ground Booking Facilities.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
              className="flex flex-col md:flex-row gap-4 flex-wrap">
              <button 
                onClick={onBookGround}
                className="bg-white text-blue-900 px-8 py-4 rounded-2xl font-bold uppercase tracking-wider shadow-xl hover:scale-105 transition-transform"
              >
                Book Ground
              </button>
              <button 
                onClick={onJoinAcademy}
                className="border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-wider backdrop-blur-sm hover:bg-white/10 transition-colors"
              >
                Join Academy
              </button>
              <button 
                onClick={onBookDemo}
                className="bg-blue-600/20 text-blue-400 border-2 border-blue-600/30 px-8 py-4 rounded-2xl font-bold uppercase tracking-wider backdrop-blur-sm hover:bg-blue-600/40 hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                Request Free Demo
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
