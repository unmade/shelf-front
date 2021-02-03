import { connect } from 'react-redux';

import { addUploadFiles } from '../store/actions/uploads';

import Dropzone from '../components/ui/Dropzone';

export default connect(
  null,
  { onDrop: addUploadFiles },
)(Dropzone);
