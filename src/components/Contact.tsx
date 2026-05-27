import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, MapPin, Mail, MessageCircle } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetNumber = "919079911681";
    const text = `*New Inquiry*\n\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`;
    const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    setName('');
    setPhone('');
    setMessage('');
  };

  return (
    <section id="contact" className="py-24 bg-[#0A0F1E] relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 p-8 md:p-12 bg-[#161F33] rounded-[2.5rem] border border-white/5"
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase italic text-white mb-6">
              Get in Touch
            </h2>
            <p className="text-slate-400 font-medium mb-10">
              Have questions about admissions or ground bookings? Reach out to us.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-[#111827] rounded-2xl border border-white/5 flex-col md:flex-row">
                <div className="bg-blue-500/10 p-4 rounded-xl text-blue-500 flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-1 mt-2 md:mt-0">Phone</h4>
                  <p className="text-slate-400 text-sm font-medium">+91 90799 11681</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-[#111827] rounded-2xl border border-white/5 flex-col md:flex-row">
                <div className="bg-blue-500/10 p-4 rounded-xl text-blue-500 flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-1 mt-2 md:mt-0">Location</h4>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed">123 Sports Complex Road,<br/>Near Central Park, City Name 400001</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-[#111827] rounded-2xl border border-white/5 flex-col md:flex-row">
                <div className="bg-green-500/10 p-4 rounded-xl text-green-500 flex-shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-1 mt-2 md:mt-0">WhatsApp</h4>
                  <p className="text-slate-400 text-sm font-medium">Message us for quick replies.</p>
                  <button onClick={() => window.open('https://wa.me/919079911681', '_blank')} className="mt-2 text-green-400 hover:text-green-300 font-bold uppercase tracking-widest text-xs transition-colors">
                    Chat on WhatsApp &rarr;
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="bg-[#161F33] border border-white/5 p-8 md:p-12 rounded-[2.5rem] h-full flex flex-col justify-center">
              <h3 className="text-2xl font-black uppercase italic text-white mb-6">Send an Inquiry</h3>
              <form className="space-y-4" onSubmit={handleContactSubmit}>
                <div>
                  <input type="text" placeholder="Your Name" required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-[#0A0F1E] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-600 font-medium" />
                </div>
                <div>
                  <input type="tel" placeholder="Phone Number" required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-[#0A0F1E] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-600 font-medium" />
                </div>
                <div>
                  <textarea placeholder="Your Message" rows={4} required value={message} onChange={(e) => setMessage(e.target.value)} className="w-full bg-[#0A0F1E] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-600 font-medium resize-none"></textarea>
                </div>
                <button type="submit" className="w-full bg-green-500 hover:bg-green-400 text-white font-bold uppercase tracking-widest text-sm py-5 rounded-2xl transition-colors mt-2 shadow-lg shadow-green-500/20 flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Send via WhatsApp
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
