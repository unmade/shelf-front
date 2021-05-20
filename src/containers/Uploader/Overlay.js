import { connect } from 'react-redux';

import { getCurrPath } from '../../store/reducers/files';

import Overlay from '../../components/Uploader/Overlay';

export default connect(
  (state) => ({
    uploadTo: getCurrPath(state),
  }),
)(Overlay);
