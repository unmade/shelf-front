import { connect } from 'react-redux';

import { getFilesByPath } from '../store/reducers/files';
import { getFolderPickerPath } from '../store/reducers/ui';

import FolderPicker from '../components/FolderPicker';
import { changeFolderPickerPath } from '../store/actions/ui';
import { listFolder } from '../store/actions/files';

export default connect(
  (state) => ({
    path: getFolderPickerPath(state),
    items: getFilesByPath(state, getFolderPickerPath(state)),
  }),
  (dispatch, ownProps) => ({
    onBreadcrumbClick: (path) => dispatch(changeFolderPickerPath(path)),
    onPathChange: (path) => {
      dispatch(listFolder(path));
      ownProps.onPathChange(path);
    },
  }),
)(FolderPicker);
