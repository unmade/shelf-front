import { connect } from 'react-redux';

import { signIn } from '../store/actions/auth';

import { getIsLoading } from '../store/reducers/auth';

import LoginForm from '../components/LoginForm';

export default connect(
  (state) => ({
    loading: getIsLoading(state),
  }),
  {
    onSubmit: signIn,
  },
)(LoginForm);
