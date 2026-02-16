
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { GALLERY_IMAGES } from '../constants';
import { isVideo } from '../types';

interface SlideshowProps {
  onOpenGallery: () => void;
  filter?: 'All' | 'College' | 'Hometown';
}

const Slideshow: React.FC<SlideshowProps> = ({ onOpenGallery, filter = 'All' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const filteredImages = useMemo(() => {
    if (filter === 'All') return GALLERY_IMAGES;
    return GALLERY_IMAGES.filter(img => img.category === filter);
  }, [filter]);

  // Handle filter changes (e.g. hovering a card)
  useEffect(() => {
    setCurrentIndex(0);
  }, [filter]);

  // Explicit playback control when index or filter changes
  useEffect(() => {
    if (filteredImages.length === 0) return;

    const currentItem = filteredImages[currentIndex];
    const currentVideo = videoRefs.current[currentIndex];

    // Added safety check for currentItem to prevent "reading type of undefined"
    if (currentItem && isVideo(currentItem) && currentVideo) {
      currentVideo.currentTime = 0;
      currentVideo.play().catch(err => console.debug("Autoplay blocked or failed:", err));
    }
  }, [currentIndex, filteredImages]);

  // Dynamic timing logic
  useEffect(() => {
    if (filteredImages.length <= 1) return;

    const currentItem = filteredImages[currentIndex];

    let duration = 4000;
    if (currentItem && isVideo(currentItem)) {
      duration = (filter === 'Hometown') ? 20000 : 5000;
    }

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
    }, duration);

    return () => clearTimeout(timer);
  }, [currentIndex, filteredImages, filter]);

  return (
    <div className="relative w-full h-full min-h-[200px] group rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-slate-900/50">
      {filteredImages.length > 0 ? filteredImages.map((img, idx) => {
        const itemIsVideo = isVideo(img);
        return (
          <div
            key={`${filter}-${img.url}-${idx}-${itemIsVideo}`}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${idx === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
              }`}
          >
            {itemIsVideo ? (
              <video
                ref={el => { videoRefs.current[idx] = el; }}
                src={img.url}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
              />
            ) : (
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent" />
            <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 right-6 md:right-12">
              <span className="text-[9px] md:text-xs font-black uppercase tracking-[0.3em] text-red-500 mb-2 block">
                {img.displayCategory || img.category}
              </span>
              <h3 className="text-sm md:text-2xl lg:text-3xl font-black font-sync text-white uppercase line-clamp-2 leading-tight">{img.title}</h3>
            </div>
          </div>
        );
      }) : (
        <div className="flex items-center justify-center h-full text-slate-600 font-sync text-[10px] uppercase">NO ASSETS</div>
      )}

      {/* Button Container: Removed pointer-events-none on mobile to allow clicks */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm bg-black/40 pointer-events-auto group-hover:z-50">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenGallery();
          }}
          className="px-8 py-4 bg-white text-slate-950 rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-widest shadow-2xl hover:scale-105 transition-transform active:scale-95 pointer-events-auto"
        >
          Explore Full Gallery
        </button>
      </div>

      <div className="absolute top-6 right-6 md:top-12 md:right-12 flex space-x-1.5 md:space-x-2">
        {filteredImages.map((_, idx) => (
          <div
            key={idx}
            className={`h-0.5 md:h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 md:w-12 bg-red-500' : 'w-2 md:w-3 bg-white/20'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
