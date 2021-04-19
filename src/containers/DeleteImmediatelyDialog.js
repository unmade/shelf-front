import { connect } from 'react-redux';

import { deleteImmediately } from '../store/actions/files';
import { scopes } from '../store/actions/loading';
import { closeDialog } from '../store/actions/ui';

import { getFileById } from '../store/reducers/files';
import { getLoading } from '../store/reducers/loading';
import { getFileDialogProps, getFileDialogVisible } from '../store/reducers/ui';

import DeleteImmediatelyDialog from '../components/DeleteImmediatelyDialog';

export default connect(
  (state, ownProps) => ({
    visible: getFileDialogVisible(state, ownProps),
    file: getFileDialogProps(state, ownProps).fileId
      && getFileById(state, getFileDialogProps(state, ownProps).fileId),
    loading: getLoading(state, scopes.deletingFileImmediately),
  }),
  {
    onDelete: deleteImmediately,
    onCancel: closeDialog,
  },
)(DeleteImmediatelyDialog);
