import { connect } from 'react-redux';
import AccountMenu from '../components/AccountMenu';
import { accountMe } from '../store/actions/accounts';
import { getUsername } from '../store/reducers/accounts';

export default connect(
  (state) => ({
    username: getUsername(state),
  }),
  { accountMe },
)(AccountMenu);
