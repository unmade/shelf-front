import { connect } from 'react-redux';

import { openRenameFileDialog, openDeleteDialog } from '../store/actions/ui';

import FileActions from '../components/FileActions';

export default connect(
  null,
  {
    onRename: openRenameFileDialog,
    onDelete: openDeleteDialog,
  },
)(FileActions);
