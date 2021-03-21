import { connect } from 'react-redux';

import { toggleCreateFolderDialogVisible } from '../store/actions/ui';

import FileBrowserActions from '../components/FileBrowserActions';

export default connect(
  null,
  {
    onCreateFolder: toggleCreateFolderDialogVisible,
  },
)(FileBrowserActions);
