import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';

import { cva } from 'class-variance-authority';

import { selectFallbackThumbnail, useGetThumbnailQuery } from '@/store/files';

import { cn } from '@/lib/utils';

import { ThumbnailSize } from '@/constants';
import { useAppSelector } from '@/hooks';

import { Spinner } from '@/ui/spinner';

function isHiDPI() {
  return (
    (window.matchMedia &&
      (window.matchMedia(
        'only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx), only screen and (min-resolution: 75.6dpcm)',
      ).matches ||
        window.matchMedia(
          'only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min--moz-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2)',
        ).matches)) ||
    (window.devicePixelRatio && window.devicePixelRatio >= 2)
  );
}

function guessThumbnailSize({ width, height }: { width: number; height: number }): string {
  let pixelSize = Math.max(width, height);
  if (isHiDPI()) {
    pixelSize *= 2;
  }
  if (pixelSize <= 72) {
    return ThumbnailSize.xs;
  }
  if (pixelSize <= 512) {
    return ThumbnailSize.lg;
  }
  return ThumbnailSize.xxl;
}

type LoadingStatus = 'idle' | 'loading' | 'loaded';

interface ThumbnailContextValue {
  loadingStatus: LoadingStatus;
  setLoadingStatus: (status: LoadingStatus) => void;
}

const ThumbnailContext = createContext<ThumbnailContextValue | null>(null);

function useThumbnailContext() {
  const context = useContext(ThumbnailContext);
  if (context == null) {
    throw new Error('`useThumbnailContext` must be used within a `ThumbnailProvider`');
  }
  return context;
}

function Thumbnail({ className, children, ...props }: React.ComponentProps<'div'>) {
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>('idle');

  const ctx = useMemo(() => ({ loadingStatus, setLoadingStatus }), [loadingStatus]);

  return (
    <ThumbnailContext.Provider value={ctx}>
      <div
        data-slot="thumbnail"
        className={cn(
          'relative flex shrink-0 items-center justify-center overflow-hidden',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </ThumbnailContext.Provider>
  );
}

const objectFitVariants = cva('size-full', {
  variants: {
    objectFit: {
      'scale-down': 'object-scale-down',
      contain: 'object-contain',
      cover: 'object-cover',
      fill: 'object-fill',
      none: 'object-none',
    },
  },
  defaultVariants: {
    objectFit: 'scale-down',
  },
});

type ObjectFit = 'scale-down' | 'contain' | 'cover' | 'fill' | 'none';

interface ThumbnailImageProps extends Omit<React.ComponentProps<'img'>, 'src'> {
  src?: string | null;
  size?: string;
  objectFit?: ObjectFit;
}

function useThumbnailUrl(
  url: string | null | undefined,
  size: string,
): { url: string | null; isFetching: boolean } {
  const [skip, setSkip] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setSkip(false), 150);
    return () => {
      clearTimeout(timer);
      setSkip(true);
    };
  }, []);

  // Newly-uploaded files get a temporary blob URL.
  const isBlob = url?.startsWith('blob:');

  const fallback = useAppSelector((state) =>
    url ? selectFallbackThumbnail(state, { url, size }) : null,
  );

  const shouldSkip = !url || skip || !!isBlob;
  const { data, isFetching } = useGetThumbnailQuery(shouldSkip ? skipToken : { url, size }, {
    selectFromResult: ({ data, isFetching }) => ({ data, isFetching }),
  });

  if (isBlob && url) {
    return { url, isFetching };
  }

  return { url: data?.content ?? fallback?.content ?? null, isFetching };
}

function ThumbnailImage({
  src,
  size = ThumbnailSize.xs,
  className,
  objectFit,
  alt = '',
  ...props
}: ThumbnailImageProps) {
  const { url, isFetching } = useThumbnailUrl(src, size);
  const { setLoadingStatus } = useThumbnailContext();

  useEffect(() => {
    setLoadingStatus(url != null ? 'loaded' : isFetching ? 'loading' : 'idle');
    return () => {
      setLoadingStatus('idle');
    };
  }, [url, isFetching, setLoadingStatus]);

  if (!url && isFetching) {
    return <Spinner className={className} />;
  }

  if (!url) {
    return null;
  }

  return (
    <img
      data-slot="thumbnail-image"
      className={cn(objectFitVariants({ objectFit }), className)}
      src={url}
      alt={alt}
      {...props}
    />
  );
}

function ThumbnailFallback({ className, ...props }: React.ComponentProps<'div'>) {
  const { loadingStatus } = useThumbnailContext();

  if (loadingStatus === 'loading' || loadingStatus === 'loaded') {
    return null;
  }

  return (
    <div
      data-slot="thumbnail-fallback"
      className={cn('flex size-full items-center justify-center', className)}
      {...props}
    />
  );
}

export { Thumbnail, ThumbnailImage, ThumbnailFallback, guessThumbnailSize };
