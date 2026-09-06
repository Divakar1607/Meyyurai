import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function VideoPlayer({ src, poster }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleProgressClick = (e) => {
    if (videoRef.current) {
      const bounds = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const percentage = x / bounds.width;
      videoRef.current.currentTime = percentage * videoRef.current.duration;
    }
  };

  return (
    <div className="relative group rounded-2xl overflow-hidden shadow-2xl border-4 border-rose-500/20 bg-slate-900">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-auto aspect-video object-cover"
        onTimeUpdate={handleTimeUpdate}
        autoPlay
        muted={isMuted}
        loop
      />
      
      {/* Controls Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex flex-col gap-2">
          {/* Progress Bar */}
          <div 
            className="h-1.5 w-full bg-slate-600/50 rounded-full cursor-pointer overflow-hidden"
            onClick={handleProgressClick}
          >
            <div 
              className="h-full bg-rose-400"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Buttons */}
          <div className="flex items-center justify-between text-white">
            <button onClick={togglePlay} className="p-2 hover:bg-white/20 rounded-full transition-colors">
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button onClick={toggleMute} className="p-2 hover:bg-white/20 rounded-full transition-colors">
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
