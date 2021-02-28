import { connect } from 'react-redux';

import { getUploads } from '../store/reducers/uploads';

import Uploader from '../components/Uploader';

export default connect(
  (state) => ({
    uploadCount: getUploads(state).length,
  }),
)(Uploader);
