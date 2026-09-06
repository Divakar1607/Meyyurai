import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Search, CheckCircle, Target, Database, ShieldCheck } from 'lucide-react';

export default function HeroAnimation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 3);
    }, 4000); // Change step every 4 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full aspect-video bg-slate-900 rounded-[2rem] shadow-2xl relative overflow-hidden flex items-center justify-center p-6 sm:p-8 border-4 border-rose-500/20 z-10">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-rose-900 opacity-50" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 w-full max-w-sm bg-slate-800/80 backdrop-blur-md border border-slate-700/50 rounded-2xl shadow-xl p-8 h-72 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="w-20 h-20 bg-orange-500/20 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/10 border border-orange-500/20">
                <FileText className="text-orange-400" size={40} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">1. Parsing Resume</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Extracting skills, experience, and candidate claims...</p>
              </div>
              
              <div className="w-full space-y-2 pt-2">
                <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3.2, ease: "linear" }}
                    className="h-full bg-orange-500"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="flex gap-4">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center shadow-lg border border-purple-500/20"
                >
                  <Search className="text-purple-400" size={32} />
                </motion.div>
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                  className="w-16 h-16 bg-rose-500/20 rounded-2xl flex items-center justify-center shadow-lg border border-rose-500/20"
                >
                  <Database className="text-rose-400" size={32} />
                </motion.div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">2. Verifying Evidence</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Cross-referencing GitHub & external proofs</p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                <motion.span 
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
                  className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full flex items-center gap-1 border border-emerald-500/30"
                >
                  <CheckCircle size={12} /> React JS
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }}
                  className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full flex items-center gap-1 border border-emerald-500/30"
                >
                  <CheckCircle size={12} /> Node.js
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.5 }}
                  className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-medium rounded-full flex items-center gap-1 border border-amber-500/30"
                >
                  <Search size={12} /> AWS
                </motion.span>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="relative w-24 h-24">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="8" />
                  <motion.circle 
                    cx="50" cy="50" r="45" fill="none" stroke="#10b981" strokeWidth="8"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 0.95 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeDasharray="283"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="text-2xl font-black text-emerald-400 drop-shadow-md"
                  >
                    95%
                  </motion.span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">3. Job Alignment</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Highly aligned with Software Engineer JD.</p>
              </div>
              
              <motion.button 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
                className="mt-2 w-full py-2 bg-rose-500/20 text-rose-400 font-semibold rounded-lg border border-rose-500/30 flex items-center justify-center gap-2 hover:bg-rose-500/30 transition-colors"
              >
                <Target size={18} /> View Match Details
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
