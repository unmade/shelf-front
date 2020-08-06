import { connect } from 'react-redux';

import { openRenameFileDialog } from '../store/actions/ui';

import FileActions from '../components/FileActions';

export default connect(
  null,
  {
    onRename: openRenameFileDialog,
  },
)(FileActions);
