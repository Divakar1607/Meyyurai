import React, { useMemo } from 'react';
import { Target, Lightbulb, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';

export default function ResumeScoreCard({ claims = [], githubData, certData }) {
  const { score, tips } = useMemo(() => {
    let currentScore = 30; // Base score
    let generatedTips = [];
    
    // 1. Github
    if (githubData && (githubData.public_repos !== undefined || githubData.recent_repositories?.length > 0)) {
      currentScore += 20;
    } else {
      generatedTips.push({
        type: 'missing',
        text: 'Add a link to your GitHub profile or portfolio to provide tangible evidence of your work.'
      });
    }

    // 2. Verified Claims Ratio
    if (claims && claims.length > 0) {
      const verifiedCount = claims.filter(c => c.confidence_score >= 80).length;
      const ratio = verifiedCount / claims.length;
      
      currentScore += Math.floor(ratio * 30); // Up to 30 points for high verification
      
      if (ratio < 0.5) {
        generatedTips.push({
          type: 'warning',
          text: 'Many of your claims could not be fully verified. Try uploading relevant certificates or linking public repositories.'
        });
      }
    } else {
      generatedTips.push({
        type: 'missing',
        text: 'We couldn\'t find specific project or experience claims to verify in your resume.'
      });
    }

    // 3. Quantifiable Achievements (Metrics/Numbers)
    let hasMetrics = false;
    
    if (claims && claims.length > 0) {
      hasMetrics = claims.some(c => /\d+%?/.test(c.claim));
      
      // Look for claims that start with weak words (e.g. "Responsible for", "Helped with")
      const weakVerbs = ['responsible for', 'helped', 'worked on', 'assisted', 'involved in'];
      const hasWeakVerbs = claims.some(c => {
        const lowerClaim = c.claim.toLowerCase();
        return weakVerbs.some(wv => lowerClaim.startsWith(wv));
      });
      
      if (hasMetrics) {
        currentScore += 10;
      } else {
        generatedTips.push({
          type: 'improvement',
          text: 'Include measurable outcomes (e.g., "improved performance by 20%", "led a team of 5") in your project descriptions.'
        });
      }

      if (!hasWeakVerbs) {
        currentScore += 10;
      } else {
        generatedTips.push({
          type: 'improvement',
          text: 'Start bullet points with strong action verbs (e.g., "Developed", "Optimized") rather than weak phrases like "Responsible for" or "Helped with".'
        });
      }
    }

    // Cap score at 100
    currentScore = Math.min(100, Math.max(0, currentScore));

    // If perfectly scored, add a generic good tip
    if (generatedTips.length === 0) {
      generatedTips.push({
        type: 'success',
        text: 'Your resume is very strong! Keep it updated with your latest achievements and metrics.'
      });
    }

    return { score: currentScore, tips: generatedTips };
  }, [claims, githubData, certData]);

  const getScoreColor = (s) => {
    if (s >= 80) return 'text-emerald-500';
    if (s >= 50) return 'text-amber-500';
    return 'text-rose-500';
  };

  const scoreColor = getScoreColor(score);

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 h-full flex flex-col">
      <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2 mb-6">
        <Target className="text-rose-500" /> Resume Strength
      </h2>
      
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start flex-1">
        
        {/* Score Circular Gauge */}
        <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
            <path
              className="text-slate-100"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className={`${scoreColor} transition-all duration-1000 ease-out`}
              strokeDasharray={`${score}, 100`}
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-black text-slate-800">{score}</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Score</span>
          </div>
        </div>

        {/* Tips Section */}
        <div className="flex-1 space-y-4">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Lightbulb size={16} /> Actionable Tips
          </h3>
          <ul className="space-y-3">
            {tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                {tip.type === 'success' ? (
                  <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={18} />
                ) : tip.type === 'warning' ? (
                  <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={18} />
                ) : (
                  <TrendingUp className="text-rose-500 shrink-0 mt-0.5" size={18} />
                )}
                <span className="text-sm font-medium text-slate-700 leading-snug">{tip.text}</span>
              </li>
            ))}
          </ul>
        </div>
        
      </div>
    </div>
  );
}
