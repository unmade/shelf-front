import { useEffect } from 'react';

import * as DialogPrimitive from '@radix-ui/react-dialog';

import { GalleryContent } from './content';
import { GalleryProvider, useGallery } from './context';
import { GalleryHeader } from './header';
import { GallerySidePanel } from './side-panel';

function GalleryDialog() {
  const { open: open, closeGallery } = useGallery();

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeGallery();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, closeGallery]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(open) => !open && closeGallery()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Content className="bg-background fixed inset-0 flex flex-col outline-none">
          <DialogPrimitive.Title className="sr-only">Gallery</DialogPrimitive.Title>
          <GalleryHeader />
          <div className="flex min-h-0 flex-1">
            <GalleryContent />
            <GallerySidePanel />
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export function Gallery() {
  return (
    <GalleryProvider>
      <GalleryDialog />
    </GalleryProvider>
  );
}
