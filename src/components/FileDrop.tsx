import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from 'hooks';

import { selectCurrentAccount } from 'store/accounts';
import { selectFeatureVerificationRequired } from 'store/features';
import { fileEntriesAdded } from 'store/uploads/slice';

import { Dropzone, type DropzoneProps } from '@/ui/dropzone';

import { useVerifyAccountDialog } from 'components/VerifyAccountDialogProvider';

interface Props extends Omit<DropzoneProps, 'onDrop'> {
  allowedMediaTypes?: string[];
  uploadTo: string;
}

export default function FileDrop({ allowedMediaTypes, uploadTo, ...dropzoneProps }: Props) {
  const dispatch = useAppDispatch();

  const account = useAppSelector(selectCurrentAccount)!;
  const verificationRequired = useAppSelector(selectFeatureVerificationRequired);

  const { openDialog } = useVerifyAccountDialog();

  const shouldVerify = verificationRequired && !account.verified;

  const onDrop = useCallback(
    (files: FileSystemFileEntry[]) => {
      if (shouldVerify) {
        openDialog();
      } else {
        dispatch(fileEntriesAdded({ files, uploadTo, allowedMediaTypes }));
      }
    },
    [shouldVerify, uploadTo, allowedMediaTypes, dispatch, openDialog],
  );

  return <Dropzone {...dropzoneProps} onDrop={onDrop} />;
}
