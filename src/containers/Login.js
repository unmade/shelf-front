import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Login from '../components/Login';
import { signIn } from '../store/actions/auth';
import { getIsAuthenticated, getIsLoading } from '../store/reducers/auth';

export default compose(
  withRouter,
  connect(
    (state) => ({
      authenticated: getIsAuthenticated(state),
      loading: getIsLoading(state),
    }),
    (dispatch) => ({
      onSubmit: (username, password) => dispatch(signIn({ username, password })),
    }),
  ),
)(Login);
