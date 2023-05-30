import React from 'react';

import { useTranslation } from 'react-i18next';

import { useAddMemberMutation, useListMembersQuery } from '../../store/sharing';

import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Input from '../ui/Input';
import InputGroup from '../ui/InputGroup';

function ShareMemberItem({ fileId, memberId }) {
  const { member } = useListMembersQuery(fileId, {
    selectFromResult: ({ data }) => ({ member: data.entities[memberId] }),
  });
  const { display_name: displayName } = member;

  return (
    <div className="py-3 flex items-center justify-between text-sm font-medium">
      <div className="flex items-center mr-2">
        <Avatar username={displayName} className="w-9 h-9" />
        <p className="ml-2">{displayName}</p>
      </div>
      <div>
        <p>can edit</p>
      </div>
    </div>
  );
}

function ShareMembers({ fileId }) {
  const { ids } = useListMembersQuery(fileId, {
    selectFromResult: ({ data, isFetching }) => ({ ids: data?.ids, isFetching }),
  });

  return (
    <div className="mt-3 divide-y divide-gray-100 dark:divide-zinc-700">
      {ids?.map((memberId) => (
        <ShareMemberItem key={memberId} fileId={fileId} memberId={memberId} />
      ))}
    </div>
  );
}

function AddMemberForm({ fileId }) {
  const { t } = useTranslation(['translation']);

  const [username, setUsername] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [addMember, { isLoading: loading }] = useAddMemberMutation();

  const onUsernameChange = (event) => {
    setUsername(event.target.value);
    if (error != null) {
      setError(null);
    }
  };

  const isValid = () => {
    if (username == null || username === '') {
      setError(t('This field is required'));
      return false;
    }

    if (username?.length < 3) {
      setError(t('signup:weakUsername'));
      return false;
    }

    if (username?.length > 31) {
      setError(t('signup:usernameTooLong', { minLength: 3, maxLength: 31 }));
      return false;
    }

    return true;
  };

  const submit = () => {
    if (isValid()) {
      addMember({ fileId, username });
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      <InputGroup error={error}>
        <Input
          id="username"
          name="username"
          placeholder={t('Enter a username')}
          size="sm"
          onChange={onUsernameChange}
        />
        <Button type="submit" variant="primary" color="success" loading={loading} onClick={submit}>
          {t('Share')}
        </Button>
      </InputGroup>
    </form>
  );
}

function ShareSetting({ fileId }) {
  return (
    <>
      <div>
        <p className="mt-6 mb-1 text-sm font-semibold">Share with members</p>
      </div>
      <div>
        <AddMemberForm fileId={fileId} />
      </div>

      <ShareMembers fileId={fileId} />
    </>
  );
}

export default ShareSetting;
