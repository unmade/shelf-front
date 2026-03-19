import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { isFileMemberAlreadyExists, useAddFileMemberMutation } from '@/store/sharing';
import { isUserNotFound } from '@/store/users';

import { Button } from '@/ui/button';
import { Field, FieldError } from '@/ui/field';
import { Input } from '@/ui/input';

function useAddFileMember({ fileId }: { fileId: string }) {
  const { t } = useTranslation('files');

  const [error, setError] = useState<string | null>(null);
  const [addMember, { isLoading }] = useAddFileMemberMutation();

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const submit = useCallback(
    async (username: string) => {
      const trimmed = username.trim();

      if (trimmed === '') {
        setError(
          t('dialogs.fileMembers.form.errors.usernameRequired', {
            defaultValue: 'Username is required',
          }),
        );
        return;
      }

      try {
        await addMember({ fileId, username: trimmed }).unwrap();
      } catch (err) {
        if (isFileMemberAlreadyExists(err)) {
          setError(
            t('dialogs.fileMembers.form.errors.memberAlreadyExists', {
              defaultValue: 'A member with this username already exists',
            }),
          );
          return;
        }
        if (isUserNotFound(err)) {
          setError(
            t('dialogs.fileMembers.form.errors.userNotFound', {
              defaultValue: 'User not found',
            }),
          );
        }
      }
    },
    [addMember, fileId, t],
  );

  return { error, isLoading, clearError, submit };
}

interface Props {
  fileId: string;
}

export function AddFileMemberForm({ fileId }: Props) {
  const { t } = useTranslation('files');
  const { error, isLoading, clearError, submit } = useAddFileMember({ fileId });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = (formData.get('username') as string) ?? '';
    submit(username);
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="flex w-full items-start gap-2">
        <Field data-invalid={!!error}>
          <Input
            id="username"
            name="username"
            placeholder={t('dialogs.fileMembers.form.username.placeholder', {
              defaultValue: "Enter a member's username",
            })}
            onChange={clearError}
            minLength={3}
            maxLength={31}
            aria-invalid={!!error}
            autoComplete="off"
          />
          {error && <FieldError>{error}</FieldError>}
        </Field>
        <Button type="submit" variant="outline" disabled={isLoading}>
          {t('dialogs.fileMembers.form.buttons.addMember', { defaultValue: 'Add Member' })}
        </Button>
      </div>
    </form>
  );
}
