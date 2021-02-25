import { connect } from 'react-redux';

import { openRenameFileDialog, openDeleteDialog, openMoveDialog } from '../store/actions/ui';
import { performDownload } from '../store/actions/files';

import FilePreviewActions from '../components/FilePreviewActions';

export default connect(
  null,
  {
    onDelete: openDeleteDialog,
    onDownload: performDownload,
    onMove: openMoveDialog,
    onRename: openRenameFileDialog,
  },
)(FilePreviewActions);
