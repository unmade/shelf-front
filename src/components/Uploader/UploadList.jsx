import React from 'react';
import PropTypes from 'prop-types';

import VList from '../ui/VList';

function UploadList({ uploads, virtual, itemRender }) {
  if (uploads.length < 1) {
    return null;
  }

  if (virtual) {
    return <VList itemCount={uploads.length} itemData={uploads} itemRender={itemRender} />;
  }

  const ItemRender = itemRender;
  return (
    <>
      {uploads.map((uploadId, idx) => (
        <div key={uploadId} className="rounded-lg p-4 hover:bg-gray-100">
          <ItemRender data={uploads} index={idx} />
        </div>
      ))}
    </>
  );
}

UploadList.propTypes = {
  uploads: PropTypes.arrayOf(PropTypes.string).isRequired,
  virtual: PropTypes.bool,
  itemRender: PropTypes.elementType.isRequired,
};

UploadList.defaultProps = {
  virtual: false,
};

export default UploadList;
