import { connect } from 'react-redux';
import Files from '../components/Files';


const mapStateToProps = (state) => ({
  directory: state.files.data.directory,
  files: state.files.data.files,
});


export default connect(
  mapStateToProps,
  null
)(Files);
