import { connect } from 'react-redux';

import { setUploadFilter } from '../store/actions/ui';

import { getCurrPath } from '../store/reducers/files';
import { getUploadFilter } from '../store/reducers/ui';
import { getVisibleUploads } from '../store/reducers/uploads';

import Uploader from '../components/Uploader';

export default connect(
  (state) => ({
    uploadCount: getVisibleUploads(state, getUploadFilter(state)).length,
    uploadTo: getCurrPath(state),
    visibilityFilter: getUploadFilter(state),
  }),
  {
    onSetVisibilityFilter: setUploadFilter,
  },
)(Uploader);
