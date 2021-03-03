import { connect } from 'react-redux';

import { addFileEntries } from '../store/actions/uploads';

import { getCurrPath } from '../store/reducers/files';

import UploadButton from '../components/UploadButton';

export default connect(
  (state) => ({
    uploadTo: getCurrPath(state),
  }),
  {
    onUpload: addFileEntries,
  },
)(UploadButton);
