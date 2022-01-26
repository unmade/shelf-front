import { connect } from 'react-redux';

import { getCurrentPath } from '../../store/reducers/ui';

import Overlay from '../../components/Uploader/Overlay';

export default connect((state) => ({
  uploadTo: getCurrentPath(state),
}))(Overlay);
