import { connect } from 'react-redux';

import { moveToTrash } from '../store/actions/files';
import { closeDeleteDialog } from '../store/actions/ui';

import { getFileById } from '../store/reducers/files';
import { getFileIdToDelete } from '../store/reducers/ui';

import DeleteDialog from '../components/DeleteDialog';

export default connect(
  (state) => ({
    item: getFileIdToDelete(state) && getFileById(state, getFileIdToDelete(state)),
  }),
  {
    onConfirm: moveToTrash,
    onCancel: closeDeleteDialog,
  },
)(DeleteDialog);
