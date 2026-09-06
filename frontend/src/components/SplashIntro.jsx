import React from 'react';
import { motion } from 'framer-motion';

export default function SplashIntro() {
  const englishText = "Meyyurai".split("");
  
  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center bg-[#0B2E33]">
      {/* Animated gradient background */}
      <motion.div 
        animate={{ 
          background: [
            "radial-gradient(circle at 50% 50%, #0B2E33 0%, #041416 100%)",
            "radial-gradient(circle at 50% 50%, #02C39A20 0%, #041416 100%)",
            "radial-gradient(circle at 50% 50%, #0B2E33 0%, #041416 100%)"
          ] 
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
      />

      {/* Floating particles (very subtle) */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [-20, 30, -20],
            x: [-15, 20, -15],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
          }}
          className="absolute rounded-full bg-[#02C39A] blur-[40px]"
          style={{
            width: 80 + i * 20,
            height: 80 + i * 20,
            top: `${10 + i * 15}%`,
            left: `${20 + (i % 3) * 25}%`,
          }}
        />
      ))}

      {/* Center glowing radial light */}
      <motion.div 
        animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-96 h-96 bg-[#02C39A]/20 blur-[60px] rounded-full"
      />

      {/* Main Content Container with CSS Perspective */}
      <div className="relative z-10 flex flex-col items-center" style={{ perspective: '1000px' }}>
        
        {/* English Text: Staggered animation with 3D tilt */}
        <motion.div 
          initial={{ rotateX: 45, opacity: 0, y: 40 }}
          animate={{ rotateX: 0, opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex text-5xl md:text-7xl font-black text-white tracking-widest drop-shadow-[0_0_15px_rgba(2,195,154,0.6)]"
        >
          {englishText.map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 200 }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </motion.div>

        {/* Tamil Text (fades in after English) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
          className="mt-6 text-3xl md:text-4xl font-bold text-[#02C39A] drop-shadow-[0_0_8px_rgba(2,195,154,0.4)]"
          style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
        >
          மெய்யுரை
        </motion.div>

        {/* Animated Underline */}
        <motion.div 
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.2, delay: 1.6, ease: "circOut" }}
          className="h-1 mt-8 bg-[#02C39A] rounded-full shadow-[0_0_12px_#02C39A]"
        />
      </div>
    </div>
  );
}
