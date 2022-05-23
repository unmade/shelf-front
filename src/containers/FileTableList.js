import { connect } from 'react-redux';

import { fileBrowserScrollOffsetChanged } from '../store/actions/ui';

import { getScrollOffset } from '../store/reducers/ui';

import VList from '../components/ui/VList';

export default connect(
  (state, ownProps) => ({
    initialScrollOffset: getScrollOffset(state, ownProps.scrollKey),
  }),
  {
    onScrollOffsetChange: fileBrowserScrollOffsetChanged,
  }
)(VList);
