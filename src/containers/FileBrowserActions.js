import { connect } from 'react-redux';

import { toggleCreateFolderShown } from '../store/actions/ui';

import FileBrowserActions from '../components/FileBrowserActions';

export default connect(
  null,
  {
    onCreateFolder: toggleCreateFolderShown,
  },
)(FileBrowserActions);
