import { useCallback } from 'react';

import type { UploadEntries } from '@/types/uploads';

import { useAppSelector } from '@/hooks';

import { selectCurrentAccount } from '@/store/accounts';
import { selectFeatureVerificationRequired } from '@/store/features';

import { Dropzone, type DropzoneProps } from '@/ui/dropzone';

import { useVerifyAccountDialog } from '@/components/VerifyAccountDialogProvider';

interface Props extends Omit<DropzoneProps, 'onDrop'> {
  onFilesAdded: (files: UploadEntries) => void;
}

export default function FileDrop({ onFilesAdded, ...dropzoneProps }: Props) {
  const account = useAppSelector(selectCurrentAccount)!;
  const verificationRequired = useAppSelector(selectFeatureVerificationRequired);

  const { openDialog } = useVerifyAccountDialog();

  const shouldVerify = verificationRequired && !account.verified;

  const onDrop = useCallback(
    (files: FileSystemFileEntry[]) => {
      if (shouldVerify) {
        openDialog();
      } else {
        onFilesAdded(files);
      }
    },
    [shouldVerify, onFilesAdded, openDialog],
  );

  return <Dropzone {...dropzoneProps} onDrop={onDrop} />;
}
