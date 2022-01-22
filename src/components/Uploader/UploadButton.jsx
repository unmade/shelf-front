import React from 'react';

import Button from '../ui/Button';

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
    const { children, icon } = this.props;
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
        <Button
          type="primary"
          size="sm"
          icon={icon}
          onClick={this.openUpload}
        >
          {children}
        </Button>
      </form>
    );
  }
}

export default UploadButton;
