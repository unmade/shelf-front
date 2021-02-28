import { connect } from 'react-redux';

import { addUploadFiles } from '../store/actions/uploads';

import UploadButton from '../components/UploadButton';

export default connect(
  null,
  { addUploadFiles },
)(UploadButton);
