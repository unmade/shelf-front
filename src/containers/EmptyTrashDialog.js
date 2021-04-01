import { connect } from 'react-redux';

import { emptyTrash } from '../store/actions/files';
import { scopes } from '../store/actions/loading';
import { toggleEmptyTrashDialog } from '../store/actions/ui';

import { getLoading } from '../store/reducers/loading';
import { getEmptyTrashDialogVisible } from '../store/reducers/ui';

import EmptyTrashDialog from '../components/EmptyTrashDialog';

export default connect(
  (state) => ({
    loading: getLoading(state, scopes.emptyingTrash),
    visible: getEmptyTrashDialogVisible(state),
  }),
  {
    onEmpty: emptyTrash,
    onCancel: toggleEmptyTrashDialog,
  },
)(EmptyTrashDialog);
