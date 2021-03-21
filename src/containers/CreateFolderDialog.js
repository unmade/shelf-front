import { connect } from 'react-redux';

import { createFolder } from '../store/actions/files';
import { toggleCreateFolderDialogVisible } from '../store/actions/ui';
import { getCurrPath } from '../store/reducers/files';
import { getCreateFolderDialogVisible } from '../store/reducers/ui';

import CreateFolderDialog from '../components/CreateFolderDialog';

export default connect(
  (state) => ({
    visible: getCreateFolderDialogVisible(state),
    path: getCurrPath(state),
  }),
  {
    onCreate: createFolder,
    onCancel: toggleCreateFolderDialogVisible,
  },
)(CreateFolderDialog);
