import React from 'react';
import { BookOpen, ExternalLink, Map, ArrowRight } from 'lucide-react';

const RESOURCE_MAP = {
  'react': { name: 'React Docs', url: 'https://react.dev/learn', reason: 'Core frontend library for modern UI development.' },
  'fastapi': { name: 'FastAPI Tutorial', url: 'https://fastapi.tiangolo.com/tutorial/', reason: 'High-performance Python backend framework.' },
  'python': { name: 'Python Official Docs', url: 'https://docs.python.org/3/tutorial/index.html', reason: 'Primary language for backend and data engineering.' },
  'docker': { name: 'Docker 101', url: 'https://www.docker.com/101-tutorial/', reason: 'Essential for containerized deployment and scaling.' },
  'aws': { name: 'AWS Skill Builder', url: 'https://explore.skillbuilder.aws/', reason: 'Cloud infrastructure and hosting platform.' },
  'sql': { name: 'SQLBolt', url: 'https://sqlbolt.com/', reason: 'Standard language for relational database management.' },
  'git': { name: 'Pro Git Book', url: 'https://git-scm.com/book/en/v2', reason: 'Industry standard for version control.' },
  'node': { name: 'Node.js Docs', url: 'https://nodejs.org/en/learn', reason: 'JavaScript runtime for backend services.' },
  'javascript': { name: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide', reason: 'Foundational language for web development.' },
  'typescript': { name: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html', reason: 'Adds static typing to JavaScript for safer code.' }
};

export default function SkillGapRoadmap({ skillGaps = [] }) {
  if (!skillGaps || skillGaps.length === 0) {
    return (
      <div className="bg-[#0B2E33] text-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-[#164b52]">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-emerald-400">
          <Map className="text-emerald-400" size={24} /> Skill Gap & Roadmap
        </h2>
        <p className="text-emerald-300 font-medium bg-emerald-900/40 p-4 rounded-xl border border-emerald-800/50">
          Great job! You have all the key skills identified in the job description. No significant skill gaps detected.
        </p>
      </div>
    );
  }

  const getResource = (skill) => {
    const key = skill.toLowerCase();
    // Try to find a direct match or a partial match (e.g. "React.js" -> "react")
    for (const [mappedKey, data] of Object.entries(RESOURCE_MAP)) {
      if (key.includes(mappedKey)) {
        return data;
      }
    }
    // Fallback resource
    return {
      name: `Learn ${skill}`,
      url: `https://www.google.com/search?q=free+tutorial+for+${encodeURIComponent(skill)}`,
      reason: 'Required for this role based on the job description requirements.'
    };
  };

  return (
    <div className="bg-[#0B2E33] text-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-[#164b52]">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-emerald-400">
        <Map className="text-emerald-400" size={24} /> Skill Gap & Roadmap
      </h2>
      <p className="text-slate-300 text-sm mb-6">
        Based on the job description, we identified some required skills that were missing from your verified profile. Here are curated resources to help you level up:
      </p>

      <div className="space-y-4">
        {skillGaps.map((skill, idx) => {
          const resource = getResource(skill);
          
          return (
            <div key={idx} className="bg-[#164b52] rounded-2xl p-5 border border-[#1c6068] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
                    Missing Skill
                  </span>
                  <h3 className="text-lg font-bold text-white">{skill}</h3>
                </div>
                <p className="text-slate-400 text-sm">{resource.reason}</p>
              </div>
              
              <a 
                href={resource.url} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-[#0B2E33] px-5 py-2.5 rounded-xl font-bold transition-colors shrink-0 group"
              >
                <BookOpen size={18} /> {resource.name} 
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
