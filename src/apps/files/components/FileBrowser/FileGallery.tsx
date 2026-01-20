import { memo, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { ChevronLeftIcon, ChevronRightIcon, XIcon } from 'lucide-react';

import { Button } from '@/ui/button';

import { useGalleryContext } from './GalleryContext';

/**
 * Full-screen file gallery/carousel component.
 * Renders via portal to document.body for true full-screen overlay.
 *
 * Features:
 * - Full-screen overlay with backdrop
 * - Previous/Next navigation buttons
 * - Keyboard navigation (Arrow keys, Escape)
 * - Shows current position indicator (e.g., "3 of 25")
 *
 * Note: This is a skeleton implementation. The actual file preview
 * (image rendering, video player, document viewer, etc.) should be
 * implemented based on the file's media type.
 */
export const FileGallery = memo(function FileGallery() {
  const {
    currentFileId,
    currentIndex,
    fileIds,
    isOpen,
    closeGallery,
    goToNext,
    goToPrevious,
    hasNext,
    hasPrevious,
  } = useGalleryContext();

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          closeGallery();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeGallery, goToNext, goToPrevious]);

  // Prevent body scroll when gallery is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  if (!isOpen || !currentFileId) {
    return null;
  }

  const galleryContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      role="dialog"
      aria-modal="true"
      aria-label="File gallery"
    >
      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={closeGallery}
        className="absolute top-4 right-4 z-10 text-white hover:bg-white/10"
        aria-label="Close gallery"
      >
        <XIcon className="size-6" />
      </Button>

      {/* Position indicator */}
      <div className="absolute top-4 left-4 text-sm text-white/70">
        {currentIndex + 1} of {fileIds.length}
      </div>

      {/* Previous button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={goToPrevious}
        disabled={!hasPrevious}
        className="absolute left-4 z-10 size-12 text-white hover:bg-white/10 disabled:opacity-30"
        aria-label="Previous file"
      >
        <ChevronLeftIcon className="size-8" />
      </Button>

      {/* Next button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={goToNext}
        disabled={!hasNext}
        className="absolute right-4 z-10 size-12 text-white hover:bg-white/10 disabled:opacity-30"
        aria-label="Next file"
      >
        <ChevronRightIcon className="size-8" />
      </Button>

      {/* Content area - placeholder */}
      <div className="flex max-h-[90vh] max-w-[90vw] flex-col items-center justify-center">
        <div className="rounded-lg bg-white/10 p-8 text-center">
          <p className="text-lg text-white">File Preview Placeholder</p>
          <p className="mt-2 text-sm text-white/60">File ID: {currentFileId}</p>
          <p className="mt-4 text-xs text-white/40">
            Implement actual preview based on file media type:
            <br />
            images, videos, documents, etc.
          </p>
        </div>
      </div>
    </div>
  );

  // Render via portal to body for true full-screen overlay
  return createPortal(galleryContent, document.body);
});

FileGallery.displayName = 'FileGallery';
