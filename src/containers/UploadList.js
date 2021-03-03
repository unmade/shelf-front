import { connect } from 'react-redux';

import { getUploadFilter } from '../store/reducers/ui';
import { getVisibleUploads } from '../store/reducers/uploads';

import UploadList from '../components/UploadList';

export default connect(
  (state) => ({
    uploads: getVisibleUploads(state, getUploadFilter(state)),
  }),
)(UploadList);
