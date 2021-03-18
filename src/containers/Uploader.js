import { connect } from 'react-redux';

import { getCurrPath } from '../store/reducers/files';

import Uploader from '../components/Uploader';

export default connect(
  (state) => ({
    uploadTo: getCurrPath(state),
  }),
)(Uploader);
