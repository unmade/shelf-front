import { connect } from 'react-redux';

import { fileBrowserScrollOffsetChanged, selectScrollOffset } from '../store/browser';

import VList from '../components/ui-legacy/VList';

export default connect(
  (state, ownProps) => ({
    initialScrollOffset: selectScrollOffset(state, ownProps.scrollKey),
  }),
  {
    onScrollOffsetChange: fileBrowserScrollOffsetChanged,
  },
)(VList);
