import { connect } from 'react-redux';

import { getFileById, getFilesByPath } from '../store/reducers/files';

import FilePreview from '../components/FilePreview';

export default connect(
  (state, ownProps) => ({
    files: getFilesByPath(state, ownProps.path).map((fileId) => getFileById(state, fileId)),
  }),
)(FilePreview);
