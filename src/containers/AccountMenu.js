import { connect } from 'react-redux';

import { retrieveCurrentAccount } from '../store/actions/accounts';
import { signOut } from '../store/actions/auth';

import { getCurrentAccount } from '../store/reducers/accounts';

import AccountMenu from '../components/AccountMenu';

export default connect(
  (state) => ({
    account: getCurrentAccount(state),
  }),
  {
    onSignOut: signOut,
    retrieveCurrentAccount,
  },
)(AccountMenu);
