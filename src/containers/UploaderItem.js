import { connect } from 'react-redux';

import { getUploadById } from '../store/reducers/uploads';

import UploaderItem from '../components/UploaderItem';

export default connect(
  (state, ownProps) => ({
    item: getUploadById(state, ownProps.uniqueKey),
  }),
)(UploaderItem);
