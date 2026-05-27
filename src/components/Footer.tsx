import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#0A0F1E] border-t border-white/5 py-12">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-2xl font-black uppercase italic text-white tracking-widest mb-6 leading-snug">
          Rathor <span className="text-blue-500">Sports</span><br/><span className="text-blue-500 text-lg">Cricket Academy</span>
        </h2>
        
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-slate-500 font-bold uppercase text-[10px] tracking-widest">
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#programs" className="hover:text-white transition-colors">Programs</a>
          <a href="#gallery" className="hover:text-white transition-colors">Gallery</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>

        <p className="text-slate-600 text-[10px] uppercase font-bold tracking-widest">
          &copy; {new Date().getFullYear()} Rathor Sports Cricket Academy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
