import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';

import Button from './ui/Button';

function AccountMenu({ me, onSignOut, retrieveMe }) {
  React.useEffect(() => {
    if (me === null) {
      retrieveMe();
    }
  }, [me, retrieveMe]);

  if (me === null) {
    return null;
  }

  const { username } = me;

  return (
    <div className="flex flex-row space-x-2 items-center">
      <div
        className="rounded-full h-10 w-10 bg-orange-100 flex items-center justify-center border border-red-200 text-orange-600"
      >
        {username.substring(0, 1).toUpperCase()}
      </div>
      <div className="text-left flex flex-col flex-1">
        <div className="text-sm font-semibold text-gray-700">
          {username}
        </div>
        <div className="text-xs text-gray-600">
          {`@${username}`}
        </div>
      </div>
      <Button
        type="text"
        title="Sign Out"
        icon={<icons.LogOut />}
        onClick={onSignOut}
      />
    </div>
  );
}

AccountMenu.propTypes = {
  me: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
  onSignOut: PropTypes.func.isRequired,
  retrieveMe: PropTypes.func.isRequired,
};

AccountMenu.defaultProps = {
  me: null,
};

export default AccountMenu;
