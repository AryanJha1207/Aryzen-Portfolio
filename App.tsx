
import React, { useState, useRef, useMemo } from 'react';
import Navbar from './components/Navbar';
import Slideshow from './components/Slideshow';
import GalleryModal from './components/GalleryModal';
import SandboxModal from './components/SandboxModal';
import { PROJECTS } from './constants';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [sandboxProject, setSandboxProject] = useState<{ title: string, url?: string } | null>(null);
  const [slideshowFilter, setSlideshowFilter] = useState<'All' | 'College' | 'Hometown'>('All');
  const containerRef = useRef<HTMLDivElement>(null);

  const totalSectionsCount = useMemo(() => 3 + PROJECTS.length + 1, []);

  const handleNavClick = (index: number) => {
    const sections = containerRef.current?.querySelectorAll('.snap-section');
    if (sections && sections[index]) {
      sections[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollPos = containerRef.current.scrollTop;
      const height = containerRef.current.clientHeight;
      const index = Math.round(scrollPos / height);
      setActiveSection(index);
    }
  };

  return (
    <div className="relative w-full h-screen bg-slate-950 overflow-hidden">
      {/* GLOBAL BACKGROUND GLOWS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="glow-red absolute top-[-10%] left-[-10%] w-[80%] h-[80%] blur-[140px] rounded-full opacity-20"></div>
        <div className="glow-purple absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] blur-[140px] rounded-full opacity-20"></div>
      </div>

      <Navbar onNavClick={handleNavClick} activeSection={activeSection} totalSections={totalSectionsCount} />

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="snap-container relative z-10 no-scrollbar"
      >
        {/* HERO SECTION - REFACTORED FOR TRUE LAYERING */}
        <section className="snap-section">
          <div className="w-full h-full matte-glass rounded-[2rem] md:rounded-[3rem] overflow-hidden relative">

            {/* LAYER 0: UNIFIED BACKGROUND GLOW (Behind everything) */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
              <div className="absolute bottom-0 left-1/2 md:left-[20%] -translate-x-1/2 md:translate-x-0 w-[150%] h-[120%] bg-gradient-to-t from-red-600/30 via-purple-500/5 to-transparent rounded-full blur-[100px] opacity-60"></div>
            </div>

            {/* LAYER 1: IMAGE (Middle Layer - sits behind text) */}
            <div className="absolute inset-0 z-10 flex items-end justify-center md:justify-start px-0 md:pl-10 lg:pl-20 overflow-hidden pointer-events-none">
              <img
                src="/Media/Profile.png"
                alt="Aryan Profile"
                className="w-auto h-[50vh] sm:h-[55vh] md:h-[65vh] lg:h-[80vh] max-w-none object-contain object-bottom transition-all duration-1000 transform translate-y-0 scale-100"
                style={{ filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.8))' }}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('Media/Profile.png')) {
                    target.src = '/Media/Profile.png';
                  }
                }}
              />
            </div>

            {/* LAYER 2: TEXT CONTENT (Top Layer - sits above image) */}
            <div className="relative z-20 w-full h-full flex flex-col md:flex-row items-center md:items-center justify-start md:justify-end p-6 pt-16 md:pt-0 pb-[50vh] md:pb-0 md:pr-10 lg:pr-16 bg-transparent pointer-events-none">
              <div className="max-w-xl lg:max-w-2xl xl:max-w-3xl text-center md:text-right space-y-2 md:space-y-6 lg:space-y-10 pointer-events-auto md:ml-auto md:w-[60%]">
                <div className="flex flex-col items-center md:items-end">
                  <span className="inline-block px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-[8px] md:text-xs font-black tracking-widest uppercase mb-2 md:mb-4 border border-red-500/20">
                    Engineering the Future
                  </span>
                  <h1 className="hero-title font-black tracking-tighter leading-[1.1] md:leading-[1.05] font-sync mb-2 md:mb-4 uppercase text-white">
                    ARYAN<br />
                    <span className="text-gradient">DESIGNER.</span>
                  </h1>
                  <p className="text-[10px] sm:text-[11px] md:text-lg lg:text-xl text-slate-400 font-medium leading-relaxed opacity-80 px-4 md:px-0 max-w-xs md:max-w-none">
                    Visionary Software Architect crafting high-performance digital ecosystems and fluid interactive experiences.
                  </p>
                </div>

                <div className="flex flex-wrap justify-center md:justify-end gap-2 md:gap-5">
                  <button
                    onClick={() => handleNavClick(3)}
                    className="px-6 md:px-10 py-3.5 md:py-5 bg-white text-slate-950 rounded-2xl font-black uppercase text-[9px] md:text-xs tracking-widest hover:bg-red-500 hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl active:scale-95"
                  >
                    Work Samples
                  </button>
                  <button
                    onClick={() => handleNavClick(totalSectionsCount - 1)}
                    className="flex items-center space-x-2 px-6 md:px-10 py-3.5 md:py-5 border border-white/10 text-white rounded-2xl font-black uppercase text-[9px] md:text-xs tracking-widest hover:bg-white/5 transition-all active:scale-95"
                  >
                    <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" /></svg>
                    <span>Connect</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="snap-section">
          <div className="w-full h-full matte-glass rounded-[2rem] md:rounded-[3rem] p-5 md:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-4 md:gap-12 overflow-hidden pt-32 md:pt-12">
            <div className="flex-none md:flex-1 w-full space-y-4 md:space-y-12">
              <div className="space-y-1.5 md:space-y-5 text-center md:text-left">
                <h3 className="font-sync text-[8px] md:text-sm text-red-500 font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase">Context & Roots</h3>
                <h2 className="section-title font-black font-sync uppercase leading-tight">JABALPUR <span className="text-slate-600 text-[0.6em] lowercase">to</span> VEDAMSOT</h2>
              </div>

              <div className="grid grid-cols-2 gap-2 md:gap-6">
                <div
                  onMouseEnter={() => setSlideshowFilter('College')}
                  onMouseLeave={() => setSlideshowFilter('All')}
                  className="p-3 md:p-10 bg-white/5 rounded-[1rem] md:rounded-[2.5rem] border border-white/5 hover:border-red-500/30 transition-all cursor-pointer group active:scale-[0.98] flex flex-col items-center md:items-start text-center md:text-left"
                >
                  <div className="w-6 h-6 md:w-12 md:h-12 bg-red-500/20 rounded-lg md:rounded-2xl mb-1.5 md:mb-8 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-3 h-3 md:w-6 md:h-6 text-red-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l-10 4.5v.5l10 4.5 10-4.5v-.5l-10-4.5zm0 6.136l-6.97-3.136 6.97-3.136 6.97 3.136 6.97 3.136zm-9 6.864l9 4 9-4v-5l-9 4-9-4v5z" /></svg>
                  </div>
                  <h3 className="text-[9px] md:text-2xl font-black uppercase tracking-tight mb-0.5">Education</h3>
                  <p className="text-[7px] md:text-base text-slate-400 font-medium leading-tight opacity-70">Vedam Technology<br />B.Tech CS AI</p>
                </div>
                <div
                  onMouseEnter={() => setSlideshowFilter('Hometown')}
                  onMouseLeave={() => setSlideshowFilter('All')}
                  className="p-3 md:p-10 bg-white/5 rounded-[1rem] md:rounded-[2.5rem] border border-white/5 hover:border-purple-500/30 transition-all cursor-pointer group active:scale-[0.98] flex flex-col items-center md:items-start text-center md:text-left"
                >
                  <div className="w-6 h-6 md:w-12 md:h-12 bg-purple-500/20 rounded-lg md:rounded-2xl mb-1.5 md:mb-8 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-3 h-3 md:w-6 md:h-6 text-purple-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                  </div>
                  <h3 className="text-[9px] md:text-2xl font-black uppercase tracking-tight mb-0.5">Hometown</h3>
                  <p className="text-[7px] md:text-base text-slate-400 font-medium leading-tight opacity-70">Jabalpur, MP<br />Marble City</p>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full h-full min-h-[180px] md:min-h-0 relative overflow-hidden rounded-[1.5rem] md:rounded-[3rem] border border-white/10 shadow-inner">
              <Slideshow onOpenGallery={() => setIsGalleryOpen(true)} filter={slideshowFilter} />
            </div>
          </div>
        </section>

        {/* AMBITION / JOURNEY */}
        <section className="snap-section">
          <div className="w-full h-full matte-glass rounded-[2rem] md:rounded-[3rem] p-5 md:p-16 lg:p-24 flex flex-col items-center justify-center text-center space-y-6 md:space-y-16 relative overflow-hidden pt-32 md:pt-12">
            <div className="space-y-3 md:space-y-8 max-w-5xl">
              <h3 className="font-sync text-[8px] md:text-sm text-purple-400 font-bold tracking-[0.3em] uppercase">The Vision</h3>
              <h2 className="section-title font-black font-sync leading-[1.1] md:leading-[1.05] uppercase">
                "BUILDING THE NEXT <span className="text-gradient">OPERATING SYSTEM</span> IS MY CORE DIRECTIVE."
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 w-full max-w-5xl text-left">
              <div className="space-y-2 md:space-y-5 p-5 md:p-10 border-l-2 border-red-500 bg-white/5 rounded-r-[1.5rem] md:rounded-r-[2rem] transition-all hover:bg-white/10 group">
                <h4 className="text-[11px] md:text-2xl font-black uppercase tracking-tight group-hover:text-red-400 transition-colors">Low Level Engineering</h4>
                <p className="text-[8px] md:text-base text-slate-400 leading-relaxed font-medium opacity-80">Deep-diving into Kernel Architectures and Systems Programming.</p>
              </div>
              <div className="space-y-2 md:space-y-5 p-5 md:p-10 border-l-2 border-purple-500 bg-white/5 rounded-r-[1.5rem] md:rounded-r-[2rem] transition-all hover:bg-white/10 group">
                <h4 className="text-[11px] md:text-2xl font-black uppercase tracking-tight group-hover:text-purple-400 transition-colors">Next-Gen Interface</h4>
                <p className="text-[8px] md:text-base text-slate-400 leading-relaxed font-medium opacity-80">Pioneering AI-driven interfaces that feel invisible and intuitive.</p>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        {PROJECTS.map((project, idx) => (
          <section key={project.id} className="snap-section">
            <div className="w-full h-full matte-glass rounded-[2rem] md:rounded-[3rem] overflow-hidden flex flex-col md:flex-row items-center gap-6 md:gap-16 p-5 md:p-12 lg:p-20 pt-32 md:pt-12">
              <div className={`flex-[1.2] space-y-4 md:space-y-12 ${idx % 2 === 0 ? 'md:order-1' : 'md:order-2'} order-2`}>
                <div className="space-y-2 md:space-y-6">
                  <h3 className="font-sync text-[8px] md:text-sm text-red-500 font-bold tracking-[0.3em] uppercase">Project 0{idx + 1}</h3>
                  <h2 className="project-title font-black font-sync uppercase leading-tight">{project.title}</h2>
                  <p className="text-[9px] md:text-lg text-slate-400 leading-relaxed font-medium opacity-80 line-clamp-3 md:line-clamp-none">
                    {project.longDescription}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 md:gap-3">
                  {project.techStack.map(tech => (
                    <span key={tech} className="px-3 md:px-5 py-1 md:py-2.5 bg-white/5 rounded-xl md:rounded-2xl text-[7px] md:text-xs font-black uppercase tracking-widest border border-white/10 text-slate-300">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 pt-1">
                  <button className="flex items-center space-x-2 px-4 md:px-8 py-3 md:py-5 bg-white text-slate-950 rounded-xl md:rounded-2xl font-black uppercase text-[9px] md:text-xs tracking-widest hover:scale-105 transition-all active:scale-95 group">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-slate-950" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                    <span>View Code</span>
                  </button>
                  {project.id !== 'yt-clone' && (
                    <button
                      onClick={() => setSandboxProject({ title: project.title, url: project.demoUrl })}
                      className="flex items-center space-x-2 px-4 md:px-8 py-3 md:py-5 bg-gradient-to-r from-red-600 to-purple-600 text-white rounded-xl md:rounded-2xl font-black uppercase text-[9px] md:text-xs tracking-widest hover:scale-105 transition-all shadow-xl active:scale-95"
                    >
                      <svg className="w-3.5 h-3.5 md:w-4 md:h-4 fill-white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      <span>Try Now</span>
                    </button>
                  )}
                </div>
              </div>

              <div className={`flex-[1.1] w-full h-[25vh] md:h-full relative ${idx % 2 === 0 ? 'md:order-2' : 'md:order-1'} order-1`}>
                <div className="w-full h-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 group shadow-2xl relative bg-slate-900/40">
                  <img src={project.imageUrl} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* CONTACT SECTION */}
        <section className="snap-section">
          <div className="w-full h-full matte-glass rounded-[2rem] md:rounded-[3rem] p-5 md:p-12 lg:p-24 flex flex-col items-center justify-center text-center space-y-6 md:space-y-16 relative overflow-hidden pt-32 md:pt-12">
            <div className="relative z-10 space-y-6 md:space-y-12">
              <h2 className="section-title font-black font-sync uppercase leading-tight md:leading-[1.05]">
                SYNC THE <span className="text-gradient">FUTURE.</span>
              </h2>
              <p className="text-[9px] sm:text-xs md:text-2xl lg:text-3xl text-slate-400 font-medium max-w-5xl mx-auto px-4 leading-relaxed opacity-80">
                Collaborate on kernel logic or high-end magic. My door is always open. Let's build.
              </p>

              <div className="flex flex-wrap justify-center gap-2 md:gap-8 pt-4">
                {[
                  { name: 'LinkedIn', color: '#0077B5', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
                  { name: 'GitHub', color: '#fff', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
                  { name: 'Telegram', color: '#0088cc', icon: 'M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.462 8.281l-1.562 7.351c-.115.524-.425.652-.862.404l-2.378-1.753-1.147 1.104c-.127.127-.233.233-.478.233l.17-2.413 4.39-3.965c.191-.169-.041-.264-.298-.093l-5.426 3.416-2.339-.731c-.508-.16-.519-.508.106-.753l9.143-3.525c.423-.153.793.1.662.711z' }
                ].map(social => (
                  <button key={social.name} className="flex items-center space-x-1.5 md:space-x-4 px-4 md:px-12 py-3 md:py-6 bg-white/5 border border-white/10 rounded-[1.5rem] md:rounded-[2rem] font-black uppercase text-[8px] md:text-xs tracking-widest hover:bg-white hover:text-slate-950 transition-all duration-300 transform hover:-translate-y-2 group active:scale-95 shadow-xl">
                    <svg className="w-3.5 h-3.5 md:w-6 md:h-6" style={{ color: social.color }} fill="currentColor" viewBox="0 0 24 24"><path d={social.icon} /></svg>
                    <span>{social.name}</span>
                  </button>
                ))}
              </div>

              <div className="pt-10 md:pt-24 opacity-30">
                <p className="text-[7px] md:text-xs font-sync uppercase tracking-[0.2em] md:tracking-[0.5em]">Aryzen Portfolio &copy; {new Date().getFullYear()}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <GalleryModal isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} />
      <SandboxModal
        isOpen={!!sandboxProject}
        onClose={() => setSandboxProject(null)}
        projectTitle={sandboxProject?.title || ''}
        demoUrl={sandboxProject?.url}
      />
    </div>
  );
};

export default App;
