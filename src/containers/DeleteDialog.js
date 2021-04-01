import { connect } from 'react-redux';

import { moveToTrash } from '../store/actions/files';
import { scopes } from '../store/actions/loading';
import { closeDeleteDialog } from '../store/actions/ui';

import { getFileById } from '../store/reducers/files';
import { getLoading } from '../store/reducers/loading';
import { getFileIdToDelete } from '../store/reducers/ui';

import DeleteDialog from '../components/DeleteDialog';

export default connect(
  (state) => ({
    file: getFileIdToDelete(state) && getFileById(state, getFileIdToDelete(state)),
    loading: getLoading(state, scopes.movingToTrash),
  }),
  {
    onDelete: moveToTrash,
    onCancel: closeDeleteDialog,
  },
)(DeleteDialog);
