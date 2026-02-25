import { useEffect, useState } from 'react';

import { cva } from 'class-variance-authority';

import { useAppSelector } from '@/hooks';
import { selectFeatureMaxFileSizeToThumbnail } from '@/store/features';
import {
  selectFallbackThumbnail,
  useDownloadContentQuery,
  useGetThumbnailQuery,
  type FileSchema,
} from '@/store/files';

import { cn } from '@/lib/utils';

import { MediaType, ThumbnailSize } from '@/constants';

import { MEGABYTE } from '@/ui/filesize';
import { Spinner } from '@/ui/spinner';

import FileIcon from '@/components/FileIcon';

export { ThumbnailSize } from '@/constants';

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
  file: FileSchema;
  size?: string;
  style?: React.CSSProperties;
  objectFit?: ObjectFit;
}

interface SVGThumbnail {
  className?: string;
  file: FileSchema;
}

// Renders SVG files by downloading the raw content and displaying it inline.
function SVGThumbnail({ className = '', file }: SVGThumbnail) {
  const { data } = useDownloadContentQuery(file.path, { skip: file.size > MEGABYTE });

  if (data?.content == null) {
    return <FileIcon className={className} mediatype={file.mediatype} hidden={file.hidden} />;
  }

  return (
    <img
      className={cn(thumbnailVariants({ objectFit: 'scale-down' }), className)}
      src={data.content}
      alt={file.name}
    />
  );
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
    { skip: skip || file.thumbnail_url?.startsWith('blob:') },
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
      shared={file.shared}
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

  if (MediaType.isSVG(file.mediatype)) {
    return <SVGThumbnail className={className} file={file} />;
  }

  return fileIcon;
}
