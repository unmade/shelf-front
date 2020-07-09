import { connect } from 'react-redux';

import { addUploadFiles } from '../store/files/actions';

import Upload from '../components/Upload';


export default connect(
  null,
  { addUploadFiles },
)(Upload);
