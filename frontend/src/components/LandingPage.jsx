import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UploadCloud, CheckCircle, Search, Target, FileText, GitBranch, Database, Code, ShieldCheck, ChevronRight } from 'lucide-react';
import HeroAnimation from './HeroAnimation';

// Reusable scroll animation wrapper
const ScrollFadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden">
      {/* Navbar */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border-b border-slate-200/50 bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-brand-dark font-black text-2xl tracking-tight cursor-pointer">
            <ShieldCheck size={32} className="text-brand-rose" />
            <span>Meyyurai</span>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/upload')}
            className="px-6 py-2.5 bg-brand-dark hover:bg-slate-800 text-white font-semibold rounded-full transition-colors shadow-lg shadow-brand-dark/20 flex items-center gap-2 text-sm"
          >
            Get Started <ChevronRight size={16} />
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-10 pb-20 lg:py-0 overflow-hidden bg-gradient-to-br from-orange-50 via-white to-rose-50/50">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-rose/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
            
            {/* Left Copy */}
            <div className="space-y-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-rose/10 text-brand-rose font-semibold text-sm border border-brand-rose/20 backdrop-blur-sm"
              >
                <motion.span 
                  animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }}
                  className="w-2.5 h-2.5 rounded-full bg-brand-rose shadow-[0_0_8px_#02C39A]" 
                />
                AI-Powered Verification
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-black text-brand-dark tracking-tight leading-[1.1]"
              >
                Stop guessing.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-rose to-orange-500">
                  Start verifying.
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-slate-600 leading-relaxed max-w-lg font-medium"
              >
                Align candidates with jobs seamlessly. We verify resume claims against GitHub, certificates, and real evidence to ensure perfect matches.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-5"
              >
                <motion.button 
                  whileHover={{ scale: 1.02, boxShadow: "0px 15px 30px -5px rgba(2, 195, 154, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/upload')}
                  className="px-8 py-4 bg-brand-rose text-white font-bold rounded-2xl shadow-xl shadow-brand-rose/30 flex items-center justify-center gap-3 text-lg transition-all"
                >
                  Verify a Resume <UploadCloud size={22} />
                </motion.button>
              </motion.div>
            </div>

            {/* Right Animation/Video Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full aspect-video rounded-[2.5rem] p-3 bg-white/50 backdrop-blur-2xl border border-white/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]"
            >
              <motion.div 
                animate={{ y: [-8, 8, -8] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full rounded-[2rem] overflow-hidden shadow-2xl relative bg-slate-900 border border-slate-800"
              >
                <HeroAnimation />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="bg-brand-dark text-white py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-rose/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        
        <ScrollFadeIn className="max-w-4xl mx-auto px-4 text-center space-y-10 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">The Problem with Modern Hiring</h2>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-light">
            In today's competitive job market, candidates often inflate their resumes with unverified claims. 
            Recruiters spend countless hours manually cross-referencing skills, projects, and certificates. 
            <strong className="text-white font-semibold"> Our platform automates this tedious process, providing an objective confidence score for every claim.</strong>
          </p>
        </ScrollFadeIn>
      </section>

      {/* How It Works */}
      <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollFadeIn className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-brand-dark tracking-tight">How It Works</h2>
          <p className="text-xl text-slate-500 font-medium">A seamless 5-step verification pipeline</p>
        </ScrollFadeIn>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative">
          {/* Subtle connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-slate-200 to-transparent z-0" />
          
          {[
            { icon: FileText, title: "1. Upload", desc: "Upload resume (PDF, DOCX, TXT, Image) & paste job description." },
            { icon: Search, title: "2. Extract", desc: "NLP extracts skills, projects, and key claims." },
            { icon: Database, title: "3. Collect", desc: "Pull evidence from GitHub & OCR certificates." },
            { icon: CheckCircle, title: "4. Verify", desc: "AI matches claims to evidence and scores confidence." },
            { icon: Target, title: "5. Align", desc: "Compare verified skills against JD for a final match score." }
          ].map((step, idx) => (
            <ScrollFadeIn key={idx} delay={idx * 0.1} className="relative z-10">
              <motion.div 
                whileHover={{ y: -10 }}
                className="flex flex-col items-center text-center space-y-6 group bg-white p-6 rounded-3xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-xl hover:shadow-brand-rose/5 transition-all h-full"
              >
                <div className="w-20 h-20 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-brand-rose group-hover:text-white transition-all duration-300 shadow-inner group-hover:shadow-lg group-hover:shadow-brand-rose/30">
                  <step.icon size={36} strokeWidth={1.5} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-brand-dark">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            </ScrollFadeIn>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-white py-32 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeIn className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-brand-dark tracking-tight">Powered by Modern Tech</h2>
            <p className="text-xl text-slate-500 font-medium">Built for speed, accuracy, and enterprise scale.</p>
          </ScrollFadeIn>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Code, text: "React + Tailwind" },
              { icon: Database, text: "FastAPI + Python" },
              { icon: ShieldCheck, text: "spaCy NLP" },
              { icon: GitBranch, text: "GitHub API + OCR" }
            ].map((tech, idx) => (
              <ScrollFadeIn key={idx} delay={idx * 0.1}>
                <motion.div 
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="bg-slate-50 p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col items-center gap-4 hover:shadow-xl hover:shadow-brand-rose/10 hover:border-brand-rose/30 transition-all cursor-default"
                >
                  <div className="p-4 bg-white rounded-2xl shadow-sm text-brand-rose">
                    <tech.icon size={36} strokeWidth={1.5} />
                  </div>
                  <span className="font-bold text-slate-700 text-center">{tech.text}</span>
                </motion.div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer (Simple placeholder) */}
      <footer className="bg-slate-900 py-12 text-center text-slate-500">
        <p>© 2026 Meyyurai. All rights reserved.</p>
      </footer>
    </div>
  );
}
