import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { getVisibleUploads } from '../../store/reducers/uploads';

import VList from '../ui/VList';

function UploadList({ visibilityFilter, itemRender }) {
  const uploads = useSelector((state) => getVisibleUploads(state, { filter: visibilityFilter }));

  if (uploads.length < 1) {
    return null;
  }
  return <VList itemCount={uploads.length} itemData={uploads} itemRender={itemRender} />;
}

UploadList.propTypes = {
  visibilityFilter: PropTypes.oneOf(['all', 'failed', 'inProgress']).isRequired,
  itemRender: PropTypes.elementType.isRequired,
};

export default UploadList;
