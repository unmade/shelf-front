import { connect } from 'react-redux';

import { getUploadById } from '../store/reducers/uploads';

import UploadListItem from '../components/UploadListItem';

export default connect(
  (state, ownProps) => ({
    item: getUploadById(state, ownProps.item),
  }),
)(UploadListItem);
