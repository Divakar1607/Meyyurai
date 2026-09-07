import React, { useState, useMemo } from 'react';
import { MessageCircle, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';

export default function MockInterviewQuestions({ claims = [], skills = [] }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const questions = useMemo(() => {
    let generated = [];
    
    // 1. Generate from Claims (up to 3)
    const verifiedClaims = claims.filter(c => c.confidence_score >= 40).map(c => c.claim);
    
    if (verifiedClaims.length > 0) {
      generated.push({
        q: `Can you walk me through your approach when you ${verifiedClaims[0].toLowerCase().replace(/^i /i, '')}?`,
        tip: 'Focus on the "STAR" method: Situation, Task, Action, and Result. Highlight your specific contributions and any technical challenges you overcame.'
      });
    }
    if (verifiedClaims.length > 1) {
      generated.push({
        q: `What was the most challenging technical hurdle you faced when you ${verifiedClaims[1].toLowerCase()}?`,
        tip: 'Interviewers want to see problem-solving skills. Describe the problem clearly, the steps you took to debug or design a solution, and what you learned from the experience.'
      });
    }
    if (verifiedClaims.length > 2) {
      generated.push({
        q: `If you had to start over on the project where you ${verifiedClaims[2].toLowerCase()}, what would you do differently?`,
        tip: 'Show self-awareness and continuous learning. Discuss an architectural choice, a technology you would switch to, or a process improvement.'
      });
    }

    // 2. Generate from Skills (up to 2)
    const topSkills = skills.slice(0, 2);
    if (topSkills.length > 0) {
      generated.push({
        q: `How do you stay updated with the latest trends and best practices in ${topSkills[0]}?`,
        tip: 'Mention specific blogs, newsletters, communities, or recent features of the technology to show genuine interest and proactivity.'
      });
    }
    if (topSkills.length > 1) {
      generated.push({
        q: `Describe a scenario where using ${topSkills[1]} was the wrong choice. How would you identify its limitations?`,
        tip: 'Demonstrate deep understanding, not just surface-level knowledge. Discuss performance bottlenecks, scalability issues, or ecosystem constraints of the technology.'
      });
    }

    // 3. Fallback Behavioral Questions to ensure we always have 5
    const fallbacks = [
      {
        q: 'Can you describe a time when you had to learn a new technology completely from scratch?',
        tip: 'Highlight your learning process, resources you used, and how quickly you were able to apply it to a real-world problem.'
      },
      {
        q: 'How do you handle disagreements with a team member regarding a technical decision?',
        tip: 'Focus on communication, empathy, and data-driven decision making rather than personal opinions.'
      },
      {
        q: 'What is a project you are most proud of and why?',
        tip: 'Connect your pride to the impact of the project, the complexity of the problem, or the personal growth you achieved.'
      }
    ];

    while (generated.length < 5 && fallbacks.length > 0) {
      generated.push(fallbacks.shift());
    }

    return generated.slice(0, 5);
  }, [claims, skills]);

  if (questions.length === 0) return null;

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mt-8">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800">
        <MessageCircle className="text-purple-500" /> Mock Interview Questions
      </h2>
      <p className="text-slate-500 text-sm mb-6">
        Based on your verified skills and claims, recruiters are likely to ask you these questions. Click to reveal tips on how to answer them.
      </p>

      <div className="space-y-3">
        {questions.map((item, idx) => {
          const isExpanded = expandedIndex === idx;
          return (
            <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300">
              <button
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                className="w-full text-left p-5 bg-slate-50 hover:bg-slate-100 flex justify-between items-center transition-colors focus:outline-none"
              >
                <span className="font-bold text-slate-700 pr-4">{idx + 1}. {item.q}</span>
                {isExpanded ? <ChevronUp className="text-slate-400 shrink-0" /> : <ChevronDown className="text-slate-400 shrink-0" />}
              </button>
              
              {isExpanded && (
                <div className="p-5 bg-white border-t border-slate-100 flex items-start gap-3">
                  <Lightbulb className="text-amber-500 shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 mb-1">Suggested Approach</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.tip}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
