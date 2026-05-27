/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Programs from './components/Programs';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import AcademyModal from './components/AcademyModal';
import DemoModal from './components/DemoModal';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAcademyOpen, setIsAcademyOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <div className="min-h-screen relative">
      <motion.div 
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0F1E] pointer-events-none"
      >
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ duration: 0.4 }}
           className="text-4xl md:text-5xl font-black italic text-white uppercase text-center leading-snug px-4"
        >
          Rathor <span className="text-blue-500">Sports</span><br/><span className="text-blue-500">Cricket Academy</span>
        </motion.div>
      </motion.div>

      <Navbar 
        onBookGround={() => setIsBookingOpen(true)} 
        onJoinAcademy={() => setIsAcademyOpen(true)} 
      />
      
      <main>
        <Hero 
          onBookGround={() => setIsBookingOpen(true)} 
          onJoinAcademy={() => setIsAcademyOpen(true)} 
          onBookDemo={() => setIsDemoOpen(true)}
        />
        <About />
        <Programs onJoinClick={() => setIsAcademyOpen(true)} />
        <Gallery />
        <Contact />
      </main>

      <Footer />

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
      
      <AcademyModal 
        isOpen={isAcademyOpen} 
        onClose={() => setIsAcademyOpen(false)} 
      />

      <DemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />

    </div>
  );
}

