import { connect } from 'react-redux';

import { addFileEntries } from '../store/actions/uploads';

import Dropzone from '../components/ui/Dropzone';

export default connect(null, { onDrop: addFileEntries })(Dropzone);
