import type React from 'react';
import { useRef } from 'react';

import { useAppDispatch, useAppSelector } from 'hooks';

import { selectCurrentAccount } from 'store/accounts';
import { selectFeatureVerificationRequired } from 'store/features';
import { fileEntriesAdded } from 'store/uploads/slice';

import { Button } from '@/ui/button';

import { useVerifyAccountDialog } from 'components/VerifyAccountDialogProvider';

interface Props {
  allowedMediaTypes?: string[];
  children: React.ReactNode;
  className?: string;
  uploadTo: string;
}

export default function UploadButton({ allowedMediaTypes, children, className, uploadTo }: Props) {
  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const account = useAppSelector(selectCurrentAccount)!;
  const verificationRequired = useAppSelector(selectFeatureVerificationRequired);

  const { openDialog } = useVerifyAccountDialog();

  const openUpload = (event: React.FormEvent) => {
    event.preventDefault();
    if (verificationRequired && !account.verified) {
      openDialog();
    } else {
      inputRef.current?.click();
    }
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
      <Button className={className} onClick={openUpload}>
        {children}
      </Button>
    </form>
  );
}
