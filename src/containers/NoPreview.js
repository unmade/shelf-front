import { connect } from 'react-redux';

import { performDownload } from '../store/actions/files';

import NoPreview from '../components/FilePreview/NoPreview';

export default connect(null, {
  onDownload: performDownload,
})(NoPreview);
