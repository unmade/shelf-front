import { connect } from 'react-redux';

import { uploadsCleared } from '../../store/actions/uploads';
import { uploaderFilterChanged } from '../../store/actions/ui';

import { getUploadFilter } from '../../store/reducers/ui';
import { getVisibleUploads } from '../../store/reducers/uploads';

import RecentUploads from '../../components/Uploader/RecentUploads';

export default connect(
  (state) => ({
    uploadCount: getVisibleUploads(state, { filter: getUploadFilter(state) }).length,
    visibilityFilter: getUploadFilter(state),
  }),
  {
    onClear: uploadsCleared,
    onSetVisibilityFilter: uploaderFilterChanged,
  }
)(RecentUploads);
