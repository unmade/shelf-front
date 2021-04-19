import { connect } from 'react-redux';

import { performDownload } from '../store/actions/files';
import { openDialog } from '../store/actions/ui';

import FileTableCellActions from '../components/FileTableCellActions';

export default connect(
  null,
  {
    onDownload: performDownload,
    openDialog,
  },
)(FileTableCellActions);
