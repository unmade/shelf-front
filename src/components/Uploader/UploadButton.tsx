import type { UploadEntries } from '@/types/uploads';

import { Button, type ButtonProps } from '@/ui/button';

import { useUploadFiles } from './hooks/use-upload-files';

type Props = ButtonProps & {
  onFilesAdded: (files: UploadEntries) => void;
};

export function UploadButton({ children, onFilesAdded, ...props }: Props) {
  const { triggerUpload, fileInputProps } = useUploadFiles({ onFilesAdded });

  return (
    <form>
      <input {...fileInputProps} />
      <Button {...props} onClick={triggerUpload}>
        {children}
      </Button>
    </form>
  );
}
