import { connect } from 'react-redux';

import { listFolder } from '../store/actions/files';
import { scopes } from '../store/actions/loading';

import { getFilesByPath } from '../store/reducers/files';
import { getLoading } from '../store/reducers/loading';

import FolderPicker from '../components/FolderPicker';

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
    loading: getLoading(state, scopes.listingFolder) || true, // show loading indicator immediately
  }),
  {
    listFolder,
  },
)(FolderPicker);
