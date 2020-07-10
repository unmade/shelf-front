import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { listFolder } from '../store/actions/files';

import FileBrowser from '../components/FileBrowser';

export default compose(
  withRouter,
  connect(
    null,
    { listFolder },
  ),
)(FileBrowser);
