import React, { useRef } from 'react';

import { useAppDispatch } from 'hooks';

import { fileEntriesAdded } from '../store/uploads/slice';

import Button from './ui/Button';

interface Props {
  children: React.ReactNode;
  allowedMediaTypes?: string[];
  full?: boolean;
  icon?: React.ReactElement;
  size?: 'xs' | 'sm' | 'base' | 'lg';
  uploadTo: string;
}

export default function UploadButton({
  children,
  allowedMediaTypes,
  full = false,
  icon,
  size = 'sm',
  uploadTo,
}: Props) {
  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const openUpload = (event: React.FormEvent) => {
    event.preventDefault();
    inputRef.current?.click();
  };

  const setUploadFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = [...(event.target.files ?? [])];
    dispatch(fileEntriesAdded({ allowedMediaTypes, files, uploadTo }));
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <form>
      <input
        ref={inputRef}
        type="file"
        accept={allowedMediaTypes?.join(',')}
        name="file"
        className="hidden"
        onChange={setUploadFiles}
        multiple
      />
      <Button variant="primary" size={size} icon={icon} onClick={openUpload} full={full}>
        {children}
      </Button>
    </form>
  );
}
