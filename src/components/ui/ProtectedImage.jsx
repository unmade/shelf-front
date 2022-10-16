import React from 'react';
import PropTypes from 'prop-types';

import { nanoid } from '@reduxjs/toolkit';

async function fetchImage(url, accessToken, onLoad) {
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
    onLoad(data);
  }
}

function ProtectedImage({
  accessToken,
  alt,
  children,
  cachedImage,
  className,
  debounce,
  loading,
  src,
  onLoad: onLoadCallback,
}) {
  const [objectURL, setObjectURL] = React.useState(null);

  React.useEffect(() => {
    let deferredLoad = null;
    if (cachedImage == null) {
      deferredLoad = setTimeout(() => {
        const onFetchSuccess = (data) => {
          setObjectURL(URL.createObjectURL(data));
          if (onLoadCallback != null) {
            onLoadCallback(data);
          }
        };
        fetchImage(src, accessToken, onFetchSuccess);
      }, debounce);
    }
    return () => {
      clearTimeout(deferredLoad);
      URL.revokeObjectURL(objectURL);
      setObjectURL(null);
    };
  }, [accessToken, src]);

  const imgsrc = objectURL ?? cachedImage;
  if (imgsrc) {
    return <img className={className} src={imgsrc} alt={alt} loading={loading} />;
  }
  return children;
}

ProtectedImage.propTypes = {
  accessToken: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  cachedImage: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
  className: PropTypes.string,
  debounce: PropTypes.number,
  loading: PropTypes.oneOf(['eager', 'lazy']),
  src: PropTypes.string.isRequired,
  onLoad: PropTypes.func,
};

ProtectedImage.defaultProps = {
  children: null,
  cachedImage: null,
  className: '',
  debounce: 150,
  loading: 'eager',
  onLoad: null,
};

export default ProtectedImage;
