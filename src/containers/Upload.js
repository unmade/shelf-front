import { connect } from 'react-redux';

import { uploadFile } from '../store/files/actions';

import Upload from '../components/Upload';


export default connect(
  null,
  { uploadFile },
)(Upload);
