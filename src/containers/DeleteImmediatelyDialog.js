import { connect } from 'react-redux';

import { deleteImmediately } from '../store/actions/files';
import { closeDeleteImmediatelyDialog } from '../store/actions/ui';

import { getFileById } from '../store/reducers/files';
import { getFileIdToDeleteImmediately } from '../store/reducers/ui';

import DeleteImmediatelyDialog from '../components/DeleteImmediatelyDialog';

export default connect(
  (state) => ({
    file: getFileIdToDeleteImmediately(state) && getFileById(state, getFileIdToDeleteImmediately(state)),
  }),
  {
    onDelete: deleteImmediately,
    onCancel: closeDeleteImmediatelyDialog,
  },
)(DeleteImmediatelyDialog);
