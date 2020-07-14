import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { deselectFiles, listFolder } from '../store/actions/files';
import { getHasSelectedFiles } from '../store/reducers/files';

import FileBrowser from '../components/FileBrowser';

export default compose(
  withRouter,
  connect(
    (state) => ({
      hasSelectedFiles: getHasSelectedFiles(state),
    }),
    {
      deselectFiles,
      listFolder,
    },
  ),
)(FileBrowser);
