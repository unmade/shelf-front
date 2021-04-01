import { connect } from 'react-redux';

import { moveFile } from '../store/actions/files';
import { scopes } from '../store/actions/loading';
import { closeRenameFileDialog } from '../store/actions/ui';

import { getFileById } from '../store/reducers/files';
import { getLoading } from '../store/reducers/loading';
import { getFileIdToRename } from '../store/reducers/ui';

import RenameFileDialog from '../components/RenameFileDialog';

export default connect(
  (state) => ({
    file: getFileIdToRename(state) && getFileById(state, getFileIdToRename(state)),
    loading: getLoading(state, scopes.movingFile),
  }),
  {
    onRename: moveFile,
    onCancel: closeRenameFileDialog,
  },
)(RenameFileDialog);
