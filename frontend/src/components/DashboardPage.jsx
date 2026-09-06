import React, { useState, useEffect } from 'react';
import { Target, CheckCircle, AlertTriangle, Download, Award, ShieldCheck, XCircle, TrendingUp } from 'lucide-react';
import axios from 'axios';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [verifyData, setVerifyData] = useState(null);
  const [alignData, setAlignData] = useState(null);

  useEffect(() => {
    // In a real app, this data would come from global state (Redux/Context) or be passed via location state
    // For demo purposes, we'll mock the extraction data and hit the real backend endpoints
    
    const runPipeline = async () => {
      try {
        // 1. Verify
        const vRes = await axios.post('http://localhost:8000/api/verify', {
          claims: [
            "Developed a full-stack React application with FastAPI backend",
            "Certified in AWS Cloud Practitioner",
            "Built a machine learning model for sentiment analysis"
          ],
          skills: ["React", "FastAPI", "Python", "AWS", "SQL"],
          github_repos: [
            { name: "react-fastapi-demo", description: "A full-stack React application with FastAPI backend", language: "JavaScript" },
            { name: "ml-sentiment", description: "Sentiment analysis using python", language: "Python" }
          ],
          certificate_text: "AWS Certified Cloud Practitioner"
        });
        
        setVerifyData(vRes.data);

        // 2. Align
        const verifiedSkills = vRes.data.skills_verification
                                .filter(s => s.status === 'Verified')
                                .map(s => s.skill);

        const aRes = await axios.post('http://localhost:8000/api/align', {
          verified_skills: verifiedSkills.length > 0 ? verifiedSkills : ["React", "FastAPI"],
          job_description: "We are looking for a software engineer experienced in React, FastAPI, Python, Docker, and AWS."
        });

        setAlignData(aRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    runPipeline();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-3xl font-extrabold flex items-center gap-3">
              <ShieldCheck className="text-rose-500" size={32} />
              Candidate Report
            </h1>
            <p className="text-slate-500 mt-1">Verification and Job Alignment Summary</p>
          </div>
          <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-full font-semibold transition-colors">
            <Download size={18} /> Export PDF
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Main Scoring Cards */}
          <div className="md:col-span-1 space-y-8">
            {/* Alignment Score */}
            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <h2 className="text-lg font-bold text-slate-600 uppercase tracking-wider mb-2">Job Alignment</h2>
              <div className="text-6xl font-extrabold text-slate-900 my-4">
                {alignData?.alignment_score || 0}<span className="text-3xl text-slate-400">%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 mb-2">
                <div 
                  className="bg-gradient-to-r from-rose-400 to-amber-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${alignData?.alignment_score || 0}%` }}
                ></div>
              </div>
              <p className="text-sm text-slate-500 font-medium">Match against Job Description</p>
            </div>

            {/* Verification Stats */}
            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl border border-slate-800">
              <h2 className="text-lg font-bold text-slate-300 uppercase tracking-wider mb-6">Evidence Confidence</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
                  <span className="flex items-center gap-2"><CheckCircle className="text-amber-400" size={18} /> Verified</span>
                  <span className="font-bold text-lg">
                    {verifyData?.claims_verification?.filter(c => c.status === 'Verified').length || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
                  <span className="flex items-center gap-2"><AlertTriangle className="text-amber-400" size={18} /> Partial</span>
                  <span className="font-bold text-lg">
                    {verifyData?.claims_verification?.filter(c => c.status === 'Partially Verified').length || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2"><XCircle className="text-red-400" size={18} /> Unverified</span>
                  <span className="font-bold text-lg">
                    {verifyData?.claims_verification?.filter(c => c.status === 'Unverified').length || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="md:col-span-2 space-y-8">
            
            {/* Claims Verification Table */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Award className="text-rose-500" /> Claims Breakdown
              </h2>
              <div className="space-y-4">
                {verifyData?.claims_verification?.map((claim, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-sm text-slate-700 font-medium">{claim.claim}</p>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="w-24 bg-slate-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${claim.confidence_score > 70 ? 'bg-amber-500' : claim.confidence_score > 30 ? 'bg-amber-400' : 'bg-red-400'}`}
                          style={{ width: `${claim.confidence_score}%` }}
                        ></div>
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full 
                        ${claim.status === 'Verified' ? 'bg-amber-100 text-amber-700' : 
                          claim.status === 'Partially Verified' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}
                      >
                        {claim.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Alignment */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle className="text-amber-500" /> Verified Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {alignData?.matched_skills?.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg text-sm font-semibold">
                      {skill}
                    </span>
                  ))}
                  {(!alignData?.matched_skills || alignData.matched_skills.length === 0) && (
                    <p className="text-sm text-slate-500">No matching skills found.</p>
                  )}
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="text-amber-500" /> Skill Gaps
                </h2>
                <div className="flex flex-wrap gap-2">
                  {alignData?.skill_gaps?.map((gap, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-slate-100 text-slate-600 border border-slate-200 rounded-lg text-sm font-semibold">
                      {gap}
                    </span>
                  ))}
                  {(!alignData?.skill_gaps || alignData.skill_gaps.length === 0) && (
                    <p className="text-sm text-slate-500">No significant gaps detected.</p>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
