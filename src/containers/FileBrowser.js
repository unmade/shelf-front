import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FileBrowser from '../components/FileBrowser';
import { listFiles } from '../store/files/actions';


const mapStateToProps = (state) => ({
  ...state.files
});


export default compose(
  withRouter,
  connect(
    mapStateToProps,
    { listFiles },
  )
)(FileBrowser);
