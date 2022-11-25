import { connect } from 'react-redux';

import { fileEntriesAdded } from '../../store/uploads';

import { getCurrentPath } from '../../store/reducers/ui';

import UploadButton from '../../components/Uploader/UploadButton';

export default connect(
  (state) => ({
    uploadTo: getCurrentPath(state),
  }),
  {
    onUpload: fileEntriesAdded,
  }
)(UploadButton);
