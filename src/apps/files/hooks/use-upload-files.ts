import { useCallback, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks';

import { selectCurrentAccount } from '@/store/accounts';
import { selectFeatureVerificationRequired } from '@/store/features';
import { fileEntriesAdded } from '@/store/uploads/slice';

import { useVerifyAccountDialog } from '@/components/VerifyAccountDialogProvider';

interface UseUploadFilesProps {
  allowedMediaTypes?: string[];
  uploadTo: string;
}

export function useUploadFiles({ allowedMediaTypes, uploadTo }: UseUploadFilesProps) {
  const dispatch = useAppDispatch();
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
      dispatch(fileEntriesAdded({ allowedMediaTypes, files, uploadTo }));
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    },
    [dispatch, allowedMediaTypes, uploadTo],
  );

  const fileInputProps = {
    ref: inputRef,
    type: 'file' as const,
    accept: allowedMediaTypes?.join(','),
    className: 'hidden',
    multiple: true,
    onChange: handleChange,
  };

  return { triggerUpload, fileInputProps };
}
