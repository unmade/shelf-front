import { connect } from 'react-redux';

import { moveFile } from '../store/actions/files';
import { scopes } from '../store/actions/loading';
import { closeMoveDialog } from '../store/actions/ui';

import { getFileById } from '../store/reducers/files';
import { getLoading } from '../store/reducers/loading';
import { getFileIdToMove } from '../store/reducers/ui';

import MoveDialog from '../components/MoveDialog';

export default connect(
  (state) => ({
    file: getFileIdToMove(state) && getFileById(state, getFileIdToMove(state)),
    loading: getLoading(state, scopes.movingFile),
  }),
  {
    onMove: moveFile,
    onCancel: closeMoveDialog,
  },
)(MoveDialog);
