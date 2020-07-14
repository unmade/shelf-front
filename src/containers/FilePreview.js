import { connect } from 'react-redux';

import { deselectFiles } from '../store/actions/files';
import { getSelectedFiles } from '../store/reducers/files';

import FilePreview from '../components/FilePreview';

export default connect(
  (state) => ({
    files: getSelectedFiles(state),
  }),
  {
    onClose: deselectFiles,
  },
)(FilePreview);
