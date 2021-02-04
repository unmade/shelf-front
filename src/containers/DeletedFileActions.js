import { connect } from 'react-redux';

import { openDeleteImmediatelyDialog } from '../store/actions/ui';

import DeletedFileActions from '../components/DeletedFileActions';

export default connect(
  null,
  {
    onDeleteImmediately: openDeleteImmediatelyDialog,
  },
)(DeletedFileActions);
