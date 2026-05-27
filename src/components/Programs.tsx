import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface ProgramsProps {
  onJoinClick: () => void;
}

const PROGRAMS = [
  {
    title: 'Cricket Coaching',
    desc: 'Professional batting, bowling, and fielding drills for all age groups. Nets practice and open ground matches.',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Basketball Coaching',
    desc: 'Learn ball handling, shooting mechanics, and game strategies on our premium synthetic courts.',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Skating Coaching',
    desc: 'Beginner to advanced speed skating and balance training in a safe, dedicated rink area.',
    image: 'https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?q=80&w=800&auto=format&fit=crop'
  }
];

export default function Programs({ onJoinClick }: ProgramsProps) {
  return (
    <section id="programs" className="py-24 bg-[#0A0F1E]">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-slate-500 font-bold tracking-widest uppercase text-[10px] mb-3"
            >
              Our Offerings
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black italic uppercase text-white leading-tight"
            >
              Sports <br className="hidden md:block" />Programs
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm mt-4 md:mt-0 max-w-sm border-l-2 border-white/10 pl-6"
          >
            Specialized training modules tailored for different skill levels to help you master your favorite sport.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROGRAMS.map((program, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="bg-[#111827] rounded-[2.5rem] p-6 flex flex-col border border-white/5 hover:bg-[#161F33] transition-colors group"
            >
              <div className="h-48 overflow-hidden rounded-[1.5rem] mb-6">
                <img 
                  src={program.image} 
                  alt={program.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-2">{program.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{program.desc}</p>
                </div>
                <button 
                  onClick={onJoinClick}
                  className="w-full bg-white/5 group-hover:bg-blue-600 flex items-center justify-between p-4 rounded-2xl transition-colors"
                >
                  <span className="font-bold text-xs uppercase tracking-widest text-white">Join Now</span>
                  <span className="text-white opacity-50 group-hover:opacity-100 transition-opacity">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
