import { connect } from 'react-redux';

import { getCurrentAccount } from '../store/reducers/accounts';

import SideBar from '../components/SideBar';

export default connect(
  (state) => ({
    currentAccount: getCurrentAccount(state),
  }),
)(SideBar);
