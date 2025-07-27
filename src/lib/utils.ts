import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Image loading utilities
export const imageLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

// Fallback image handler
export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>, fallbackSrc?: string) => {
  const img = event.currentTarget;
  if (fallbackSrc) {
    img.src = fallbackSrc;
  } else {
    img.style.display = 'none';
  }
  console.error(`Failed to load image: ${img.src}`);
}

// Check if image exists
export const checkImageExists = (src: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}
