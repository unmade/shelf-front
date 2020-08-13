import { connect } from 'react-redux';
import FolderPickerItem from '../components/FolderPickerItem';

import { changeFolderPickerPath } from '../store/actions/ui';

import { getFileById } from '../store/reducers/files';

export default connect(
  (state, ownProps) => ({
    item: getFileById(state, ownProps.item),
  }),
  {
    onClick: changeFolderPickerPath,
  },
)(FolderPickerItem);
