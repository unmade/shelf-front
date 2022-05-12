import { connect } from 'react-redux';

import { getDownloads, makeGetDuplicatePreviewData } from '../store/reducers/files';

import FilePreview from '../components/FilePreview';
import { download } from '../store/actions/files';

const makeMapStateToProps = () => {
  const getPreview = makeGetDuplicatePreviewData();
  const mapStateToProps = (state, ownProps) => ({
    downloads: getDownloads(state),
    preview: getPreview(state, ownProps),
  });
  return mapStateToProps;
};

export default connect(makeMapStateToProps, {
  download,
})(FilePreview);
