import { connect } from 'react-redux';

import { getFileById } from '../store/reducers/files';

import FilePreview from '../components/FilePreview';

export default connect(
  (state) => ({
    file: getFileById(state, 4),
  }),
)(FilePreview);
