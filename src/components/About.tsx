import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Users, BookOpen } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#0A0F1E] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:w-1/2 bg-[#161F33] rounded-[2.5rem] p-6 border border-white/5"
          >
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1512719994953-eabf50895df7?q=80&w=1000&auto=format&fit=crop" 
                alt="Cricket Practice" 
                className="rounded-[1.5rem] w-full h-64 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1000&auto=format&fit=crop" 
                alt="Basketball Coaching" 
                className="rounded-[1.5rem] w-full h-64 object-cover mt-8"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase italic text-white leading-tight mb-6">
              Empowering Athletes, <br/>
              <span className="text-blue-500">Building Champions.</span>
            </h2>
            <p className="text-base md:text-lg text-slate-400 mb-10 leading-relaxed font-medium">
              Rathor Sports Cricket Academy provides professional sports coaching and premium sports ground facilities for athletes of all age groups. We specialize in developing fundamental skills and competitive spirit in a high-quality environment.
            </p>

            <ul className="space-y-4">
              {[
                { icon: Trophy, title: 'Professional Trainers', desc: 'Learn from certified coaches with national-level experience.' },
                { icon: Users, title: 'Tournament Environment', desc: 'Regular match practices and competitive scenarios.' },
                { icon: BookOpen, title: 'Structured Practice', desc: 'Carefully designed sessions for cricket, basketball, and skating.' }
              ].map((item, idx) => (
                <li key={idx} className="flex gap-4 items-center bg-[#111827] p-4 rounded-2xl border border-white/5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm uppercase tracking-wider">{item.title}</h4>
                    <p className="text-slate-400 text-xs mt-1">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
