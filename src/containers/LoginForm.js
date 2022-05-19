import { connect } from 'react-redux';

import { issueToken } from '../store/actions/auth';

import { selectLoading } from '../store/reducers/loading';

import LoginForm from '../components/LoginForm';

export default connect(
  (state) => ({
    loading: selectLoading(state, { actionType: issueToken.type }),
  }),
  {
    onSubmit: issueToken,
  }
)(LoginForm);
