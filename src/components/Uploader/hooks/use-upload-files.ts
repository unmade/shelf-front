import { useCallback, useRef } from 'react';

import type { UploadEntries } from '@/types/uploads';

import { useAppSelector } from '@/hooks';

import { selectCurrentAccount } from '@/store/accounts';
import { selectFeatureVerificationRequired } from '@/store/features';

import { useVerifyAccountDialog } from '@/components/VerifyAccountDialogProvider';

interface UseUploadFilesProps {
  onFilesAdded: (files: UploadEntries) => void;
}

export function useUploadFiles({ onFilesAdded }: UseUploadFilesProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const account = useAppSelector(selectCurrentAccount)!;
  const verificationRequired = useAppSelector(selectFeatureVerificationRequired);

  const { openDialog } = useVerifyAccountDialog();

  const triggerUpload = useCallback(() => {
    if (verificationRequired && !account.verified) {
      openDialog();
    } else {
      inputRef.current?.click();
    }
  }, [verificationRequired, account.verified, openDialog]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = [...(event.target.files ?? [])];
      onFilesAdded(files);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    },
    [onFilesAdded],
  );

  const fileInputProps = {
    ref: inputRef,
    type: 'file' as const,
    className: 'hidden',
    multiple: true,
    onChange: handleChange,
  };

  return { triggerUpload, fileInputProps };
}
