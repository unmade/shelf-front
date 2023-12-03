import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { selectFileSharedViaLinkById } from '../../../store/sharing';

import { MediaType } from '../../../constants';
import * as icons from '../../../icons';

import FileIcon from '../../../components/FileIcon';
import FileLink from '../../../components/FileLink';

function SharedLinkListItem({ fileId }) {
  const item = useSelector((state) => selectFileSharedViaLinkById(state, fileId));
  const { name, path, mediatype } = item;

  return (
    <div className="px-12 h-[72px] flex items-center w-full dark:bg-zinc-700/30 rounded-xl">
      {/* file icon and name */}
      <div className="md:w-3/5 lg:w-2/3 flex items-center space-x-3 text-gray-900 dark:text-zinc-100 w-full">
        <FileIcon className="h-12 w-12" mediatype={mediatype} shared />
        <FileLink path={item.path} preview={item.mediatype !== MediaType.FOLDER}>
          <div>
            <p>{name}</p>
            <p className="text-xs text-gray-600 dark:text-zinc-400">{path}</p>
          </div>
        </FileLink>
      </div>

      <div className="flex items-center text-center space-x-4 md:w-2/5 lg:w-1/3">
        {/* link */}
        <div className="w-20">
          <button
            type="button"
            className={`p-2 rounded-xl w-8 h-8 transition-colors focus:outline-none  ring-orange-300 ring-offset-2 dark:ring-orange-700 dark:ring-offset-zinc-800 `}
            onClick={() => {}}
          >
            <icons.Plus />
          </button>
        </div>
      </div>
    </div>
  );
}

SharedLinkListItem.propTypes = {
  fileId: PropTypes.string.isRequired,
};

export default SharedLinkListItem;
