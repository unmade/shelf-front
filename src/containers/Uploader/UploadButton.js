import { connect } from 'react-redux';

import { addFileEntries } from '../../store/actions/uploads';

import { getCurrentPath } from '../../store/reducers/ui';

import UploadButton from '../../components/Uploader/UploadButton';

export default connect(
  (state) => ({
    uploadTo: getCurrentPath(state),
  }),
  {
    onUpload: addFileEntries,
  }
)(UploadButton);
