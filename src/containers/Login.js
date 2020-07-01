import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Login from '../components/Login';
import { signIn } from '../store/auth/actions';
import { getErrorMessage, isAuthenticated, isLoading } from '../store/auth/selectors';


const mapStateToProps = (state) => ({
  authenticated: isAuthenticated(state),
  loading: isLoading(state),
  errorMessage: getErrorMessage(state),
});


const mapDispatchToProps = (dispatch) => ({
  onSubmit: (username, password) => dispatch(signIn({ username, password })),
});


export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
)(Login);
