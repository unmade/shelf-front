import { connect } from 'react-redux';
import AccountMenu from '../components/AccountMenu';
import { retrieveAccMe } from '../store/accounts/actions';


const mapStateToProps = (state) => ({
  tokens: state.auth.tokens,
  ...state.accounts,
});


export default connect(
  mapStateToProps,
  { retrieveAccMe },
)(AccountMenu);
