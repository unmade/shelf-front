import React from 'react';


class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef(null);

    this.setFiles = this.setFiles.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
  }

  setFiles(event) {
    const { uploadFile } = this.props;
    const files = [...event.target.files];
    files.map(file => uploadFile({ file }));
  }

  uploadFiles(event) {
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
          onChange={this.setFiles}
          multiple
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={this.uploadFiles}
        >
          Upload
        </button>
     </form>
    )
  }
}


export default Upload;