import { connect } from 'react-redux';

import { deleteImmediately } from '../store/actions/files';
import { scopes } from '../store/actions/loading';
import { closeDeleteImmediatelyDialog } from '../store/actions/ui';

import { getFileById } from '../store/reducers/files';
import { getLoading } from '../store/reducers/loading';
import { getFileIdToDeleteImmediately } from '../store/reducers/ui';

import DeleteImmediatelyDialog from '../components/DeleteImmediatelyDialog';

export default connect(
  (state) => ({
    file: getFileIdToDeleteImmediately(state) && getFileById(state, getFileIdToDeleteImmediately(state)),
    loading: getLoading(state, scopes.deletingFileImmediately),
  }),
  {
    onDelete: deleteImmediately,
    onCancel: closeDeleteImmediatelyDialog,
  },
)(DeleteImmediatelyDialog);
