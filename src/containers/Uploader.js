import { connect } from 'react-redux';

import { uploadFile } from '../store/actions/files';

import Uploader from '../components/Uploader';

export default connect(
  (state) => ({
    files: Object.values(state.uploadFiles.data),
  }),
  { uploadFile },
)(Uploader);
