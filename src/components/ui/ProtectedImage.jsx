import React from 'react';
import PropTypes from 'prop-types';

import { nanoid } from '@reduxjs/toolkit';

async function fetchImage(url, accessToken, onSuccess) {
  const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
    headers: new Headers({
      Authorization: `Bearer ${accessToken}`,
      'X-Request-ID': nanoid(),
    }),
  };
  const response = await fetch(url, options);
  if (response.ok) {
    const data = await response.blob();
    onSuccess(data);
  }
}

function ProtectedImage({ accessToken, alt, children, className, debounce, loading, src }) {
  const [objectURL, setObjectURL] = React.useState(null);

  React.useEffect(() => {
    const deferredLoad = setTimeout(() => {
      const onSuccess = (data) => {
        setObjectURL(URL.createObjectURL(data));
      };
      fetchImage(src, accessToken, onSuccess);
    }, debounce);
    return () => {
      clearTimeout(deferredLoad);
      URL.revokeObjectURL(objectURL);
      setObjectURL(null);
    };
  }, [accessToken, src]);

  if (objectURL != null) {
    return <img className={className} src={objectURL} alt={alt} loading={loading} />;
  }
  return children;
}

ProtectedImage.propTypes = {
  accessToken: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
  className: PropTypes.string,
  debounce: PropTypes.number,
  loading: PropTypes.oneOf(['eager', 'lazy']),
  src: PropTypes.string.isRequired,
};

ProtectedImage.defaultProps = {
  children: null,
  className: '',
  debounce: 150,
  loading: 'eager',
};

export default ProtectedImage;
