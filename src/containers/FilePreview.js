import { connect } from 'react-redux';

import { getDownloads, getPreview } from '../store/reducers/files';

import FilePreview from '../components/FilePreview';
import { download } from '../store/actions/files';

export default connect(
  (state, ownProps) => ({
    downloads: getDownloads(state),
    preview: getPreview(state, ownProps.path, ownProps.preview),
  }),
  {
    download,
  },
)(FilePreview);
