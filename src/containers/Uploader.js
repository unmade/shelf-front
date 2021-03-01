import { connect } from 'react-redux';

import { getCurrPath } from '../store/reducers/files';
import { getUploads } from '../store/reducers/uploads';

import Uploader from '../components/Uploader';

export default connect(
  (state) => ({
    uploadCount: getUploads(state).length,
    uploadTo: getCurrPath(state),
  }),
)(Uploader);
