
import React, { useState, useEffect } from 'react';

interface SandboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  demoUrl?: string;
}

const SandboxModal: React.FC<SandboxModalProps> = ({ isOpen, onClose, projectTitle, demoUrl }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-md p-2 md:p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-6xl h-[85vh] matte-glass rounded-[2rem] overflow-hidden flex flex-col border border-white/20 shadow-[0_0_100px_rgba(168,85,247,0.2)]">
        {/* Top bar */}
        <div className="px-6 py-3 border-b border-white/10 flex justify-between items-center bg-slate-900/60">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
            </div>
            <span className="text-[10px] md:text-xs font-bold text-slate-400 tracking-tight uppercase">
              AryzenOS / {projectTitle}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-slate-950 relative overflow-hidden">
          {isLoading ? (
            <div className="absolute inset-0 z-20 bg-slate-950 flex flex-col items-center justify-center space-y-6 p-12 text-center">
              <div className="w-16 h-16 border-4 border-purple-500/10 border-t-purple-500 rounded-full animate-spin"></div>
              <div className="space-y-2">
                <h2 className="text-xl font-black font-sync text-gradient uppercase tracking-widest">Compiling Assets...</h2>
                <p className="text-[10px] md:text-xs text-slate-500 max-w-xs mx-auto">Initializing virtualization environment for {projectTitle}. Linking libraries and establishing high-speed sync.</p>
              </div>
            </div>
          ) : demoUrl ? (
            <iframe 
              src={demoUrl} 
              className="w-full h-full border-none"
              title={projectTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-6">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black font-sync uppercase">Source Private</h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto">The live demo for {projectTitle} is currently undergoing a security audit. Check back shortly or view the source code on GitHub.</p>
              </div>
              <button 
                onClick={onClose}
                className="px-8 py-3 bg-white text-black font-black uppercase text-xs rounded-xl tracking-widest"
              >
                Return to Port
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SandboxModal;
