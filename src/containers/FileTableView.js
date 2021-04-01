import { connect } from 'react-redux';

import { scopes } from '../store/actions/loading';

import { getFilesByPath } from '../store/reducers/files';
import { getLoading } from '../store/reducers/loading';

import FileTableView from '../components/FileTableView';

export default connect(
  (state, ownProps) => ({
    items: getFilesByPath(state, ownProps.path),
    loading: getLoading(state, scopes.listingFolder),
  }),
)(FileTableView);
