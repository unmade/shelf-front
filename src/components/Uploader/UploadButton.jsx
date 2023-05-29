import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import { fileEntriesAdded } from '../../store/uploads';

import { Children } from '../../types';

import Button from '../ui/Button';

function UploadButton({ children, full, icon, uploadTo }) {
  const dispatch = useDispatch();

  const inputRef = useRef(null);

  const openUpload = (event) => {
    event.preventDefault();
    inputRef.current.click();
  };

  const setUploadFiles = (event) => {
    const { files } = event.target;
    dispatch(fileEntriesAdded({ files: [...files], uploadTo }));
    inputRef.current.value = '';
  };

  return (
    <form>
      <input
        ref={inputRef}
        type="file"
        name="file"
        className="hidden"
        onChange={setUploadFiles}
        multiple
      />
      <Button variant="primary" size="sm" icon={icon} onClick={openUpload} full={full}>
        {children}
      </Button>
    </form>
  );
}

export default UploadButton;

UploadButton.propTypes = {
  children: Children,
  full: PropTypes.bool,
  icon: PropTypes.element,
  uploadTo: PropTypes.string.isRequired,
};

UploadButton.defaultProps = {
  children: null,
  icon: null,
  full: false,
};
