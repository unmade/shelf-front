import { connect } from 'react-redux';

import { fileEntriesAdded } from '../store/actions/uploads';

import Dropzone from '../components/ui/Dropzone';

export default connect(null, { onDrop: fileEntriesAdded })(Dropzone);
