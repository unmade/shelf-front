import { connect } from 'react-redux';

import { getUploads } from '../store/reducers/uploads';

import UploadList from '../components/UploadList';

export default connect(
  (state) => ({
    uploads: getUploads(state),
  }),
)(UploadList);
