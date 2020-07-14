import { connect } from 'react-redux';

import { selectFile } from '../store/actions/files';
import { getFileById, getIsFileSelected } from '../store/reducers/files';

import FileTableCell from '../components/FileTableCell';

export default connect(
  (state, ownProps) => ({
    item: getFileById(state, ownProps.uniqueKey),
    selected: getIsFileSelected(state, ownProps.uniqueKey),
  }),
  {
    onSelect: selectFile,
  },
)(FileTableCell);
