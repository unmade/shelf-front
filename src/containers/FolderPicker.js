import { connect } from 'react-redux';

import { getFilesByPath } from '../store/reducers/files';

import FolderPicker from '../components/FolderPicker';
import { listFolder } from '../store/actions/files';

function getFilesByPathExclude(state, props) {
  const { path, excludeId } = props;
  const files = getFilesByPath(state, path);
  if (excludeId === null || excludeId === undefined) {
    return files;
  }
  const nextFiles = files.filter((fileId) => fileId !== excludeId);
  if (files.length === nextFiles.length) {
    return files; // return object from state to prevent re-renders
  }
  return nextFiles;
}

export default connect(
  (state, ownProps) => ({
    items: getFilesByPathExclude(state, ownProps),
  }),
  {
    listFolder,
  },
)(FolderPicker);
