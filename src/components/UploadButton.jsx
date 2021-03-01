import React from 'react';

class UploadButton extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef(null);

    this.setUploadFiles = this.setUploadFiles.bind(this);
    this.openUpload = this.openUpload.bind(this);
  }

  setUploadFiles(event) {
    const { uploadTo, onUpload } = this.props;
    const { files } = event.target;
    onUpload([...files], uploadTo);
    this.inputRef.current.value = '';
  }

  openUpload(event) {
    event.preventDefault();
    this.inputRef.current.click();
  }

  render() {
    const { className = '', children } = this.props;
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
          className={className}
          onClick={this.openUpload}
        >
          {children}
        </button>
      </form>
    );
  }
}

export default UploadButton;
