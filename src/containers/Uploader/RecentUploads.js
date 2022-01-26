import { connect } from 'react-redux';

import { clearUploads } from '../../store/actions/uploads';
import { setUploadFilter } from '../../store/actions/ui';

import { getUploadFilter } from '../../store/reducers/ui';
import { getVisibleUploads } from '../../store/reducers/uploads';

import RecentUploads from '../../components/Uploader/RecentUploads';

export default connect(
  (state) => ({
    uploadCount: getVisibleUploads(state, getUploadFilter(state)).length,
    visibilityFilter: getUploadFilter(state),
  }),
  {
    onClear: clearUploads,
    onSetVisibilityFilter: setUploadFilter,
  }
)(RecentUploads);
