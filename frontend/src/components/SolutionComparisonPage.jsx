import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  ChevronRight, 
  ArrowLeft, 
  ArrowDown,
  UserCheck, 
  FileText, 
  FolderGit2, 
  FileCheck2, 
  Cpu, 
  Target, 
  Download, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Clock, 
  Layers, 
  FileSpreadsheet, 
  Search, 
  Sparkles, 
  Share2,
  Workflow
} from 'lucide-react';

const ScrollFadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function SolutionComparisonPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const traditionalChallenges = [
    {
      icon: Clock,
      title: "Manual Screening",
      desc: "Recruiters spend substantial time manually scanning through hundreds of candidate resumes line by line, introducing fatigue and cognitive bias."
    },
    {
      icon: Layers,
      title: "Limited Evidence Consolidation",
      desc: "Supporting evidence may be stored across different platforms, disparate emails, and separate candidate submissions without unified tracking."
    },
    {
      icon: Search,
      title: "Separate Credential Checks",
      desc: "Certificates, diplomas, and technical profiles need independent, isolated examination, creating repetitive manual verification overhead."
    },
    {
      icon: Clock,
      title: "Time-Consuming Job Matching",
      desc: "Comparing candidate skills with nuanced job requirements can require excessive manual effort and subjective guesswork."
    },
    {
      icon: FileSpreadsheet,
      title: "Scattered Evaluation Results",
      desc: "Resume claims, notes, and supporting proof are fragmented across tools, resulting in disconnected evaluation records rather than a unified report."
    }
  ];

  const meyyuraiCapabilities = [
    {
      number: "01",
      icon: FileText,
      title: "Resume Parsing",
      desc: "Extract relevant candidate information, core competencies, and structured claims from uploaded PDF, DOCX, TXT, and image resumes automatically.",
      tag: "Intelligent NLP",
      actionText: "Upload & Parse",
      route: "/upload"
    },
    {
      number: "02",
      icon: FolderGit2,
      title: "GitHub Integration",
      desc: "Retrieve public GitHub profile metrics, active repositories, code languages, and commit history directly as verifiable engineering evidence.",
      tag: "Live API Evidence",
      actionText: "View Evidence Hub",
      route: "/evidence"
    },
    {
      number: "03",
      icon: FileCheck2,
      title: "Certificate OCR",
      desc: "Extract text from uploaded certificate images and diplomas to assist skill verification and substantiate credentials objectively.",
      tag: "Vision OCR",
      actionText: "Check Certificate OCR",
      route: "/evidence"
    },
    {
      number: "04",
      icon: Cpu,
      title: "Claim Evaluation",
      desc: "Evaluate resume claims against the supporting evidence available to the system, calculating transparent confidence scores per claim.",
      tag: "Multi-Source Scoring",
      actionText: "View Verification",
      route: "/dashboard"
    },
    {
      number: "05",
      icon: Target,
      title: "Job Alignment",
      desc: "Compare the candidate's verified profile with single or multiple target job descriptions to identify skill matches and specific gaps.",
      tag: "JD Matching Engine",
      actionText: "Check Job Match",
      route: "/dashboard"
    },
    {
      number: "06",
      icon: Download,
      title: "Candidate Report",
      desc: "Display claim statuses, resume strength scores, job alignment results, and actionable recommendations. Support one-click PDF export using existing reporting functionality.",
      tag: "Actionable Intelligence",
      actionText: "Open Report & PDF",
      route: "/dashboard"
    }
  ];

  const tableFeatures = [
    {
      feature: "Resume Analysis",
      traditional: "Primarily manual review",
      meyyurai: "Resume parsing and analysis support",
      category: "Analysis"
    },
    {
      feature: "Evidence Collection",
      traditional: "Often performed separately",
      meyyurai: "GitHub and certificate evidence in one workflow",
      category: "Evidence"
    },
    {
      feature: "Claim Evaluation",
      traditional: "Manual checking may be required",
      meyyurai: "Claim evaluation against available evidence",
      category: "Verification"
    },
    {
      feature: "Job Matching",
      traditional: "Manual comparison",
      meyyurai: "Job alignment analysis",
      category: "Matching"
    },
    {
      feature: "Results",
      traditional: "May be scattered across sources",
      meyyurai: "Consolidated candidate report",
      category: "Reporting"
    },
    {
      feature: "Report Export",
      traditional: "Depends on the process used",
      meyyurai: "PDF export supported by the application",
      category: "Reporting"
    }
  ];

  const filteredFeatures = activeTab === 'all' 
    ? tableFeatures 
    : tableFeatures.filter(item => item.category.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      {/* Top Navigation Bar */}
      <motion.nav 
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-slate-200/60 bg-white/90 backdrop-blur-xl sticky top-0 z-50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div 
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 text-brand-dark font-black text-2xl tracking-tight cursor-pointer hover:opacity-90 transition-opacity"
          >
            <ShieldCheck size={32} className="text-rose-600" />
            <span>Meyyurai</span>
            <span className="text-xs uppercase tracking-widest font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 ml-1 hidden sm:inline-block">
              Comparison
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/')}
              className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium text-sm rounded-full hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft size={16} /> Home
            </button>
            <button 
              onClick={() => navigate('/upload')}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-full transition-all shadow-md shadow-rose-600/20 flex items-center gap-1.5 text-sm"
            >
              Start Verification <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Header Section */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 overflow-hidden bg-gradient-to-b from-white via-rose-50/20 to-slate-50 border-b border-slate-200/60">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[100px] -translate-y-1/2" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[80px] translate-y-1/2" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200/60 text-rose-700 text-xs sm:text-sm font-semibold shadow-xs"
          >
            <Workflow size={16} className="text-rose-600" />
            Architectural & Workflow Evaluation
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]"
          >
            Existing Solution vs Our Solution
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Discover how MEYYURAI improves the resume verification and job alignment workflow.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <a 
              href="#traditional-section" 
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-colors"
            >
              Traditional Screening
            </a>
            <a 
              href="#meyyurai-section" 
              className="px-5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-sm font-semibold transition-colors"
            >
              MEYYURAI Solution
            </a>
            <a 
              href="#comparison-matrix" 
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-colors"
            >
              Comparison Matrix
            </a>
          </motion.div>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-28">

        {/* SECTION 1: TRADITIONAL RESUME SCREENING */}
        <section id="traditional-section" className="space-y-12 scroll-mt-28">
          <ScrollFadeIn className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/70 text-slate-700 text-xs font-bold uppercase tracking-wider">
              Traditional Approach
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Traditional Resume Screening
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Traditional resume screening commonly involves manually reviewing resumes, separately checking credentials, and comparing candidate profiles against job requirements.
            </p>
          </ScrollFadeIn>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Cols: Challenges Cards */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
                Operational Challenges
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {traditionalChallenges.map((challenge, idx) => {
                  const Icon = challenge.icon;
                  return (
                    <ScrollFadeIn key={idx} delay={idx * 0.08}>
                      <div className="h-full bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group">
                        <div className="flex items-center gap-3.5 mb-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-rose-50 group-hover:text-rose-600 flex items-center justify-center transition-colors shrink-0">
                            <Icon size={20} />
                          </div>
                          <h4 className="font-bold text-slate-800 text-base leading-snug">
                            {challenge.title}
                          </h4>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed">
                          {challenge.desc}
                        </p>
                      </div>
                    </ScrollFadeIn>
                  );
                })}
              </div>
            </div>

            {/* Right 5 Cols: Vertical Block Diagram */}
            <div className="lg:col-span-5">
              <ScrollFadeIn delay={0.2}>
                <div className="bg-slate-900 text-white p-7 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold block">
                        Sequential Pipeline
                      </span>
                      <h4 className="text-lg font-bold text-slate-100">
                        Traditional Workflow
                      </h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-400 text-xs font-mono">
                      Manual Flow
                    </span>
                  </div>

                  {/* Vertical Block Diagram */}
                  <div className="space-y-2 relative">
                    {[
                      { step: "Candidate Resume", desc: "Unstructured PDF / Word document received" },
                      { step: "Manual Resume Screening", desc: "Recruiter skims text & highlights keywords" },
                      { step: "Separate Credential Checks", desc: "Disparate checks via emails & external links" },
                      { step: "Manual Job Matching", desc: "Subjective mental comparison with job opening" },
                      { step: "Recruiter Evaluation", desc: "Decentralized notes and non-standardized decision" }
                    ].map((node, i, arr) => (
                      <React.Fragment key={i}>
                        <div className="bg-slate-800/80 hover:bg-slate-800 p-4 rounded-xl border border-slate-700/70 transition-all flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-slate-700 text-slate-300 text-xs flex items-center justify-center font-mono">
                                {i + 1}
                              </span>
                              <span className="font-bold text-sm text-slate-100">
                                {node.step}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 pl-7">{node.desc}</p>
                          </div>
                          <span className="w-2 h-2 rounded-full bg-rose-400/60 shrink-0"></span>
                        </div>

                        {i < arr.length - 1 && (
                          <div className="flex justify-center py-1">
                            <div className="flex flex-col items-center">
                              <div className="w-0.5 h-3 bg-slate-700" />
                              <ArrowDown size={14} className="text-rose-400/80 -my-0.5" />
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                    <span>High latency, fragmented data stores & prone to recruiter fatigue</span>
                  </div>
                </div>
              </ScrollFadeIn>
            </div>
          </div>
        </section>

        {/* SECTION 2: OUR SOLUTION — MEYYURAI */}
        <section id="meyyurai-section" className="space-y-12 scroll-mt-28">
          <ScrollFadeIn className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider">
              Unified Platform
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              MEYYURAI — Evidence-Based Resume Analysis
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              MEYYURAI combines resume parsing, evidence collection, claim evaluation, and job alignment in a unified application.
            </p>
          </ScrollFadeIn>

          {/* Capabilities Grid: 6 cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {meyyuraiCapabilities.map((cap, idx) => {
              const Icon = cap.icon;
              return (
                <ScrollFadeIn key={idx} delay={idx * 0.08}>
                  <div 
                    onClick={() => cap.route && navigate(cap.route)}
                    className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-rose-300 transition-all h-full flex flex-col justify-between group cursor-pointer"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-all duration-300 flex items-center justify-center shadow-inner">
                          <Icon size={24} />
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-rose-600 transition-colors">
                          {cap.number}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <div className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-semibold mb-1">
                          {cap.tag}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                          {cap.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {cap.desc}
                        </p>
                      </div>
                    </div>

                    <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-rose-600 transition-colors">
                      <span className="flex items-center gap-1 text-rose-600 font-bold group-hover:underline">
                        {cap.actionText} <ChevronRight size={14} />
                      </span>
                      <CheckCircle2 size={16} className="text-emerald-500" />
                    </div>
                  </div>
                </ScrollFadeIn>
              );
            })}
          </div>

          {/* Connected Block Diagram for MEYYURAI */}
          <ScrollFadeIn delay={0.2}>
            <div className="bg-gradient-to-br from-slate-900 via-[#0B2E33] to-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-2xl border border-teal-900/40 relative overflow-hidden">
              <div className="max-w-3xl mx-auto text-center space-y-2 mb-10">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                  System Architecture
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  MEYYURAI End-to-End Pipeline
                </h3>
                <p className="text-slate-300 text-sm max-w-xl mx-auto">
                  Automated ingestion, concurrent multi-source evidence extraction, contextual verification, and unified reporting.
                </p>
              </div>

              {/* Block Diagram Canvas */}
              <div className="max-w-2xl mx-auto space-y-4">
                
                {/* 1. Resume Upload + JD */}
                <div className="bg-white/10 hover:bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center shadow-lg transition-all">
                  <div className="font-bold text-base sm:text-lg text-white flex items-center justify-center gap-2">
                    <FileText className="text-rose-400" size={20} />
                    Resume Upload + Target Job Description
                  </div>
                  <p className="text-xs text-slate-300 mt-1">Multi-format resume parsing and job description ingestion</p>
                </div>

                {/* Arrow */}
                <div className="flex justify-center -my-1">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-4 bg-emerald-400/80" />
                    <ArrowDown size={18} className="text-emerald-400 -mt-1" />
                  </div>
                </div>

                {/* 2. Resume Parsing */}
                <div className="bg-white/10 hover:bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center shadow-lg transition-all">
                  <div className="font-bold text-base sm:text-lg text-white flex items-center justify-center gap-2">
                    <Cpu className="text-amber-400" size={20} />
                    Resume Parsing
                  </div>
                  <p className="text-xs text-slate-300 mt-1">NLP-driven claim decomposition & skill extraction</p>
                </div>

                {/* Arrow */}
                <div className="flex justify-center -my-1">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-4 bg-emerald-400/80" />
                    <ArrowDown size={18} className="text-emerald-400 -mt-1" />
                  </div>
                </div>

                {/* 3. Evidence Collection */}
                <div className="bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-emerald-400/40 text-center shadow-lg">
                  <div className="font-bold text-base sm:text-lg text-emerald-300 flex items-center justify-center gap-2">
                    <Sparkles className="text-emerald-400" size={20} />
                    Evidence Collection
                  </div>
                  <p className="text-xs text-slate-300 mt-1">Parallel evidence acquisition hub</p>
                </div>

                {/* Branching Arrows to GitHub & OCR */}
                <div className="grid grid-cols-2 gap-4 px-8 text-center text-emerald-400 font-mono text-sm">
                  <div className="flex flex-col items-center">
                    <span className="text-xl">↙</span>
                    <span className="text-[11px] text-slate-300 font-sans">GitHub Stream</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xl">↘</span>
                    <span className="text-[11px] text-slate-300 font-sans">Vision OCR Stream</span>
                  </div>
                </div>

                {/* Split Nodes: GitHub + Certificate OCR */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700/80 flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-700 text-slate-200 shrink-0">
                      <FolderGit2 size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-100">GitHub Integration</h4>
                      <p className="text-xs text-slate-400">Repositories, tech stack, activity</p>
                    </div>
                  </div>

                  <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700/80 flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-700 text-slate-200 shrink-0">
                      <FileCheck2 size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-100">Certificate OCR</h4>
                      <p className="text-xs text-slate-400">Image text & credential recognition</p>
                    </div>
                  </div>
                </div>

                {/* Converging Arrows */}
                <div className="grid grid-cols-2 gap-4 px-8 text-center text-emerald-400 font-mono text-sm">
                  <div className="flex flex-col items-center">
                    <span className="text-xl">↘</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xl">↙</span>
                  </div>
                </div>

                {/* 4. Claim Evaluation */}
                <div className="bg-white/10 hover:bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center shadow-lg transition-all">
                  <div className="font-bold text-base sm:text-lg text-white flex items-center justify-center gap-2">
                    <ShieldCheck className="text-rose-400" size={20} />
                    Claim Evaluation
                  </div>
                  <p className="text-xs text-slate-300 mt-1">Cross-reference claims vs GitHub commits & certificate text</p>
                </div>

                {/* Arrow */}
                <div className="flex justify-center -my-1">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-4 bg-emerald-400/80" />
                    <ArrowDown size={18} className="text-emerald-400 -mt-1" />
                  </div>
                </div>

                {/* 5. Job Alignment Analysis */}
                <div className="bg-white/10 hover:bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center shadow-lg transition-all">
                  <div className="font-bold text-base sm:text-lg text-white flex items-center justify-center gap-2">
                    <Target className="text-amber-400" size={20} />
                    Job Alignment Analysis
                  </div>
                  <p className="text-xs text-slate-300 mt-1">Semantic match score, verified skills vs gaps detection</p>
                </div>

                {/* Arrow */}
                <div className="flex justify-center -my-1">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-4 bg-emerald-400/80" />
                    <ArrowDown size={18} className="text-emerald-400 -mt-1" />
                  </div>
                </div>

                {/* 6. Candidate Report + PDF Export (Interactive) */}
                <div 
                  onClick={() => navigate('/dashboard')}
                  className="bg-gradient-to-r from-rose-600 to-rose-700 text-white p-5 rounded-2xl shadow-xl text-center border border-rose-400/40 cursor-pointer hover:shadow-2xl hover:scale-[1.01] hover:from-rose-500 hover:to-rose-600 transition-all group"
                  title="Click to view candidate report dashboard"
                >
                  <div className="font-bold text-lg sm:text-xl flex items-center justify-center gap-2">
                    <Download size={22} className="group-hover:translate-y-0.5 transition-transform" />
                    <span>Candidate Report + PDF Export</span>
                  </div>
                  <p className="text-xs text-rose-100 mt-1">
                    Complete verification dossier, ATS check, interview questions & printable PDF
                  </p>
                  <div className="mt-3.5 pt-3 border-t border-rose-500/50 flex flex-wrap items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/dashboard');
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-white/20 hover:bg-white text-white hover:text-rose-700 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                    >
                      <Target size={14} /> Open Candidate Report
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.print();
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-white/20 hover:bg-white text-white hover:text-rose-700 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                    >
                      <Download size={14} /> Export / Print PDF
                    </button>
                  </div>
                </div>

              </div>

              {/* Diagram Footnote */}
              <div className="mt-8 text-center text-xs text-slate-400">
                <span className="inline-flex items-center gap-2 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  Fully functional in MEYYURAI today — test it with the active upload pipeline
                </span>
              </div>
            </div>
          </ScrollFadeIn>
        </section>

        {/* SECTION 3: INTERACTIVE COMPARISON TABLE */}
        <section id="comparison-matrix" className="space-y-8 scroll-mt-28">
          <ScrollFadeIn className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 text-slate-700 text-xs font-bold uppercase tracking-wider">
              Feature-by-Feature Matrix
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Interactive Comparison Table
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Clearly distinguishing traditional recruitment workflows from the multi-modal verification capabilities implemented in MEYYURAI.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {['all', 'analysis', 'evidence', 'verification', 'matching', 'reporting'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${
                    activeTab === tab
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {tab === 'all' ? 'All Features' : tab}
                </button>
              ))}
            </div>
          </ScrollFadeIn>

          <ScrollFadeIn delay={0.1}>
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/80 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/80">
                      <th className="py-5 px-6 sm:px-8 text-xs font-bold text-slate-500 uppercase tracking-wider w-1/4">
                        Feature
                      </th>
                      <th className="py-5 px-6 sm:px-8 text-xs font-bold text-slate-500 uppercase tracking-wider w-3/8 bg-slate-100/50">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                          Traditional Approach
                        </div>
                      </th>
                      <th className="py-5 px-6 sm:px-8 text-xs font-bold text-rose-600 uppercase tracking-wider w-3/8 bg-rose-50/50">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_#E11D48]" />
                          MEYYURAI Solution
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredFeatures.map((row, idx) => (
                      <tr 
                        key={idx} 
                        className="hover:bg-slate-50/60 transition-colors"
                      >
                        <td className="py-5 px-6 sm:px-8 font-bold text-slate-900 align-top">
                          <div className="flex flex-col">
                            <span>{row.feature}</span>
                            <span className="text-[11px] font-normal text-slate-400 mt-0.5">
                              {row.category}
                            </span>
                          </div>
                        </td>
                        <td className="py-5 px-6 sm:px-8 text-slate-600 bg-slate-50/20 align-top">
                          <div className="flex items-start gap-2.5">
                            <span className="mt-1 w-4 h-4 rounded-full bg-slate-200 text-slate-600 text-[10px] flex items-center justify-center shrink-0">
                              –
                            </span>
                            <span className="leading-relaxed">{row.traditional}</span>
                          </div>
                        </td>
                        <td className="py-5 px-6 sm:px-8 text-slate-900 bg-rose-50/10 font-medium align-top">
                          <div className="flex items-start gap-2.5">
                            <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                            <span className="leading-relaxed text-slate-800 font-semibold">{row.meyyurai}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Informational Clarification Callout */}
              <div className="bg-slate-50 p-6 sm:px-8 border-t border-slate-200/80 text-xs text-slate-500 flex items-start gap-3">
                <AlertCircle size={18} className="text-slate-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-slate-700">Note on Comparison Scope:</strong> This comparison highlights standard practices commonly encountered in manual or disjointed recruitment pipelines compared to the automated, multi-source evidence synthesis implemented in MEYYURAI. It does not imply that every traditional recruitment team lacks automated tooling, but contrasts disjointed manual verification with our unified end-to-end evidence workflow.
                </p>
              </div>
            </div>
          </ScrollFadeIn>
        </section>

        {/* Call to Action Banner */}
        <ScrollFadeIn>
          <div className="bg-gradient-to-r from-slate-900 via-brand-dark to-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            <div className="max-w-2xl mx-auto space-y-3 relative z-10">
              <h3 className="text-3xl font-black tracking-tight text-white">
                Experience the MEYYURAI Workflow
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Upload your resume, connect evidence sources, and see instant claim verification and job alignment scores in action.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 relative z-10 pt-2">
              <button
                onClick={() => navigate('/upload')}
                className="px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl shadow-lg shadow-rose-600/30 flex items-center gap-2 text-base transition-all"
              >
                Launch Verification Pipeline <ChevronRight size={18} />
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="px-6 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-2xl border border-slate-700 transition-all text-base"
              >
                View Sample Dashboard
              </button>
            </div>
          </div>
        </ScrollFadeIn>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 text-center text-slate-500 border-t border-slate-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <div className="flex items-center justify-center gap-2 text-slate-300 font-bold text-lg">
            <ShieldCheck size={22} className="text-rose-500" />
            <span>MEYYURAI</span>
          </div>
          <p className="text-xs text-slate-500">
            Resume Evidence Verification & Job Alignment Assistant • College Mini-Project Demonstration
          </p>
          <p className="text-xs text-slate-600">
            © 2026 Meyyurai. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
