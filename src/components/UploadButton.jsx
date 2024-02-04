import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import { fileEntriesAdded } from '../store/uploads/slice';

import { Children } from '../types';

import Button from './ui/Button';

function UploadButton({ children, allowedMediaTypes = null, full, icon, size, uploadTo }) {
  const dispatch = useDispatch();

  const inputRef = useRef(null);

  const openUpload = (event) => {
    event.preventDefault();
    inputRef.current.click();
  };

  const setUploadFiles = (event) => {
    const { files } = event.target;
    dispatch(fileEntriesAdded({ allowedMediaTypes, files: [...files], uploadTo }));
    inputRef.current.value = '';
  };

  return (
    <form>
      <input
        ref={inputRef}
        type="file"
        accept={allowedMediaTypes?.join(',')}
        name="file"
        className="hidden"
        onChange={setUploadFiles}
        multiple
      />
      <Button variant="primary" size={size} icon={icon} onClick={openUpload} full={full}>
        {children}
      </Button>
    </form>
  );
}

export default UploadButton;

UploadButton.propTypes = {
  allowedMediaTypes: PropTypes.arrayOf(PropTypes.string),
  children: Children,
  full: PropTypes.bool,
  icon: PropTypes.element,
  size: PropTypes.oneOf(['xs', 'sm', 'base', 'lg']),
  uploadTo: PropTypes.string.isRequired,
};

UploadButton.defaultProps = {
  children: null,
  icon: null,
  full: false,
  size: 'sm',
};
