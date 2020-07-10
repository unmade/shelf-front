import { connect } from 'react-redux';

import { uploadFile } from '../store/actions/uploads';
import { getUploads } from '../store/reducers/uploads';

import Uploader from '../components/Uploader';

export default connect(
  (state) => ({
    uploads: getUploads(state),
  }),
  { uploadFile },
)(Uploader);
