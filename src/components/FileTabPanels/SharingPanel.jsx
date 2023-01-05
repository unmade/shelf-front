import React from 'react';

import { FileShape } from '../../types';

import SharedLinkSetting from '../SharedLinkSetting';

function SharingPanel({ file }) {
  return <SharedLinkSetting file={file} />;
}

SharingPanel.propTypes = {
  file: FileShape.isRequired,
};

export default SharingPanel;
