import { connect } from 'react-redux';

import { removeMessage } from '../store/actions/messages';

import { getMessageById } from '../store/reducers/messages';

import ToastItem from '../components/ui/ToastItem';

export default connect(
  (state, ownProps) => ({
    message: getMessageById(state, ownProps),
  }),
  {
    onClose: removeMessage,
  }
)(ToastItem);
