import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { selectVisibleUploads } from '../../store/uploads/slice';

import VList from '../ui/VList';

function UploadList({ visibilityFilter, itemRender }) {
  const uploads = useSelector((state) => selectVisibleUploads(state, { filter: visibilityFilter }));
  return <VList itemCount={uploads.length} itemData={uploads} itemRender={itemRender} />;
}

UploadList.propTypes = {
  visibilityFilter: PropTypes.oneOf(['all', 'failed', 'inProgress']).isRequired,
  itemRender: PropTypes.elementType.isRequired,
};

export default UploadList;
