import React from 'react';

import { v4 as uuidv4 } from 'uuid';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef(null);

    this.setUploadFiles = this.setUploadFiles.bind(this);
    this.openUpload = this.openUpload.bind(this);
  }

  setUploadFiles(event) {
    const { addUploadFiles } = this.props;
    const { files } = event.target;
    const uploads = [];
    for (let i = 0; i < event.target.files.length; i++) {
      uploads.push({
        id: uuidv4(),
        name: files[i].name,
        baseDir: '.',
        fileObj: files[i],
        fileEntry: null,
      });
    }
    addUploadFiles(uploads);
    this.inputRef.current.value = '';
  }

  openUpload(event) {
    event.preventDefault();
    this.inputRef.current.click();
  }

  render() {
    return (
      <form>
        <input
          ref={this.inputRef}
          type="file"
          name="file"
          className="hidden"
          onChange={this.setUploadFiles}
          multiple
        />
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={this.openUpload}
        >
          Upload
        </button>
      </form>
    );
  }
}

export default Upload;
