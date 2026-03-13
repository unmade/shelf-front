import { useIsLaptop } from 'hooks/media-query';

import UploaderDialog from './UploaderDialog';
import UploaderDropdown from './UploaderDropdown';

interface Props {
  allowedMediaTypes?: string[];
  children: React.ReactNode;
  uploadTo: string;
}

export default function Uploader({ allowedMediaTypes, children, uploadTo }: Props) {
  const isLaptop = useIsLaptop();

  if (isLaptop) {
    return (
      <UploaderDropdown allowedMediaTypes={allowedMediaTypes} uploadTo={uploadTo}>
        {children}
      </UploaderDropdown>
    );
  }
  return (
    <UploaderDialog allowedMediaTypes={allowedMediaTypes} uploadTo={uploadTo}>
      {children}
    </UploaderDialog>
  );
}
