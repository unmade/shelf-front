import { connect } from 'react-redux';

import { addUploadFiles } from '../store/actions/uploads';

import Dropzone from '../components/Dropzone';

export default connect(
  null,
  { onDrop: addUploadFiles },
)(Dropzone);
