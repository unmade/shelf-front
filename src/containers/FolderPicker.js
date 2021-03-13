import { connect } from 'react-redux';

import { getFilesByPath } from '../store/reducers/files';

import FolderPicker from '../components/FolderPicker';
import { listFolder } from '../store/actions/files';

export default connect(
  (state, ownProps) => ({
    items: getFilesByPath(state, ownProps.path),
  }),
  {
    listFolder,
  },
)(FolderPicker);
