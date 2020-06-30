import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Login from '../components/Login';
import { signIn } from '../store/auth/actions';


const mapStateToProps = (state) => ({
  auth: state.auth,
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
