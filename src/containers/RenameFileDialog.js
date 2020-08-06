import { connect } from 'react-redux';

import { moveFile } from '../store/actions/files';
import { closeRenameFileDialog } from '../store/actions/ui';

import { getFileById } from '../store/reducers/files';
import { getFileIdToRename } from '../store/reducers/ui';

import RenameFileDialog from '../components/RenameFileDialog';

export default connect(
  (state) => ({
    file: getFileIdToRename(state) && getFileById(state, getFileIdToRename(state)),
  }),
  {
    onRename: moveFile,
    onCancel: closeRenameFileDialog,
  },
)(RenameFileDialog);
