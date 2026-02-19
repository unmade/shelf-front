import { useMemo } from 'react';

import type { FileSchema } from '@/store/files';

import { SidePreviewActions } from './actions';
import { SidePreviewHeader } from './header';

import { FileSections } from '@/apps/files/components/file-sections';

interface SingleFilePreviewProps {
  file: FileSchema;
}

export function SingleFilePreview({ file }: SingleFilePreviewProps) {
  const files = useMemo(() => [file], [file]);

  return (
    <div className="h-full">
      <SidePreviewHeader files={files} />
      <SidePreviewActions files={files} />
      <FileSections file={file} />
    </div>
  );
}
