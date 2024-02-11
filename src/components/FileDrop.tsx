import React, { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from 'hooks';

import { selectCurrentAccount } from 'store/accounts';
import { selectFeatureVerificationRequired } from 'store/features';
import { fileEntriesAdded } from 'store/uploads/slice';

import Dropzone, { DropzoneProps } from './ui/Dropzone';

import { useVerifyAccountDialog } from './VerifyAccountDialogProvider';

interface Props extends Omit<DropzoneProps, 'onDrop'> {
  allowedMediaTypes?: string[];
}

export default function FileDrop(props: Props) {
  const { allowedMediaTypes } = props;

  const dispatch = useAppDispatch();

  const account = useAppSelector(selectCurrentAccount)!;
  const verificationRequired = useAppSelector(selectFeatureVerificationRequired);

  const { openDialog } = useVerifyAccountDialog();

  const onDrop = useCallback(
    (arg: { files: FileSystemFileEntry[]; uploadTo: string }) => {
      if (verificationRequired && !account.verified) {
        openDialog();
      } else {
        dispatch(fileEntriesAdded({ ...arg, allowedMediaTypes }));
      }
    },
    [verificationRequired],
  );

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Dropzone {...props} onDrop={onDrop} />;
}
