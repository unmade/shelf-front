import { createSelector } from '@reduxjs/toolkit';
import { connect } from 'react-redux';

import { selectFindDuplicatesData } from '../store/files';
import { getDownloads } from '../store/reducers/files';

import * as routes from '../routes';

import FilePreview from '../components/FilePreview';
import { download } from '../store/actions/files';

export const makeGetDuplicatePreviewData = () =>
  createSelector(
    (state, { dirPath, maxDistance }) => selectFindDuplicatesData(state, dirPath, maxDistance),
    (_state, props) => props.dirPath,
    (_state, props) => props.name,
    (data, dirPath, name) => {
      if (data == null) {
        return {
          index: 0,
          total: 0,
          files: [],
        };
      }
      let targetGroup = null;
      let index = null;

      const targetPath = routes.join(dirPath, name);
      // eslint-disable-next-line no-restricted-syntax
      for (const group of data) {
        index = group.findIndex((file) => file.path.toLowerCase() === targetPath.toLowerCase());
        if (index !== -1) {
          targetGroup = group;
          break;
        }
      }

      let prevIndex = index - 1;
      if (prevIndex < 0) {
        prevIndex = targetGroup.length - 1;
      }

      let nextIndex = index + 1;
      if (nextIndex > targetGroup.length - 1) {
        nextIndex = 0;
      }
      return {
        index,
        total: targetGroup.length,
        files: [targetGroup[prevIndex], targetGroup[index], targetGroup[nextIndex]],
      };
    }
  );

const makeMapStateToProps = () => {
  const getPreview = makeGetDuplicatePreviewData();
  const mapStateToProps = (state, ownProps) => ({
    downloads: getDownloads(state),
    preview: getPreview(state, ownProps),
  });
  return mapStateToProps;
};

export default connect(makeMapStateToProps, {
  download,
})(FilePreview);
