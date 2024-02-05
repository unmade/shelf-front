import React, { useState } from 'react';

import * as icons from 'icons';

import { useAppSelector } from 'hooks';

import { selectIsUploading, selectVisibleUploadsLength } from 'store/uploads/slice';

import Dropdown from 'components/ui/Dropdown';
import Button from 'components/ui/Button';

import Overlay from './Overlay';

const buttonClasses = [
  'animate-gradient bg-gradient-to-br',
  'from-indigo-400 via-purple-400 to-blue-400',
  'bg-[length:400%_400%]',
  'hover:from-indigo-300 hover:via-purple-300 hover:to-blue-300',
].join(' ');

interface Props {
  allowedMediaTypes?: string[];
  uploadTo: string;
}

export default function UploaderDropdown({ allowedMediaTypes = undefined, uploadTo }: Props) {
  const [open, setOpen] = useState(false);

  const uploading = useAppSelector(selectIsUploading);
  const uploadCounter = useAppSelector((state) => selectVisibleUploadsLength(state, 'all'));

  const buttonRef = React.useRef<HTMLDivElement>();

  React.useEffect(() => {
    if (uploadCounter > 0 && !open) {
      buttonRef.current?.click();
    }
  }, [uploadCounter]);

  return (
    <Dropdown
      overlay={<Overlay allowedMediaTypes={allowedMediaTypes} uploadTo={uploadTo} />}
      onOpenChange={setOpen}
    >
      <Button
        innerRef={buttonRef}
        className={uploading ? buttonClasses : ''}
        as="div"
        variant="primary"
        title="Uploads"
        size="lg"
        icon={<icons.CloudUpload className="h-5 w-5 shrink-0" />}
      />
    </Dropdown>
  );
}
