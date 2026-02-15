
import React, { useRef } from 'react';

interface NavbarProps {
  onNavClick: (index: number) => void;
  activeSection: number;
  totalSections: number;
}

const Navbar: React.FC<NavbarProps> = ({ onNavClick, activeSection, totalSections }) => {
  const sections = ['Home', 'About', 'Journey', 'Projects', 'Contact'];
  const videoRef = useRef<HTMLVideoElement>(null);

  const getActualIndex = (idx: number) => {
    if (idx === 4) return totalSections - 1;
    return idx;
  };

  const handleMouseEnter = (label: string) => {
    if (label === 'Home' && videoRef.current) {
      videoRef.current.play().catch(() => { });
    }
  };

  const handleMouseLeave = (label: string) => {
    if (label === 'Home' && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <nav className="fixed top-2 md:top-4 lg:top-4 left-0 w-full z-[100] px-2 md:px-6 flex justify-center pointer-events-none">
      <div className="matte-glass p-1 md:p-1.5 rounded-2xl md:rounded-[1.5rem] flex items-center shadow-2xl border-white/10 pointer-events-auto max-w-[95vw] overflow-x-auto no-scrollbar relative">

        {/* Hidden Video Preview triggered by Home Hover */}
        <div className="absolute inset-0 -z-20 overflow-hidden rounded-[1.5rem] pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-20">
          <video
            ref={videoRef}
            src="Bhedaghat.mp4" // <-- PASTE YOUR HOVER VIDEO LOCATION HERE
            className="w-full h-full object-cover blur-sm"
            muted
            loop
            playsInline
          />
        </div>

        <div className="px-3 md:px-5 py-2 border-r border-white/10 flex-shrink-0">
          <span className="font-sync font-bold text-[10px] md:text-xs tracking-[0.2em] text-gradient aryzen-logo uppercase">
            {['A', 'R', 'Y', 'Z', 'E', 'N'].map((l, i) => <span key={i}>{l}</span>)}
          </span>
        </div>
        <div className="flex items-center space-x-0.5 md:space-x-1 px-1 md:px-3">
          {sections.map((label, idx) => {
            const actualIdx = getActualIndex(idx);
            const isActive = activeSection === actualIdx || (idx === 3 && activeSection >= 3 && activeSection < totalSections - 1);

            return (
              <button
                key={label}
                onClick={() => onNavClick(actualIdx)}
                onMouseEnter={() => handleMouseEnter(label)}
                onMouseLeave={() => handleMouseLeave(label)}
                className={`px-3 md:px-4 py-2 rounded-xl text-[9px] md:text-[11px] lg:text-xs font-bold tracking-wider uppercase transition-all duration-300 relative group flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                  }`}
              >
                {label}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse"></span>
                )}
                <span className="absolute inset-0 bg-white/5 scale-0 group-hover:scale-100 rounded-xl transition-transform duration-300 -z-10"></span>

                {/* Visual feedback specifically for Home button video trigger */}
                {label === 'Home' && (
                  <span className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl -z-20 blur-md"></span>
                )}
              </button>
            );
          })}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
