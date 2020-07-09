import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FileBrowser from '../components/FileBrowser';
import { listFiles } from '../store/actions/files';

export default compose(
  withRouter,
  connect(
    (state) => ({ ...state.files }),
    { listFiles },
  ),
)(FileBrowser);
