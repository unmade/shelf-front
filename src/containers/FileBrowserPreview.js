import { connect } from 'react-redux';

import { getSelectedFiles } from '../store/reducers/files';

import FileBrowserPreview from '../components/FileBrowserPreview';

export default connect(
  (state) => ({
    files: getSelectedFiles(state),
  }),
)(FileBrowserPreview);
