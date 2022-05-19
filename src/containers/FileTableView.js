import { connect } from 'react-redux';

import { scopes } from '../store/actions/loading';

import { getFileIdsByPath } from '../store/reducers/files';
import { getLoadingDeprecated } from '../store/reducers/loading';

import FileTableView from '../components/FileTableView';

export default connect((state, ownProps) => ({
  items: getFileIdsByPath(state, ownProps),
  loading: getLoadingDeprecated(state, scopes.listingFolder),
}))(FileTableView);
