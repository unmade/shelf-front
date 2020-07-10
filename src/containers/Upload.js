import { connect } from 'react-redux';

import { addUploadFiles } from '../store/actions/uploads';

import Upload from '../components/Upload';

export default connect(
  null,
  { addUploadFiles },
)(Upload);
