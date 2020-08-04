import { connect } from 'react-redux';

import { toggleCreateFolderShown } from '../store/actions/ui';
import { getCreateFolderShown } from '../store/reducers/ui';

import CreateFolder from '../components/CreateFolder';

export default connect(
  (state) => ({
    visible: getCreateFolderShown(state),
  }),
  {
    onClose: toggleCreateFolderShown,
  },
)(CreateFolder);
