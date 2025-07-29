import { useIsLaptop } from 'hooks/media-query';

import UploaderDialog from './UploaderDialog';
import UploaderDropdown from './UploaderDropdown';

interface Props {
  allowedMediaTypes?: string[];
  uploadTo: string;
}

export default function Uploader({ allowedMediaTypes, uploadTo }: Props) {
  const isLaptop = useIsLaptop();

  if (isLaptop) {
    return <UploaderDropdown allowedMediaTypes={allowedMediaTypes} uploadTo={uploadTo} />;
  }
  return <UploaderDialog allowedMediaTypes={allowedMediaTypes} uploadTo={uploadTo} />;
}
