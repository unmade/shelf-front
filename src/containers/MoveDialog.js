import { connect } from 'react-redux';

import { moveFile } from '../store/actions/files';
import { closeMoveDialog } from '../store/actions/ui';

import { getFileById } from '../store/reducers/files';
import { getFileIdToMove } from '../store/reducers/ui';

import MoveDialog from '../components/MoveDialog';

export default connect(
  (state) => ({
    file: getFileIdToMove(state) && getFileById(state, getFileIdToMove(state)),
  }),
  {
    onMove: moveFile,
    onCancel: closeMoveDialog,
  },
)(MoveDialog);
