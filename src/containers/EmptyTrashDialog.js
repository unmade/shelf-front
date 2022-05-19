import { connect } from 'react-redux';

import { emptyTrash } from '../store/actions/files';
import { scopes } from '../store/actions/loading';
import { closeDialog } from '../store/actions/ui';

import { getLoadingDeprecated } from '../store/reducers/loading';
import { getFileDialogVisible } from '../store/reducers/ui';

import EmptyTrashDialog from '../components/EmptyTrashDialog';

export default connect(
  (state, ownProps) => ({
    loading: getLoadingDeprecated(state, scopes.emptyingTrash),
    visible: getFileDialogVisible(state, ownProps),
  }),
  {
    onEmpty: emptyTrash,
    onCancel: closeDialog,
  }
)(EmptyTrashDialog);
