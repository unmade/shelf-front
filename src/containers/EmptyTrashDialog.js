import { connect } from 'react-redux';

import { getEmptyTrashDialogVisible } from '../store/reducers/ui';

import EmptyTrashDialog from '../components/EmptyTrashDialog';
import { emptyTrash } from '../store/actions/files';
import { toggleEmptyTrashDialog } from '../store/actions/ui';

export default connect(
  (state) => ({
    visible: getEmptyTrashDialogVisible(state),
  }),
  {
    onEmpty: emptyTrash,
    onCancel: toggleEmptyTrashDialog,
  },
)(EmptyTrashDialog);
