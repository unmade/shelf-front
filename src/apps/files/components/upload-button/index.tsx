import { Button, type ButtonProps } from '@/ui/button';

import { useUploadFiles } from '@/apps/files/hooks/use-upload-files';

type Props = ButtonProps & {
  allowedMediaTypes?: string[];
  uploadTo: string;
};

export function UploadButton({ allowedMediaTypes, children, uploadTo, ...props }: Props) {
  const { triggerUpload, fileInputProps } = useUploadFiles({ allowedMediaTypes, uploadTo });

  return (
    <form>
      <input {...fileInputProps} />
      <Button {...props} onClick={triggerUpload}>
        {children}
      </Button>
    </form>
  );
}
