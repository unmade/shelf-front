import React, { useRef } from 'react';

import { useAppDispatch, useAppSelector } from 'hooks';

import { selectCurrentAccount } from 'store/accounts';
import { selectFeatureVerificationRequired } from 'store/features';
import { fileEntriesAdded } from 'store/uploads/slice';

import Button from 'components/ui/Button';

import { useVerifyAccountDialog } from 'components/VerifyAccountDialogProvider';

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
      <Button variant="primary" size={size} icon={icon} onClick={openUpload} full={full}>
        {children}
      </Button>
    </form>
  );
}
