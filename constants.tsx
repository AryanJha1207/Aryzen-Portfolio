
import React from 'react';
import { Project, GalleryImage } from './types.ts';

export const PROJECTS: Project[] = [
  {
    id: 'yt-clone',
    title: 'Aryzen Tube',
    description: 'Built during a high-stakes 4-hour college hackathon.',
    longDescription: 'Developed as part of a competitive hackathon at Vedam School of Technology. Features include video listing, search functionality, and a responsive sidebar. Mastered rapid prototyping and state management within a tight deadline.',
    techStack: ['React', 'Tailwind CSS', 'YouTube API'],
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 'clicker-game',
    title: 'Click-o-Win',
    description: 'An addictive game centered around precision and speed.',
    longDescription: 'A classic clicker game where players rack up points through fast interactions. Implemented complex logic for score multipliers and achievements. Focused on smooth UI animations and low-latency feedback.',
    techStack: ['JavaScript', 'HTML5 Canvas', 'CSS Animations'],
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000',
    demoUrl: 'https://click-o-win.vercel.app/',
  },
  {
    id: 'drumkit',
    title: 'Digital Drumkit',
    description: 'A responsive music application with low latency audio.',
    longDescription: 'A realistic virtual drumkit that maps keys to high-quality audio samples. Explored the Web Audio API to ensure zero-lag playback, making it a professional-grade learning tool for hobbyists.',
    techStack: ['React', 'Web Audio API', 'SVG Graphics'],
    imageUrl: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&q=80&w=1000',
    demoUrl: 'https://aryzen-drumkit.netlify.app/',
  },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  /* 
    HOMETOWN VIDEO: 
    Place your hometown video URL here. 
    It is reordered to be the FIRST item in the category 
    so it triggers immediately on card hover.
  */
  {
    url: '/Media/Bhedaghat.mp4', // <-- PASTE HOMETOWN VIDEO LOCATION HERE
    title: 'Dhuandhar Falls',
    category: 'Hometown',
    type: 'video'
  },
  {
    url: '/Media/Marble-Rocks.mp4',
    title: 'Marble Rocks of Bhedaghat',
    category: 'Hometown',
    type: 'video'
  },
  /* 
    COLLEGE ASSETS:
  */
  {
    url: './my-video.mp4', // <-- PASTE COLLEGE VIDEO LOCATION HERE (e.g., project demo)
    title: 'Academic Life & Projects',
    category: 'College',
    type: 'video'
  },
  {
    url: '/Media/classroom.png',
    title: 'Classroom at Vedam',
    category: 'College',
    type: 'image'
  },
  {
    url: '/Media/Deepotsav.mp4',
    title: 'Deepotsav',
    category: 'Hometown',
    type: 'video'
  },
  {
    url: '/Media/24-HR-Hackathon.jpg',
    title: '24 HR HACKATHON',
    category: 'College',
    type: 'image'
  }
];
