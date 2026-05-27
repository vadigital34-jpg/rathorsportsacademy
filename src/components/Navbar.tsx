import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onBookGround: () => void;
  onJoinAcademy: () => void;
}

export default function Navbar({ onBookGround, onJoinAcademy }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-40 p-4 md:p-6 transition-all duration-300">
      <nav className={`container mx-auto flex justify-between items-center bg-[#161F33]/80 backdrop-blur-md px-6 md:px-8 py-4 rounded-3xl border border-white/5 transition-all ${isScrolled ? 'shadow-lg border-white/10 bg-[#161F33]/95' : ''}`}>
        
        <a href="#" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center font-black italic text-white text-xl">R</div>
          <span className="text-lg md:text-xl font-black italic tracking-tighter text-white">RATHOR SPORTS<br/><span className="text-[10px] tracking-widest not-italic opacity-60">CRICKET ACADEMY</span></span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex gap-8 text-sm font-bold text-slate-400 uppercase tracking-widest">
          <a href="#about" className="hover:text-white transition-colors tracking-widest">About</a>
          <a href="#programs" className="hover:text-white transition-colors tracking-widest">Programs</a>
          <a href="#gallery" className="hover:text-white transition-colors tracking-widest">Gallery</a>
          <a href="#contact" className="hover:text-white transition-colors tracking-widest">Contact</a>
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <button onClick={onJoinAcademy} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-full font-bold text-sm tracking-widest uppercase transition-all">
            Join Academy
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
          <Menu className="w-8 h-8" />
        </button>

      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-4 bg-[#161F33] z-50 flex flex-col p-8 rounded-[2.5rem] border border-white/10 shadow-2xl"
          >
            <div className="flex justify-end mb-12">
              <button className="text-slate-400 hover:text-white bg-white/5 p-2 rounded-full" onClick={() => setMobileMenuOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex flex-col gap-6 text-2xl font-black italic uppercase text-center flex-1">
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-blue-500">About</a>
              <a href="#programs" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-blue-500">Programs</a>
              <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-blue-500">Gallery</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-blue-500">Contact</a>
              
              <div className="mt-auto pb-4 flex flex-col gap-4">
                <button onClick={() => { setMobileMenuOpen(false); onJoinAcademy(); }} className="border-2 border-white/10 text-white py-4 rounded-2xl tracking-widest text-sm font-bold uppercase hover:bg-white/5 transition-colors">Join Academy</button>
                <button onClick={() => { setMobileMenuOpen(false); onBookGround(); }} className="bg-blue-600 text-white py-4 rounded-2xl tracking-widest text-sm font-bold uppercase hover:bg-blue-500 transition-colors">Book Ground</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
