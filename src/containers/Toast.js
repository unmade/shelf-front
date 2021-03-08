import { connect } from 'react-redux';

import { getAllMessages } from '../store/reducers/messages';

import Toast from '../components/ui/Toast';

export default connect(
  (state) => ({
    messages: getAllMessages(state),
  }),
)(Toast);
