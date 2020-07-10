import { connect } from 'react-redux';

import { getFolder } from '../store/reducers/files';

import FileTableView from '../components/FileTableView';

export default connect(
  (state) => ({
    files: getFolder(state),
  }),
)(FileTableView);
