import { connect } from 'react-redux';

import { retrieveMe } from '../store/actions/auth';

import { getMe } from '../store/reducers/auth';

import AccountMenu from '../components/AccountMenu';

export default connect(
  (state) => ({
    me: getMe(state),
  }),
  {
    retrieveMe,
  },
)(AccountMenu);
