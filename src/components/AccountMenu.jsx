import React from 'react';


class AccountMenu extends React.Component {
  componentDidMount() {
    const { account, tokens, retrieveAccMe } = this.props;
    if (!account) {
      retrieveAccMe({ token: tokens.access });
    }
  }

  render() {
    const { account } = this.props;
    return (
      <div className="flex flex-row space-x-2 items-center">
        <div
          className="rounded-full h-10 w-10 bg-orange-100 flex items-center justify-center border border-red-200 text-orange-600"
        >
          A
        </div>
        <div className="flex flex-col flex-1">
          <div className="text-sm font-bold">
            {account && account.username}
          </div>
          <div className="text-xs text-gray-600">
            @{account && account.username}
          </div>
        </div>
      </div>
    );
  }
}

export default AccountMenu;
