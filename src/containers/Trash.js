import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { deselectFiles, listFolder, changePath } from '../store/actions/files';
import { toggleEmptyTrashDialog } from '../store/actions/ui';

import Trash from '../components/Trash';

export default compose(
  withRouter,
  connect(
    null,
    {
      deselectFiles,
      listFolder,
      changePath,
      onEmptyTrash: toggleEmptyTrashDialog,
    },
  ),
)(Trash);
