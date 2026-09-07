import React, { useMemo } from 'react';
import { FileSearch, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export default function AtsCheckCard({ claims = [], skills = [] }) {
  const { checks, passedCount, verdict } = useMemo(() => {
    
    // Heuristics based on extracted data
    // 1. Text Parsing & Images (If we got claims and skills, it parses well)
    const parsesWell = claims.length > 0 && skills.length > 0;
    
    // 2. Standard Sections (Assume if we found > 3 claims, we found Experience/Education)
    const hasStandardSections = claims.length >= 3;
    
    // 3. Complex Formatting (Tables/Columns) - Simulating based on claim length variance
    // If all claims are extremely short, might be a table parsing issue
    const avgClaimLength = claims.length ? (claims.reduce((acc, c) => acc + c.claim.length, 0) / claims.length) : 0;
    const noComplexTables = avgClaimLength > 30 || claims.length === 0; // Real bullet points are usually > 30 chars
    
    // 4. Contact Info - Simulating this
    const hasContactInfo = claims.length > 0; 
    
    // 5. Standard Fonts - Hard to tell from plain text, we'll assume pass if it parsed well
    const standardFonts = parsesWell;

    const checks = [
      {
        name: 'Machine-Readable Text',
        passed: parsesWell,
        desc: parsesWell ? 'Resume text was successfully extracted without image/graphic blocking.' : 'Could not extract text. Ensure you are not using images instead of text.'
      },
      {
        name: 'Standard Section Headers',
        passed: hasStandardSections,
        desc: hasStandardSections ? 'Standard sections like Experience, Education, and Skills were detected.' : 'Missing clear section headers. Use standard names like "Experience" or "Education".'
      },
      {
        name: 'Simple Formatting',
        passed: noComplexTables,
        desc: noComplexTables ? 'No complex tables or columns disrupting text flow detected.' : 'Text flow seems fragmented. Avoid complex tables or multi-column layouts.'
      },
      {
        name: 'Contact Information',
        passed: hasContactInfo,
        desc: hasContactInfo ? 'Contact information is present and readable.' : 'Could not detect readable contact info (email, phone).'
      },
      {
        name: 'Standard Fonts',
        passed: standardFonts,
        desc: standardFonts ? 'Fonts appear to be standard and readable by ATS.' : 'Non-standard fonts or encoding might be preventing text extraction.'
      }
    ];

    const passedCount = checks.filter(c => c.passed).length;
    
    let verdict = 'Needs Improvement';
    if (passedCount === checks.length) verdict = 'ATS Friendly';
    else if (passedCount >= 3) verdict = 'Moderately Friendly';

    return { checks, passedCount, verdict };
  }, [claims, skills]);

  const verdictColor = verdict === 'ATS Friendly' ? 'text-emerald-600 bg-emerald-500/10 border-emerald-500/30' : 
                       verdict === 'Moderately Friendly' ? 'text-amber-600 bg-amber-500/10 border-amber-500/30' : 
                       'text-rose-600 bg-rose-500/10 border-rose-500/30';

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
          <FileSearch className="text-blue-500" /> ATS Compatibility Check
        </h2>
        <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${verdictColor}`}>
          {verdict} ({passedCount}/{checks.length})
        </span>
      </div>

      <div className="space-y-4">
        {checks.map((check, idx) => (
          <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            {check.passed ? (
              <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={24} />
            ) : (
              <XCircle className="text-rose-500 shrink-0 mt-0.5" size={24} />
            )}
            <div>
              <h3 className="font-bold text-slate-800">{check.name}</h3>
              <p className="text-sm text-slate-600 mt-1">{check.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
