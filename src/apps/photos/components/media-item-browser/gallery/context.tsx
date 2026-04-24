import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import type { CarouselApi } from '@/ui/carousel';

import { useMediaItemsBrowserData } from '../contexts/data';
import { useMediaItemBrowser } from '../contexts/ui';

interface GalleryContextValue {
  open: boolean;
  startIndex: number;
  totalSlides: number;
  displayTotal: number;
  carouselApi: CarouselApi | undefined;
  sidePanelOpen: boolean;
  closeGallery: () => void;
  setCarouselApi: (api: CarouselApi | undefined) => void;
  setPreviewedId: (mediaItemId: string) => void;
  toggleSidePanel: () => void;
}

const GalleryContext = createContext<GalleryContextValue | null>(null);

interface GalleryProviderProps {
  children: React.ReactNode;
}

export function GalleryProvider({ children }: GalleryProviderProps) {
  const { data, itemsCount } = useMediaItemsBrowserData();
  const { previewedId, openPreview, closePreview } = useMediaItemBrowser();

  const [carouselApi, setCarouselApi] = useState<CarouselApi | undefined>();
  const [sidePanelOpen, setSidePanelOpen] = useState(true);

  const ids = data?.ids ?? [];
  const open = previewedId != null;
  const startIndex = previewedId == null ? 0 : ids.findIndex((id) => id === previewedId);
  const totalSlides = ids.length;
  const displayTotal = itemsCount ?? totalSlides;

  const closeGallery = useCallback(() => {
    closePreview();
  }, [closePreview]);

  const setPreviewedId = useCallback(
    (mediaItemId: string) => {
      openPreview(mediaItemId);
    },
    [openPreview],
  );

  const toggleSidePanel = useCallback(() => {
    setSidePanelOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!open) {
      setSidePanelOpen(true);
      setCarouselApi(undefined);
    }
  }, [open]);

  useEffect(() => {
    if (!open || !data || previewedId == null || startIndex >= 0) {
      return;
    }

    const fallbackIndex = carouselApi?.selectedScrollSnap() ?? 0;
    const fallbackId = data.ids[Math.min(fallbackIndex, data.ids.length - 1)];

    if (fallbackId) {
      openPreview(fallbackId);
      return;
    }

    closePreview();
  }, [open, data, previewedId, startIndex, carouselApi, openPreview, closePreview]);

  const value = useMemo(
    () => ({
      open,
      startIndex: Math.max(startIndex, 0),
      totalSlides,
      displayTotal,
      carouselApi,
      sidePanelOpen,
      closeGallery,
      setCarouselApi,
      setPreviewedId,
      toggleSidePanel,
    }),
    [
      open,
      startIndex,
      totalSlides,
      displayTotal,
      carouselApi,
      sidePanelOpen,
      closeGallery,
      setPreviewedId,
      toggleSidePanel,
    ],
  );

  return <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>;
}

export function useGallery() {
  const context = useContext(GalleryContext);
  if (context === null) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
}

export function useSelectGallerySlide() {
  const { data } = useMediaItemsBrowserData();
  const { carouselApi, startIndex } = useGallery();

  const currentIndex = carouselApi?.selectedScrollSnap() ?? startIndex;
  const currentMediaItem =
    data?.ids[currentIndex] != null ? data.entities[data.ids[currentIndex]] : undefined;

  return { currentIndex, currentMediaItem };
}
