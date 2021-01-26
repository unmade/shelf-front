import { connect } from 'react-redux';

import { openRenameFileDialog, openDeleteDialog, openMoveDialog } from '../store/actions/ui';
import { performDownload } from '../store/actions/files';

import FileActions from '../components/FileActions';

export default connect(
  null,
  {
    onDelete: openDeleteDialog,
    onMove: openMoveDialog,
    onRename: openRenameFileDialog,
    onDownload: performDownload,
  },
)(FileActions);
