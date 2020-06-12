import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Files from '../components/Files';
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
)(Files);
