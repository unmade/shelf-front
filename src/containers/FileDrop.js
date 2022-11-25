import { connect } from 'react-redux';

import { fileEntriesAdded } from '../store/uploads';

import Dropzone from '../components/ui/Dropzone';

export default connect(null, { onDrop: fileEntriesAdded })(Dropzone);
