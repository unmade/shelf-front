import { connect } from 'react-redux';

import { issueToken } from '../store/actions/auth';

import { getLoading } from '../store/reducers/loading';

import LoginForm from '../components/LoginForm';

export default connect(
  (state) => ({
    loading: getLoading(state, { actionType: issueToken.type }),
  }),
  {
    onSubmit: issueToken,
  }
)(LoginForm);
