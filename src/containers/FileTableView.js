import { connect } from 'react-redux';

import { scopes } from '../store/actions/loading';

import { getFileIdsByPath } from '../store/reducers/files';
import { getLoading } from '../store/reducers/loading';

import FileTableView from '../components/FileTableView';

export default connect((state, ownProps) => ({
  items: getFileIdsByPath(state, ownProps),
  loading: getLoading(state, scopes.listingFolder),
}))(FileTableView);
