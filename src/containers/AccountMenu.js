import { connect } from 'react-redux';
import AccountMenu from '../components/AccountMenu';
import { retrieveUser } from '../store/user/actions';
import { getUsername } from '../store/user/selectors';


const mapStateToProps = (state) => ({
  username: getUsername(state),
});


export default connect(
  mapStateToProps,
  { retrieveUser },
)(AccountMenu);
