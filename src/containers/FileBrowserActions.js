import { connect } from 'react-redux';

import { toggleCreateFolderShown } from '../store/actions/ui';
import { getHasUploads } from '../store/reducers/uploads';

import FileBrowserActions from '../components/FileBrowserActions';

export default connect(
  (state) => ({
    hasUploads: getHasUploads(state),
  }),
  {
    onCreateFolder: toggleCreateFolderShown,
  },
)(FileBrowserActions);
