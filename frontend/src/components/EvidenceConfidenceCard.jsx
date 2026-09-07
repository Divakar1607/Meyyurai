import React, { useMemo, useState } from 'react';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

export default function EvidenceConfidenceCard({ claims = [], onFilterChange }) {
  const [activeFilter, setActiveFilter] = useState(null);

  const stats = useMemo(() => {
    let verified = 0;
    let partial = 0;
    let unverified = 0;

    claims.forEach(claim => {
      const score = claim.confidence_score || 0;
      if (score >= 80) verified++;
      else if (score >= 40) partial++;
      else unverified++;
    });

    return { verified, partial, unverified };
  }, [claims]);

  const handleRowClick = (category) => {
    const newFilter = activeFilter === category ? null : category;
    setActiveFilter(newFilter);
    if (onFilterChange) onFilterChange(newFilter);
  };

  return (
    <div className="bg-[#0B2E33] text-white p-6 rounded-2xl shadow-xl border border-[#164b52]">
      <h2 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4">Evidence Confidence</h2>
      <div className="space-y-0">
        
        {/* Verified Row */}
        <div 
          onClick={() => handleRowClick('verified')}
          className={`flex justify-between items-center py-3 cursor-pointer transition-colors border-b border-[#164b52] hover:bg-[#164b52]/50 px-3 -mx-3 rounded-lg ${activeFilter === 'verified' ? 'bg-[#164b52]' : ''}`}
        >
          <span className="flex items-center gap-3 text-slate-200">
            <CheckCircle className="text-emerald-400" size={20} /> Verified
          </span>
          <span className="font-extrabold text-2xl text-emerald-400">{stats.verified}</span>
        </div>

        {/* Partial Row */}
        <div 
          onClick={() => handleRowClick('partial')}
          className={`flex justify-between items-center py-3 cursor-pointer transition-colors border-b border-[#164b52] hover:bg-[#164b52]/50 px-3 -mx-3 rounded-lg ${activeFilter === 'partial' ? 'bg-[#164b52]' : ''}`}
        >
          <span className="flex items-center gap-3 text-slate-200">
            <AlertTriangle className="text-amber-400" size={20} /> Partial
          </span>
          <span className="font-extrabold text-2xl text-amber-400">{stats.partial}</span>
        </div>

        {/* Unverified Row */}
        <div 
          onClick={() => handleRowClick('unverified')}
          className={`flex justify-between items-center py-3 cursor-pointer transition-colors hover:bg-[#164b52]/50 px-3 -mx-3 rounded-lg ${activeFilter === 'unverified' ? 'bg-[#164b52]' : ''}`}
        >
          <span className="flex items-center gap-3 text-slate-200">
            <XCircle className="text-rose-400" size={20} /> Unverified
          </span>
          <span className="font-extrabold text-2xl text-rose-400">{stats.unverified}</span>
        </div>

      </div>
    </div>
  );
}
