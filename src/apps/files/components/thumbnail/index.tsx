import { useEffect, useState } from 'react';

import { cva } from 'class-variance-authority';

import { selectFeatureMaxFileSizeToThumbnail } from '@/store/features';
import { selectFallbackThumbnail, useGetThumbnailQuery, type FileSchema } from '@/store/files';
import { type SharedLinkFileSchema } from '@/store/sharedLinks';

import { cn } from '@/lib/utils';

import { ThumbnailSize } from '@/constants';
import { useAppSelector } from '@/hooks';

import { Spinner } from '@/ui/spinner';

import FileIcon from '@/components/FileIcon';

export { ThumbnailSize } from '@/constants';

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

export function guessThumbnailSize({ width, height }: { width: number; height: number }): string {
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

type ObjectFit = 'scale-down' | 'contain' | 'cover' | 'fill' | 'none';

const thumbnailVariants = cva('', {
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

interface ThumbnailProps {
  className?: string;
  file: FileSchema | SharedLinkFileSchema;
  size?: string;
  style?: React.CSSProperties;
  objectFit?: ObjectFit;
}

function ImageThumbnail({
  className = '',
  file,
  size = ThumbnailSize.xs,
  style,
  objectFit = 'scale-down',
}: ThumbnailProps) {
  const [skip, setSkip] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setSkip(false), 150);
    return () => {
      clearTimeout(timer);
      setSkip(true);
    };
  }, []);

  const mtime = new Date(file.modified_at).getTime();

  const fallback = useAppSelector((state) =>
    selectFallbackThumbnail(state, { url: file.thumbnail_url!, size, mtime }),
  );

  const { data, isFetching } = useGetThumbnailQuery(
    { url: file.thumbnail_url!, size, mtime },
    {
      skip: skip || file.thumbnail_url?.startsWith('blob:'),
      selectFromResult: ({ data, isFetching }) => ({ data, isFetching }),
    },
  );

  // Newly-uploaded files get a temporary blob URL.
  if (file.thumbnail_url?.startsWith('blob:')) {
    return (
      <img
        className={cn(thumbnailVariants({ objectFit }), className)}
        src={file.thumbnail_url}
        alt={file.name}
        style={style}
        loading="lazy"
      />
    );
  }

  if (fallback?.content != null && data?.content == null) {
    return (
      <img
        className={cn(thumbnailVariants({ objectFit: 'contain' }), className)}
        src={fallback.content}
        alt={file.name}
      />
    );
  }

  if (isFetching || data?.content == null) {
    return <Spinner className={className} />;
  }

  return (
    <img
      className={cn(thumbnailVariants({ objectFit }), className)}
      src={data.content}
      alt={file.name}
      style={style}
    />
  );
}

export function Thumbnail({
  className = '',
  file,
  size = ThumbnailSize.xs,
  style,
  objectFit = 'scale-down',
}: ThumbnailProps) {
  const maxSize = useAppSelector(selectFeatureMaxFileSizeToThumbnail);

  const fileIcon = (
    <FileIcon
      className={className}
      mediatype={file.mediatype}
      hidden={file.hidden}
      shared={'shared' in file && file.shared}
    />
  );

  if (file.size > maxSize) {
    return fileIcon;
  }

  if (file.thumbnail_url != null) {
    return (
      <ImageThumbnail
        className={className}
        file={file}
        size={size}
        style={style}
        objectFit={objectFit}
      />
    );
  }

  return fileIcon;
}
