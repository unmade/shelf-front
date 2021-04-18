import { connect } from 'react-redux';

import {
  openDeleteDialog,
  openDeleteImmediatelyDialog,
  openMoveDialog,
  openRenameFileDialog,
} from '../store/actions/ui';
import { performDownload } from '../store/actions/files';

import FileTableCellActions from '../components/FileTableCellActions';

export default connect(
  null,
  {
    onDelete: openDeleteDialog,
    onDeleteImmediately: openDeleteImmediatelyDialog,
    onDownload: performDownload,
    onMove: openMoveDialog,
    onRename: openRenameFileDialog,
  },
)(FileTableCellActions);
