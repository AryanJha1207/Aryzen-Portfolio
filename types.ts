
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  imageUrl: string;
  demoUrl?: string;
  repoUrl?: string;
}

export interface GalleryImage {
  url: string;
  title: string;
  category: 'Hometown' | 'College';
  displayCategory?: string; // Custom text to display instead of the strict category
  subTag?: string; // New sub-tag for more granular labeling
  type?: 'image' | 'video';
}

/**
 * Utility to determine if a media item is a video based on its type property 
 * or its file extension. Safe against undefined input.
 */
export const isVideo = (item: GalleryImage | undefined): boolean => {
  if (!item) return false;

  if (item.type === 'video') return true;
  if (item.type === 'image') return false;

  // Fallback: check extension
  if (!item.url) return false;
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
  return videoExtensions.some(ext => item.url.toLowerCase().endsWith(ext));
};
