import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import { useAddFileMemberMutation } from '../../store/sharing';

import Button from '../ui/Button';
import Input from '../ui/Input';
import InputGroup from '../ui/InputGroup';

function AddFileMemberForm({ fileId }) {
  const { t } = useTranslation(['translation', 'signup']);

  const [username, setUsername] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [addMember, { isLoading: loading }] = useAddFileMemberMutation();

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

AddFileMemberForm.propTypes = {
  fileId: PropTypes.string.isRequired,
};

export default AddFileMemberForm;
