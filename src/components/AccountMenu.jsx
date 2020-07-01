import React from 'react';
import PropTypes from 'prop-types';


class AccountMenu extends React.Component {
  componentDidMount() {
    const { username, retrieveUser } = this.props;
    if (!username) {
      retrieveUser();
    }
  }

  render() {
    const { username } = this.props;

    return (
      <div className="flex flex-row space-x-2 items-center">
        <div
          className="rounded-full h-10 w-10 bg-orange-100 flex items-center justify-center border border-red-200 text-orange-600"
        >
          A
        </div>
        <div className="flex flex-col flex-1">
          <div className="text-sm font-bold">
            {username}
          </div>
          <div className="text-xs text-gray-600">
            @{username}
          </div>
        </div>
      </div>
    );
  }
}

AccountMenu.propTypes = {
  username: PropTypes.string,
};

export default AccountMenu;
