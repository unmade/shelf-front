import { connect } from 'react-redux';

import { openDialog } from '../store/actions/ui';

import FileBrowserActions from '../components/FileBrowserActions';

export default connect(
  null,
  {
    onCreateFolder: openDialog,
  },
)(FileBrowserActions);
