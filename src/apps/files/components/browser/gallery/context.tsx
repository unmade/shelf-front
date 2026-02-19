import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { type EntityState } from '@reduxjs/toolkit';

import { type FileSchema } from '@/store/files';

import useDirPath from '@/hooks/dir-path';

import { PREVIEW_PARAM } from '@/constants';

import type { CarouselApi } from '@/ui/carousel';

import { useFileBrowserData } from '../contexts/data';

function toAbsolutePath(dirPath: string, fileName: string): string {
  return dirPath === '.' ? fileName : `${dirPath}/${fileName}`;
}

function findFileIndex(data: EntityState<FileSchema, string>, targetPath: string): number {
  const lowerPath = targetPath.toLowerCase();
  const index = data.ids.findIndex((id) => {
    const file = data.entities[id];
    return file?.path.toLowerCase() === lowerPath;
  });
  return index;
}

interface GalleryContextValue {
  open: boolean;
  startIndex: number;
  totalSlides: number;
  carouselApi: CarouselApi | undefined;
  sidePanelOpen: boolean;
  closeGallery: () => void;
  setCarouselApi: (api: CarouselApi) => void;
  setPreview: (fileName: string | null) => void;
  toggleSidePanel: () => void;
}

const GalleryContext = createContext<GalleryContextValue | null>(null);

interface GalleryProviderProps {
  children: React.ReactNode;
}

const initialState = {
  open: false,
  startIndex: 0,
};

export function GalleryProvider({ children }: GalleryProviderProps) {
  const [{ open: open, startIndex }, setState] = useState(initialState);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | undefined>();
  const [sidePanelOpen, setSidePanelOpen] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const dirPath = useDirPath();

  const { data } = useFileBrowserData();
  const totalSlides = data?.ids.length ?? 0;

  const setPreview = useCallback(
    (fileName: string | null) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (fileName === null) {
          next.delete(PREVIEW_PARAM);
        } else {
          next.set(PREVIEW_PARAM, fileName);
        }
        return next;
      });
    },
    [setSearchParams],
  );

  const closeGallery = useCallback(() => {
    setPreview(null);
  }, [setPreview]);

  const toggleSidePanel = useCallback(() => {
    setSidePanelOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const previewParam = searchParams.get(PREVIEW_PARAM);
    if (open && previewParam == null) {
      setState(initialState);
    } else if (!open && previewParam != null && data) {
      const absolutePath = toAbsolutePath(dirPath ?? '.', previewParam);
      const startIndex = findFileIndex(data, absolutePath);
      setState({
        open: true,
        startIndex,
      });
    }
  }, [open, data, searchParams, dirPath]);

  const value = useMemo(
    () => ({
      open,
      startIndex,
      totalSlides,
      carouselApi,
      sidePanelOpen,
      closeGallery,
      setPreview,
      setCarouselApi,
      toggleSidePanel,
    }),
    [
      open,
      startIndex,
      totalSlides,
      carouselApi,
      sidePanelOpen,
      closeGallery,
      setPreview,
      setCarouselApi,
      toggleSidePanel,
    ],
  );

  return <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>;
}

export function useGallery() {
  const context = useContext(GalleryContext);
  if (context === null) {
    throw new Error('`useGallery` must be used within a `GalleryProvider`');
  }
  return context;
}

export function useSelectGallerySlide() {
  const { data } = useFileBrowserData();
  const { carouselApi } = useGallery();

  const currentIndex = carouselApi?.selectedScrollSnap() ?? 0;
  const currentFile = data?.entities[data?.ids[currentIndex]];
  return { currentIndex, currentFile };
}
