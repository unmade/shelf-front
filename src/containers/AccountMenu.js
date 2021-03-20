import { connect } from 'react-redux';

import { retrieveMe, signOut } from '../store/actions/auth';

import { getMe } from '../store/reducers/auth';

import AccountMenu from '../components/AccountMenu';

export default connect(
  (state) => ({
    me: getMe(state),
  }),
  {
    onSignOut: signOut,
    retrieveMe,
  },
)(AccountMenu);
