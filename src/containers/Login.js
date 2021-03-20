import { connect } from 'react-redux';

import { getIsAuthenticated } from '../store/reducers/auth';

import Login from '../components/Login';

export default connect(
  (state) => ({
    authenticated: getIsAuthenticated(state),
  }),
)(Login);
