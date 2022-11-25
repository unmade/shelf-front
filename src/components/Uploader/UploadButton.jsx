import React from 'react';
import PropTypes from 'prop-types';

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
    onUpload({ files: [...files], uploadTo });
    this.inputRef.current.value = '';
  }

  openUpload(event) {
    event.preventDefault();
    this.inputRef.current.click();
  }

  render() {
    const { children, icon, full } = this.props;
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
        <Button type="primary" size="sm" icon={icon} onClick={this.openUpload} full={full}>
          {children}
        </Button>
      </form>
    );
  }
}

export default UploadButton;

UploadButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  full: PropTypes.bool,
  icon: PropTypes.element,
};

UploadButton.defaultProps = {
  children: null,
  icon: null,
  full: false,
};
