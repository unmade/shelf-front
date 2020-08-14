import { connect } from 'react-redux';
import FolderPickerItem from '../components/FolderPickerItem';

import { getFileById } from '../store/reducers/files';

export default connect(
  (state, ownProps) => ({
    item: getFileById(state, ownProps.item),
  }),
)(FolderPickerItem);
