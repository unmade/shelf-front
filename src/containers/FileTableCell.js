import { connect } from 'react-redux';

import { getFileById } from '../store/reducers/files';

import FileTableCell from '../components/FileTableCell';

export default connect(
  (state, ownProps) => ({
    item: getFileById(state, ownProps.uniqueKey),
  }),
)(FileTableCell);
