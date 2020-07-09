import { connect } from 'react-redux';

import { uploadFile } from '../store/files/actions';

import Uploader from '../components/Uploader';

export default connect(
  (state) => ({
    files: Object.values(state.uploadFiles.data),
  }),
  { uploadFile },
)(Uploader);
