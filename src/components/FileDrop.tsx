import React, { useCallback } from 'react';

import { useAppDispatch } from 'hooks';

import { fileEntriesAdded } from 'store/uploads/slice';

import Dropzone, { DropzoneProps } from './ui/Dropzone';

interface Props extends Omit<DropzoneProps, 'onDrop'> {
  allowedMediaTypes?: string[];
}

export default function FileDrop(props: Props) {
  const { allowedMediaTypes } = props;
  const dispatch = useAppDispatch();

  const onDrop = useCallback((arg: { files: FileSystemFileEntry[]; uploadTo: string }) => {
    dispatch(fileEntriesAdded({ ...arg, allowedMediaTypes }));
  }, []);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Dropzone {...props} onDrop={onDrop} />;
}
