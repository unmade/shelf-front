import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from 'hooks';

import { selectCurrentAccount } from 'store/accounts';
import { selectFeatureVerificationRequired } from 'store/features';
import { fileEntriesAdded } from 'store/uploads/slice';

import type { DropzoneProps } from './ui/Dropzone';
import Dropzone from './ui/Dropzone';

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

  const shouldVerify = verificationRequired && !account.verified;

  const onDrop = useCallback(
    (arg: { files: FileSystemFileEntry[]; uploadTo: string }) => {
      if (shouldVerify) {
        openDialog();
      } else {
        dispatch(fileEntriesAdded({ ...arg, allowedMediaTypes }));
      }
    },
    [shouldVerify, allowedMediaTypes, dispatch, openDialog],
  );

  return <Dropzone {...props} onDrop={onDrop} />;
}
