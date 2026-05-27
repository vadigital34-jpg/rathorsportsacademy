import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Image as ImageIcon, QrCode } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BookedSlot {
  ground: string;
  date: string;
  timeSlot: string;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [ground, setGround] = useState('cricket');
  const [duration, setDuration] = useState(1);
  const [price, setPrice] = useState(1500);
  
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('06:00 AM - 08:00 AM');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [hasScreenshot, setHasScreenshot] = useState(false);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState('');

  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([]);

  useEffect(() => {
    // Load existing bookings from local storage
    const stored = localStorage.getItem('rathor_booked_slots');
    if (stored) {
      try {
        setBookedSlots(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    // Simple mock pricing logic
    const basePrice = ground === 'cricket' ? 1500 : 800;
    setPrice(basePrice * duration);
  }, [ground, duration]);

  if (!isOpen) return null;

  const isSlotBooked = bookedSlots.some(
    (slot) => slot.ground === ground && slot.date === date && slot.timeSlot === timeSlot
  );

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSlotBooked) return;
    setStep(2);
  };

  const handleBookingSubmit = async () => {
    if (!imageBase64) return;
    
    setIsVerifying(true);
    setVerifyError('');

    try {
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64 }),
      });
      
      const data = await response.json();
      
      if (!response.ok || !data.isValid) {
        setVerifyError(data.reason || data.error || 'Invalid payment screenshot. Please upload a clear image of the transaction receipt.');
        setIsVerifying(false);
        return;
      }

      // Save booking to prevent others from booking
      const newBooking = { ground, date, timeSlot };
      const updatedBookings = [...bookedSlots, newBooking];
      setBookedSlots(updatedBookings);
      localStorage.setItem('rathor_booked_slots', JSON.stringify(updatedBookings));

      const targetNumber = "919079911681";
      const text = `*New Ground Booking (Payment Verified)*\n\nName: ${name}\nPhone: ${phone}\nSport: ${ground}\nDate: ${date}\nTime: ${timeSlot} (${duration} Hour${duration > 1 ? 's' : ''})\nTotal Amount: ₹${price}\nMessage: ${message || 'N/A'}\n\n*Note: User has uploaded a verified payment screenshot.*`;
      const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
      
      // Reset and close
      setStep(1);
      setHasScreenshot(false);
      setImageBase64(null);
      setIsVerifying(false);
      onClose();
    } catch (err: any) {
      console.error(err);
      setVerifyError('Verification failed. Please try again or contact support.');
      setIsVerifying(false);
    }
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
          className="bg-[#161F33] border border-white/5 rounded-[2.5rem] w-full max-w-lg relative my-8"
        >
          <button 
            onClick={() => { onClose(); setStep(1); setHasScreenshot(false); setImageBase64(null); setVerifyError(''); }}
            className="absolute right-6 top-6 text-slate-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="p-8 md:p-10">
            {step === 1 ? (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-3xl font-black uppercase italic text-white mb-2 tracking-tight">Book a Ground</h2>
                <p className="text-slate-400 text-sm mb-8 font-medium">Select your preferred sport and time slot to secure your booking.</p>

                <form className="space-y-6" onSubmit={handleNextStep}>
                  
                  {/* Ground Selection */}
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Select Ground</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setGround('cricket')}
                        className={`py-4 rounded-2xl border text-sm font-bold tracking-widest uppercase ${ground === 'cricket' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-[#111827] border-white/5 text-slate-400 hover:border-white/20'} transition-all`}
                      >
                        Cricket Ground
                      </button>
                      <button
                        type="button"
                        onClick={() => setGround('basketball')}
                        className={`py-4 rounded-2xl border text-sm font-bold tracking-widest uppercase ${ground === 'basketball' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-[#111827] border-white/5 text-slate-400 hover:border-white/20'} transition-all`}
                      >
                        Basketball
                      </button>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-[#111827] border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Time Slot</label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} className={`w-full bg-[#111827] border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none font-medium ${isSlotBooked && date ? 'ring-2 ring-red-500 border-transparent text-red-400' : ''}`}>
                          <option>06:00 AM - 08:00 AM</option>
                          <option>08:00 AM - 10:00 AM</option>
                          <option>04:00 PM - 06:00 PM</option>
                          <option>06:00 PM - 08:00 PM</option>
                          <option>08:00 PM - 10:00 PM</option>
                        </select>
                      </div>
                      {isSlotBooked && date && (
                        <p className="text-red-400 text-xs font-bold px-2 mt-1">⚠️ This slot is already booked!</p>
                      )}
                    </div>
                  </div>

                  {/* Duration Slider/Select */}
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Duration (Hours)</label>
                    <input 
                      type="range" 
                      min="1" 
                      max="6" 
                      value={duration} 
                      onChange={(e) => setDuration(parseInt(e.target.value))}
                      className="w-full rounded-2xl appearance-none bg-[#111827] border border-white/5 h-3 cursor-pointer accent-blue-500" 
                    />
                    <div className="text-right text-blue-500 font-black tracking-widest text-sm uppercase">{duration} Hour{duration > 1 ? 's' : ''}</div>
                  </div>

                  {/* Personal Details */}
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
                    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Message (Optional)</label>
                    <textarea rows={2} placeholder="Any specific requirements?" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full bg-[#111827] border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium resize-none" />
                  </div>

                  {/* Total Price */}
                  <div className="bg-blue-500/5 p-6 rounded-[1.5rem] flex items-center justify-between border border-blue-500/20">
                    <div className="text-[10px] tracking-widest uppercase font-bold text-slate-400">
                      Estimated Price
                    </div>
                    <div className="text-3xl font-black text-white">₹{price}</div>
                  </div>

                  {/* Submit */}
                  <button type="submit" disabled={isSlotBooked || !date} className="w-full bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed font-black uppercase tracking-widest py-5 rounded-2xl transition-colors text-sm shadow-xl mt-2">
                    Proceed to Payment
                  </button>

                </form>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-3xl font-black uppercase italic text-white mb-2 tracking-tight">Complete Payment</h2>
                <p className="text-slate-400 text-sm mb-8 font-medium">Scan the QR code to pay and upload a screenshot to confirm.</p>
                
                <div className="bg-[#0A0F1E] rounded-3xl p-8 flex flex-col items-center justify-center border border-white/5 mb-8">
                   <div className="w-48 h-48 bg-white rounded-2xl p-4 mb-6 shadow-2xl flex items-center justify-center relative overflow-hidden">
                      {/* Using a reliable open-source QR code generator API */}
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=rathorsports@upi&pn=Rathor%20Sports%20Academy&am=${price}&cu=INR`} 
                        alt="Payment QR Code" 
                        className="w-full h-full object-contain"
                      />
                   </div>
                   <div className="text-center space-y-1">
                      <div className="text-[10px] tracking-widest uppercase font-bold text-slate-500">Amount to Pay</div>
                      <div className="text-4xl font-black text-white">₹{price}</div>
                   </div>
                </div>

                <div className="space-y-4 mb-8">
                  <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1 block">Upload Screenshot</label>
                  <label className={`w-full flex flex-col items-center justify-center py-8 rounded-2xl border-2 border-dashed ${hasScreenshot ? 'border-green-500 bg-green-500/10 text-green-400' : 'border-slate-700 bg-[#111827] text-slate-400 hover:bg-slate-800'} cursor-pointer transition-colors`}>
                    {hasScreenshot ? <ImageIcon className="w-8 h-8 mb-2" /> : <QrCode className="w-8 h-8 mb-2 opacity-50" />}
                    <span className="text-sm font-bold tracking-widest uppercase">{hasScreenshot ? "Screenshot Uploaded" : "Tap to Upload"}</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setHasScreenshot(true);
                          setVerifyError('');
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setImageBase64(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden" 
                    />
                  </label>
                  {verifyError && (
                    <p className="text-red-400 text-sm font-bold text-center mt-2 px-4 py-2 bg-red-500/10 rounded-xl border border-red-500/20">{verifyError}</p>
                  )}
                </div>

                <div className="flex gap-4">
                    <button 
                      type="button"
                      disabled={isVerifying}
                      onClick={() => { setStep(1); setVerifyError(''); }}
                      className="px-6 py-5 rounded-2xl border-2 border-white/10 text-white hover:bg-white/5 disabled:opacity-50 transition-colors font-bold uppercase tracking-widest text-sm"
                    >
                      Back
                    </button>
                    <button 
                      type="button"
                      disabled={!hasScreenshot || isVerifying || !imageBase64}
                      onClick={handleBookingSubmit}
                      className="flex-1 bg-green-500 text-white hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed font-black uppercase tracking-widest py-5 rounded-2xl transition-colors text-sm shadow-xl flex items-center justify-center gap-2"
                    >
                      {isVerifying ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                          Verifying...
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
                          Confirm via WhatsApp
                        </>
                      )}
                    </button>
                </div>
                <p className="text-[10px] text-slate-500 mt-6 text-center font-bold tracking-wider uppercase">
                  Note: WhatsApp doesn't auto-attach images. Please attach your screenshot manually in the chat.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
