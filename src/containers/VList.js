import { connect } from 'react-redux';

import { setScrollOffset } from '../store/actions/ui';

import { getScrollOffset } from '../store/reducers/ui';

import VList from '../components/ui/VList';

export default connect(
  (state, ownProps) => ({
    initialScrollOffset: getScrollOffset(state, ownProps.scrollKey),
  }),
  {
    setScrollOffset,
  },
)(VList);
