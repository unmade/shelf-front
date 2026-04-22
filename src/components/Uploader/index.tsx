import type { UploadEntries, UploadScope } from '@/types/uploads';

import { useIsLaptop } from '@/hooks/media-query';

import UploaderDialog from './UploaderDialog';
import UploaderDropdown from './UploaderDropdown';

interface Props {
  children: React.ReactNode;
  onFilesAdded: (files: UploadEntries) => void;
  uploadScope: UploadScope;
}

export default function Uploader({ children, onFilesAdded, uploadScope }: Props) {
  const isLaptop = useIsLaptop();

  if (isLaptop) {
    return (
      <UploaderDropdown onFilesAdded={onFilesAdded} uploadScope={uploadScope}>
        {children}
      </UploaderDropdown>
    );
  }
  return (
    <UploaderDialog onFilesAdded={onFilesAdded} uploadScope={uploadScope}>
      {children}
    </UploaderDialog>
  );
}
