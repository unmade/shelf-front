import { connect } from 'react-redux';

import { createFolder } from '../store/actions/files';
import { closeDialog } from '../store/actions/ui';

import { getLoading } from '../store/reducers/loading';
import { getCurrentPath, getFileDialogVisible } from '../store/reducers/ui';

import CreateFolderDialog from '../components/CreateFolderDialog';

export default connect(
  (state, ownProps) => ({
    loading: getLoading(state, { actionType: createFolder }),
    path: getCurrentPath(state),
    visible: getFileDialogVisible(state, ownProps),
  }),
  {
    onCreate: createFolder,
    onCancel: closeDialog,
  }
)(CreateFolderDialog);
