import { connect } from 'react-redux';

import { createFolder } from '../store/actions/files';
import { toggleCreateFolderShown } from '../store/actions/ui';
import { getCurrPath } from '../store/reducers/files';
import { getCreateFolderShown } from '../store/reducers/ui';

import CreateFolderDialog from '../components/CreateFolderDialog';

export default connect(
  (state) => ({
    visible: getCreateFolderShown(state),
    parentFolderPath: getCurrPath(state),
  }),
  {
    onCreate: createFolder,
    onCancel: toggleCreateFolderShown,
  },
)(CreateFolderDialog);
