import { connect } from 'react-redux';

import { performDownload } from '../store/actions/files';
import { openDialog } from '../store/actions/ui';

import FilePreviewActions from '../components/FilePreviewActions';

export default connect(
  null,
  {
    onDownload: performDownload,
    openDialog,
  },
)(FilePreviewActions);
