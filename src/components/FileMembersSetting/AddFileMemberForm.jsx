import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { isFileMemberAlreadyExists, useAddFileMemberMutation } from '@/store/sharing';
import { isUserNotFound } from '@/store/users';

import { Button } from '@/ui/button';
import { Field, FieldError } from '@/ui/field';
import { Input } from '@/ui/input';

function AddFileMemberForm({ fileId }) {
  const { t } = useTranslation('files');

  const [error, setError] = useState(null);
  const [addMember, { isLoading: loading }] = useAddFileMemberMutation();

  const onUsernameChange = () => {
    if (error != null) {
      setError(null);
    }
  };

  const isValid = (username) => {
    if (username == null || username === '') {
      setError(
        t('sharing.addMember.errors.usernameRequired', { defaultValue: 'Username is required' }),
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const username = (formData.get('username') ?? '').trim();

    if (!isValid(username)) {
      return;
    }

    try {
      await addMember({ fileId, username }).unwrap();
    } catch (err) {
      if (isFileMemberAlreadyExists(err)) {
        setError(
          t('sharing.addMember.errors.memberAlreadyExists', {
            defaultValue: 'A member with this username already exists',
          }),
        );
        return;
      }
      if (isUserNotFound(err)) {
        setError(
          t('sharing.addMember.errors.userNotFound', {
            defaultValue: 'User not found',
          }),
        );
        return;
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="flex w-full items-start gap-2">
        <Field data-invalid={!!error}>
          <Input
            id="username"
            name="username"
            placeholder={t('sharing.addMember.placeholders.username', {
              defaultValue: "Enter a member's username",
            })}
            onChange={onUsernameChange}
            minLength={3}
            maxLength={31}
            aria-invalid={!!error}
            autoComplete="off"
          />
          {error && <FieldError>{error}</FieldError>}
        </Field>
        <Button type="submit" variant="outline" disabled={loading}>
          {t('sharing.addMember.buttons.addMember', { defaultValue: 'Add Member' })}
        </Button>
      </div>
    </form>
  );
}

export default AddFileMemberForm;
