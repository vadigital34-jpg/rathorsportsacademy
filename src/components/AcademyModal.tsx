import React, { useState } from 'react';
import { X, CheckCircle2, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AcademyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRICING = [
  { sport: 'Cricket', price: '2,500', slots: '10 Left', timing: 'Morning/Evening' },
  { sport: 'Basketball', price: '1,800', slots: '15 Left', timing: 'Evening' },
  { sport: 'Skating', price: '1,500', slots: '5 Left', timing: 'Weekend' },
];

export default function AcademyModal({ isOpen, onClose }: AcademyModalProps) {
  const [step, setStep] = useState<1 | 2>(1); // 1: Info/Pricing, 2: Form
  
  const [studentName, setStudentName] = useState('');
  const [age, setAge] = useState('');
  const [sport, setSport] = useState('');
  const [timing, setTiming] = useState('');
  const [contact, setContact] = useState('');

  if (!isOpen) return null;

  const handleAdmissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetNumber = "919079911681";
    const message = `*New Academy Admission*\n\nStudent Name: ${studentName}\nAge: ${age}\nSport: ${sport}\nPreferred Timing: ${timing}\nParent/Guardian Contact: ${contact}`;
    const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
    setStep(1);
    
    // Reset form
    setStudentName('');
    setAge('');
    setSport('');
    setTiming('');
    setContact('');
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0F1E]/80 backdrop-blur-sm p-4 overflow-y-auto"
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-[#161F33] border border-white/5 rounded-[2.5rem] w-full max-w-3xl relative my-8"
        >
          <button 
            onClick={onClose}
            className="absolute right-6 top-6 text-slate-400 hover:text-white transition-colors z-10 bg-white/5 p-2 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="p-8 md:p-12">
            {step === 1 ? (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="text-center mb-10">
                  <h2 className="text-4xl font-black uppercase italic text-white mb-4 tracking-tight">Join Academy</h2>
                  <p className="text-slate-400 font-medium max-w-md mx-auto">Professional coaching with expert trainers. Select your sport to get started.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                  {PRICING.map((p, idx) => (
                    <div key={idx} className="bg-[#111827] border border-white/5 rounded-[2rem] p-6 hover:border-blue-500/50 transition-colors flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-2">{p.sport}</h3>
                        <div className="text-3xl font-black text-blue-500 mb-6 tracking-tighter flex items-end gap-1">₹{p.price}<span className="text-[10px] tracking-widest uppercase text-slate-500 mb-1">/mo</span></div>
                      </div>
                      
                      <div className="space-y-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-blue-500" />
                          <span>{p.timing}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          <span className="text-emerald-400">{p.slots}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setStep(2)}
                  className="w-full bg-white text-slate-900 hover:bg-slate-200 font-black uppercase tracking-widest py-5 rounded-2xl transition-colors text-sm shadow-xl"
                >
                  Proceed to Admission Form
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="text-3xl font-black uppercase italic text-white mb-8 tracking-tight">Admission Form</h2>
                <form className="space-y-6" onSubmit={handleAdmissionSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Student Name</label>
                      <input type="text" required value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Full Name" className="w-full bg-[#111827] border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Age</label>
                      <input type="number" required value={age} onChange={(e) => setAge(e.target.value)} placeholder="Years" min="4" max="60" className="w-full bg-[#111827] border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Sport</label>
                      <select required value={sport} onChange={(e) => setSport(e.target.value)} className="w-full bg-[#111827] border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none font-medium">
                        <option value="">Select Sport</option>
                        <option value="cricket">Cricket</option>
                        <option value="basketball">Basketball</option>
                        <option value="skating">Skating</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Preferred Timing</label>
                      <select required value={timing} onChange={(e) => setTiming(e.target.value)} className="w-full bg-[#111827] border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none font-medium">
                        <option value="">Select Timing</option>
                        <option value="morning">Morning Batch (6AM - 8AM)</option>
                        <option value="evening">Evening Batch (4PM - 6PM)</option>
                        <option value="weekend">Weekend Batch</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Parent/Guardian Contact</label>
                    <input type="tel" required value={contact} onChange={(e) => setContact(e.target.value)} placeholder="+91 XXXXX XXXXX" className="w-full bg-[#111827] border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium" />
                  </div>

                  <div className="flex gap-4 pt-6">
                    <button 
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-8 py-5 rounded-2xl border-2 border-white/10 text-white hover:bg-white/5 transition-colors font-bold uppercase tracking-widest text-sm"
                    >
                      Back
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 bg-green-500 hover:bg-green-400 text-white font-black uppercase tracking-widest text-sm py-5 rounded-2xl transition-colors shadow-lg shadow-green-500/20 flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Apply via WhatsApp
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
