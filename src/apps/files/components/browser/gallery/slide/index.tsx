import { memo } from 'react';

import type { FileSchema } from '@/store/files';

import { MediaType } from '@/constants';

import { CodeSlide } from './code';
import { ImageSlide } from './image';
import { NoPreview } from './no-preview';
import { PDFSlide } from './pdf';

function getSlideRenderer(mediatype: string) {
  if (MediaType.isImage(mediatype)) {
    return ImageSlide;
  }
  if (MediaType.isText(mediatype)) {
    return CodeSlide;
  }
  if (MediaType.isPDF(mediatype)) {
    return PDFSlide;
  }
  return NoPreview;
}

interface GallerySlideProps {
  file: FileSchema;
  inView: boolean;
}

export const GallerySlide = memo(function GallerySlide({ file, inView }: GallerySlideProps) {
  if (!inView) {
    return null;
  }

  const Renderer = getSlideRenderer(file.mediatype);
  return (
    <div className="h-full flex-col overflow-auto py-4">
      <Renderer file={file} />
    </div>
  );
});
