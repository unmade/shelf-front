import { connect } from 'react-redux';

import { createFolder } from '../store/actions/files';
import { scopes } from '../store/actions/loading';
import { closeDialog } from '../store/actions/ui';

import { getLoadingDeprecated } from '../store/reducers/loading';
import { getCurrentPath, getFileDialogVisible } from '../store/reducers/ui';

import CreateFolderDialog from '../components/CreateFolderDialog';

export default connect(
  (state, ownProps) => ({
    loading: getLoadingDeprecated(state, scopes.creatingFolder),
    path: getCurrentPath(state),
    visible: getFileDialogVisible(state, ownProps),
  }),
  {
    onCreate: createFolder,
    onCancel: closeDialog,
  }
)(CreateFolderDialog);
