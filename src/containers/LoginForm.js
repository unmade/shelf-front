import { connect } from 'react-redux';

import { signIn } from '../store/actions/auth';
import { scopes } from '../store/actions/loading';

import { getLoading } from '../store/reducers/loading';

import LoginForm from '../components/LoginForm';

export default connect(
  (state) => ({
    loading: getLoading(state, scopes.signingIn),
  }),
  {
    onSubmit: signIn,
  },
)(LoginForm);
