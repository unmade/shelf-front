import { connect } from 'react-redux';

import { fetchThumbnail } from '../store/actions/files';
import { getThumbnailById } from '../store/reducers/files';

import Thumbnail from '../components/Thumbnail';

export default connect(
  (state, ownProps) => ({
    thumbs: getThumbnailById(state, ownProps.file.id),
  }),
  {
    fetchThumbnail,
  },
)(Thumbnail);
