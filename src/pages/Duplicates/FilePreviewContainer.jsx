import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import { createEntityAdapter } from '@reduxjs/toolkit';

import FilePreview from '../../components/FilePreview';
import { FileShape } from '../../types';

export const filesAdapter = createEntityAdapter();
const initialState = filesAdapter.getInitialState();

function FilePreviewContainer({ files }) {
  const data = useMemo(() => filesAdapter.setAll(initialState, files), [files]);
  const selectById = useCallback((state, id) => data.entities[id], [data.entities]);
  return <FilePreview ids={data.ids} selectById={selectById} />;
}

FilePreviewContainer.propTypes = {
  files: PropTypes.arrayOf(FileShape),
};

FilePreviewContainer.defaultProps = {
  files: {},
};

export default FilePreviewContainer;
