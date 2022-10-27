import { connect } from 'react-redux';

import { makeGetPreview } from '../store/reducers/files';

import FilePreview from '../components/FilePreview';

const makeMapStateToProps = () => {
  const getPreview = makeGetPreview();
  const mapStateToProps = (state, ownProps) => ({
    preview: getPreview(state, ownProps),
  });
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(FilePreview);
