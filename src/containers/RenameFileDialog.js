import { connect } from 'react-redux';

import { closeRenameFileDialog } from '../store/actions/ui';
import { getFileById } from '../store/reducers/files';
import { getFileIdToRename } from '../store/reducers/ui';

import RenameFileDialog from '../components/RenameFileDialog';

export default connect(
  (state) => ({
    file: getFileIdToRename(state) && getFileById(state, getFileIdToRename(state)),
  }),
  {
    onCancel: closeRenameFileDialog,
  },
)(RenameFileDialog);
