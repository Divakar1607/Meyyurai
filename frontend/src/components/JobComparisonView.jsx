import React from 'react';
import { Briefcase, CheckCircle, TrendingUp, Award } from 'lucide-react';

export default function JobComparisonView({ alignments = [] }) {
  if (!alignments || alignments.length < 2) return null;

  // Find the highest score
  const highestScore = Math.max(...alignments.map(a => a.data.alignment_score || 0));

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mt-8">
      <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800 mb-6">
        <Briefcase className="text-blue-500" /> Multiple Job Comparison
      </h2>
      <p className="text-slate-500 text-sm mb-6">
        Compare how your verified resume stacks up against multiple target job descriptions.
      </p>

      <div className="overflow-x-auto pb-4">
        <div className="flex gap-6 min-w-max">
          {alignments.map((alignment, idx) => {
            const score = alignment.data.alignment_score || 0;
            const isBestMatch = score === highestScore && score > 0;
            
            return (
              <div 
                key={idx} 
                className={`w-80 shrink-0 p-6 rounded-3xl border-2 flex flex-col ${isBestMatch ? 'bg-amber-50/30 border-amber-400 shadow-xl shadow-amber-500/10' : 'bg-slate-50 border-slate-100 shadow-sm'}`}
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-slate-800 text-lg line-clamp-2">{alignment.title}</h3>
                  {isBestMatch && (
                    <span className="bg-amber-400 text-amber-900 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full shrink-0 flex items-center gap-1 shadow-sm">
                      <Award size={12} /> Best Match
                    </span>
                  )}
                </div>

                {/* Score */}
                <div className="mb-6 flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <div className={`text-5xl font-black ${score >= 80 ? 'text-emerald-500' : score >= 50 ? 'text-amber-500' : 'text-rose-500'}`}>
                    {score}<span className="text-2xl text-slate-300">%</span>
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Alignment</span>
                </div>

                {/* Skills */}
                <div className="flex-1 space-y-5">
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5 mb-2">
                      <CheckCircle size={14} className="text-emerald-500" /> Top Matches
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {alignment.data.matched_skills && alignment.data.matched_skills.length > 0 ? (
                        alignment.data.matched_skills.slice(0, 5).map((skill, i) => (
                          <span key={i} className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md text-xs font-semibold border border-emerald-100">
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-slate-400 italic">None detected</span>
                      )}
                      {alignment.data.matched_skills && alignment.data.matched_skills.length > 5 && (
                        <span className="text-xs text-slate-400 py-1 font-medium">+{alignment.data.matched_skills.length - 5} more</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5 mb-2">
                      <TrendingUp size={14} className="text-rose-500" /> Key Gaps
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {alignment.data.skill_gaps && alignment.data.skill_gaps.length > 0 ? (
                        alignment.data.skill_gaps.slice(0, 5).map((skill, i) => (
                          <span key={i} className="px-2.5 py-1 bg-slate-200 text-slate-700 rounded-md text-xs font-semibold">
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-slate-400 italic">No major gaps</span>
                      )}
                      {alignment.data.skill_gaps && alignment.data.skill_gaps.length > 5 && (
                        <span className="text-xs text-slate-400 py-1 font-medium">+{alignment.data.skill_gaps.length - 5} more</span>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
