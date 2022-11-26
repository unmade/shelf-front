import { connect } from 'react-redux';

import { fileEntriesAdded } from '../../store/uploads';

import { selectCurrentPath } from '../../store/browser';

import UploadButton from '../../components/Uploader/UploadButton';

export default connect(
  (state) => ({
    uploadTo: selectCurrentPath(state),
  }),
  {
    onUpload: fileEntriesAdded,
  }
)(UploadButton);
