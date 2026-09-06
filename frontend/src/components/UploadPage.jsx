import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function UploadPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    const supportedExtensions = ['.pdf', '.docx', '.txt', '.png', '.jpg', '.jpeg', '.doc'];
    if (droppedFile && supportedExtensions.some(ext => droppedFile.name.toLowerCase().endsWith(ext))) {
      setFile(droppedFile);
    } else {
      setError('Please upload a supported file format (PDF, DOCX, TXT, Image).');
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleSubmit = async () => {
    if (!file) {
      setError('Please upload a resume first.');
      return;
    }
    
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);
    if (jobDescription) {
      formData.append('job_description', jobDescription);
    }

    try {
      // Assuming backend runs on localhost:8000
      const response = await axios.post('http://localhost:8000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(response.data);
    } catch (err) {
      console.error(err);
      const backendError = err.response?.data?.detail;
      setError(backendError ? (typeof backendError === 'string' ? backendError : JSON.stringify(backendError)) : 'Failed to process resume. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight">Upload & Parse</h1>
          <p className="text-slate-500 text-lg">Upload a candidate's resume and target job description to begin verification.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
          <div className="p-8 space-y-8">
            
            {/* File Upload Zone */}
            <div 
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${isDragging ? 'border-rose-500 bg-rose-50/50' : 'border-slate-200 hover:border-rose-400 hover:bg-slate-50'}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept=".pdf,.docx,.doc,.txt,.png,.jpg,.jpeg,application/pdf"
                onChange={handleFileChange}
              />
              <div className="flex flex-col items-center justify-center gap-4 cursor-pointer">
                <div className={`p-4 rounded-full ${file ? 'bg-amber-100 text-amber-600' : 'bg-rose-50 text-rose-600'}`}>
                  {file ? <FileText size={32} /> : <UploadCloud size={32} />}
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-700">
                    {file ? file.name : "Drag & Drop your resume here"}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "Supports PDF, DOCX, TXT, Images up to 5MB"}
                  </p>
                </div>
                {!file && (
                  <span className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-sm font-medium transition-colors">
                    Browse Files
                  </span>
                )}
              </div>
            </div>

            {/* Job Description Textarea */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700">
                Target Job Description (Optional)
              </label>
              <textarea 
                rows={4}
                className="w-full rounded-2xl border-slate-200 shadow-sm focus:border-rose-500 focus:ring-rose-500 resize-none p-4 text-slate-700 bg-slate-50"
                placeholder="Paste the job description here to enable alignment scoring..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl">
                <AlertCircle size={20} />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!file || loading}
              className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2
                ${(!file || loading) ? 'bg-slate-300 cursor-not-allowed shadow-none' : 'bg-rose-600 hover:bg-rose-700 shadow-rose-500/30'}`}
            >
              {loading ? (
                <><Loader2 className="animate-spin" size={20} /> Processing...</>
              ) : (
                <><CheckCircle size={20} /> Extract & Verify Claims</>
              )}
            </button>

          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100 space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-2xl font-bold border-b border-slate-100 pb-4">Extracted Claims</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Skills Identified</h3>
                <div className="flex flex-wrap gap-2">
                  {result.skills && result.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-amber-50 text-amber-700 rounded-lg text-sm font-medium border border-amber-200">
                      {skill}
                    </span>
                  ))}
                  {(!result.skills || result.skills.length === 0) && <span className="text-slate-500 text-sm">No skills detected.</span>}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Potential Claims (Projects / Certs)</h3>
                <ul className="space-y-2">
                  {result.claims && result.claims.map((claim, i) => (
                    <li key={i} className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <CheckCircle className="text-rose-500 shrink-0 mt-0.5" size={18} />
                      <span className="text-slate-700 text-sm">{claim}</span>
                    </li>
                  ))}
                  {(!result.claims || result.claims.length === 0) && <span className="text-slate-500 text-sm">No specific claims detected.</span>}
                </ul>
              </div>
            </div>
            
            <div className="pt-6 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => navigate('/evidence')}
                className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-slate-900/20 flex items-center gap-2"
              >
                Proceed to Evidence Collection <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
