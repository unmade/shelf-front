import { connect } from 'react-redux';

import { getFilesByPath } from '../store/reducers/files';

import FileTableView from '../components/FileTableView';

export default connect(
  (state, ownProps) => ({
    files: getFilesByPath(state, ownProps.baseDir || '.'),
  }),
)(FileTableView);
