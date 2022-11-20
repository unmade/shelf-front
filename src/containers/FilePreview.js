import { createSelector } from '@reduxjs/toolkit';
import { connect } from 'react-redux';

import { selectListFolderData } from '../store/files';

import FilePreview from '../components/FilePreview';

const makeGetPreview = () =>
  createSelector(
    (state, props) => selectListFolderData(state, props.dirPath),
    (_state, props) => props.name,
    (data, name) => {
      const { ids, entities } = data;
      const index = ids.findIndex((fileId) => entities[fileId].name === name);
      let prevIndex = index - 1;
      if (prevIndex < 0) {
        prevIndex = ids.length - 1;
      }

      let nextIndex = index + 1;
      if (nextIndex > ids.length - 1) {
        nextIndex = 0;
      }
      return {
        index,
        total: data.ids.length,
        files: [entities[ids[prevIndex]], entities[ids[index]], entities[ids[nextIndex]]],
      };
    }
  );

const makeMapStateToProps = () => {
  const getPreview = makeGetPreview();
  const mapStateToProps = (state, ownProps) => ({
    preview: getPreview(state, ownProps),
  });
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(FilePreview);
