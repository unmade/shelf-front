import { connect } from 'react-redux';

import { openDialog } from '../store/actions/ui';

import Breadcrumb from '../components/ui/Breadcrumb';
import { Dialogs } from '../constants';

export default connect(
  null,
  (dispatch) => ({
    onCreateFolder: () => dispatch(openDialog(Dialogs.createFolder)),
  }),
)(Breadcrumb);
