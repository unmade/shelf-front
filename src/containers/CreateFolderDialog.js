import { connect } from 'react-redux';

import { createFolder } from '../store/actions/files';
import { scopes } from '../store/actions/loading';
import { toggleCreateFolderDialogVisible } from '../store/actions/ui';

import { getCurrPath } from '../store/reducers/files';
import { getLoading } from '../store/reducers/loading';
import { getCreateFolderDialogVisible } from '../store/reducers/ui';

import CreateFolderDialog from '../components/CreateFolderDialog';

export default connect(
  (state) => ({
    loading: getLoading(state, scopes.creatingFolder),
    path: getCurrPath(state),
    visible: getCreateFolderDialogVisible(state),
  }),
  {
    onCreate: createFolder,
    onCancel: toggleCreateFolderDialogVisible,
  },
)(CreateFolderDialog);
