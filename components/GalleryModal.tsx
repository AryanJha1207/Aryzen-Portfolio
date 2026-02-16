
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { GALLERY_IMAGES } from '../constants';
import { GalleryImage, isVideo } from '../types';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ isOpen, onClose }) => {
  const [selectedItem, setSelectedItem] = useState<GalleryImage | null>(null);
  const enlargedVideoRef = useRef<HTMLVideoElement>(null);

  // Group images by category
  const categorizedImages = useMemo(() => {
    return {
      Hometown: GALLERY_IMAGES.filter(img => img.category === 'Hometown'),
      College: GALLERY_IMAGES.filter(img => img.category === 'College'),
    };
  }, []);

  // Ensure enlarged video plays with sound when opened
  useEffect(() => {
    if (isOpen && selectedItem && isVideo(selectedItem) && enlargedVideoRef.current) {
      enlargedVideoRef.current.play().catch(err => {
        console.debug("Playback with sound might require user to interact with the modal again:", err);
      });
    }
  }, [selectedItem, isOpen]);

  // Reset selected item when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedItem(null);
    }
  }, [isOpen]);

  // Early return MUST happen after all hooks are declared
  if (!isOpen) return null;

  const GalleryGrid = ({ title, items }: { title: string, items: GalleryImage[] }) => (
    <div className="mb-16 last:mb-20">
      <div className="flex items-center space-x-4 mb-8 px-4">
        <h3 className="text-2xl md:text-4xl font-black font-sync uppercase tracking-tighter text-white">{title}</h3>
        <div className="h-px flex-1 bg-white/10"></div>
        <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">{items.length} Assets</span>
      </div>
      <div className="px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {items.map((img, idx) => {
          const itemIsVideo = isVideo(img);
          return (
            <div
              key={`${title}-${idx}-${img.url}`}
              onClick={() => setSelectedItem(img)}
              className="group relative aspect-square overflow-hidden bg-slate-900 rounded-[1.5rem] md:rounded-[2rem] border border-white/5 cursor-pointer transform transition-all duration-500 hover:scale-[1.02] active:scale-95 shadow-2xl"
            >
              {itemIsVideo ? (
                <video
                  src={img.url}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onMouseEnter={(e) => e.currentTarget.play().catch(() => { })}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                />
              ) : (
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
              )}

              {/* Simplified Overlay: Sub Tag ABOVE Title */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent flex flex-col justify-end p-5 md:p-6">
                <div className="mb-2">
                  {/* SUB-TAG POSITIONED ABOVE TITLE */}
                  {img.subTag && (
                    <span className="inline-block px-2 py-0.5 rounded-md bg-red-500 text-white text-[8px] font-black uppercase tracking-widest shadow-lg shadow-red-500/20">
                      {img.subTag}
                    </span>
                  )}
                </div>

                <div className="space-y-0.5">
                  <p className="text-[10px] md:text-sm font-bold text-white uppercase tracking-tight leading-tight line-clamp-1">
                    {img.title}
                  </p>
                  <p className="text-[8px] md:text-[10px] font-medium text-slate-400 uppercase tracking-widest">
                    {img.displayCategory || img.category} {itemIsVideo ? '• Video' : '• Image'}
                  </p>
                </div>

                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity scale-75 group-hover:scale-100 transform duration-300">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-3xl animate-in fade-in duration-300">
      <div className="relative w-full h-full max-w-7xl mx-auto flex flex-col p-4 md:p-8 overflow-hidden">

        {/* Header */}
        <div className="flex justify-between items-center mb-10 md:mb-16 px-4">
          <div className="space-y-1">
            <h2 className="text-2xl md:text-5xl font-black font-sync uppercase tracking-tighter text-gradient">Visual Archives</h2>
            <p className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-[0.3em]">System.Media.Explore() / {GALLERY_IMAGES.length} Assets Found</p>
          </div>
          <button
            onClick={onClose}
            className="group flex items-center space-x-3 px-6 py-4 bg-white/5 hover:bg-white/10 transition-all rounded-[1.5rem] text-[10px] md:text-xs font-black uppercase tracking-widest border border-white/10 active:scale-95"
          >
            <span>Close Gallery</span>
            <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-red-500 transition-colors">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </button>
        </div>

        {/* Content with Sections - ACADEMIC JOURNEY FIRST, HOMETOWN SECOND */}
        <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth px-2">
          <GalleryGrid title="Academic Journey" items={categorizedImages.College} />
          <GalleryGrid title="My Heart ❤️" items={categorizedImages.Hometown} />
        </div>

        {/* --- PREVIEW MODAL (ENLARGED VIEW) --- */}
        {selectedItem && (
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-10 lg:p-20 bg-black/80 backdrop-blur-3xl animate-in fade-in zoom-in duration-300"
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="relative w-full max-w-6xl h-full flex flex-col items-center justify-center group"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button Preview */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 md:-top-4 md:-right-12 p-4 bg-white/5 hover:bg-white/20 rounded-full border border-white/10 text-white transition-all z-[130] active:scale-90"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="relative w-full h-full max-h-[85vh] rounded-[2rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_0_120px_rgba(0,0,0,1)] border border-white/10 bg-slate-950">
                {isVideo(selectedItem) ? (
                  <video
                    ref={enlargedVideoRef}
                    src={selectedItem.url}
                    className="w-full h-full object-contain"
                    controls
                    autoPlay
                    playsInline
                  />
                ) : (
                  <img
                    src={selectedItem.url}
                    alt={selectedItem.title}
                    className="w-full h-full object-contain"
                  />
                )}

                {/* Information Overlay: Subtag above title here too */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none">
                  <div className="mb-6">
                    {selectedItem.subTag && (
                      <span className="inline-block px-4 py-1.5 rounded-full bg-red-600 text-white text-[10px] md:text-xs font-black tracking-widest uppercase border border-red-500/20 shadow-xl shadow-red-500/10">
                        {selectedItem.subTag}
                      </span>
                    )}
                  </div>
                  <h3 className="text-3xl md:text-6xl font-black font-sync uppercase text-white tracking-tighter mb-4">
                    {selectedItem.title}
                  </h3>
                  <div className="flex items-center space-x-4 opacity-40">
                    <p className="text-[10px] md:text-sm text-white font-bold uppercase tracking-[0.3em]">
                      {selectedItem.displayCategory || selectedItem.category} // ASSET_ID_{Math.floor(Math.random() * 900) + 100}
                    </p>
                    <div className="h-px flex-1 bg-white"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryModal;
