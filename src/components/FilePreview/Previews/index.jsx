import React from 'react';

import { MediaType } from '../../../constants';
import { FileShape } from '../../../types';

import CodePreview from './CodePreview';
import ImagePreview from './ImagePreview';
import NoPreview from './NoPreview';
import PDFPreview from './PDFPreview';

function getPreview(mediatype) {
  if (MediaType.isImage(mediatype)) {
    return ImagePreview;
  }
  if (MediaType.isText(mediatype)) {
    return CodePreview;
  }
  if (MediaType.isPDF(mediatype)) {
    return PDFPreview;
  }
  return NoPreview;
}

function Preview({ file }) {
  const Render = getPreview(file.mediatype);
  return <Render file={file} />;
}

Preview.propTypes = {
  file: FileShape.isRequired,
};

export default Preview;
