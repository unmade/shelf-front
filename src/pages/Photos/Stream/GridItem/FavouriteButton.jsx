import React from 'react';
import PropTypes from 'prop-types';

import { MediaItemShape } from '../../../../types';

import { useFavouriteAction } from '../../../../hooks/file-actions';
import useFileFromMediaItem from '../../hooks/file-from-media-item';

function FavouriteButton({ mediaItem, touch }) {
  const file = useFileFromMediaItem(mediaItem);
  const { key, title, Icon, onClick } = useFavouriteAction([file]);
  const favourite = key === 'unfavourite';

  if (touch) {
    if (favourite) {
      return (
        <div>
          <Icon className="h-4 w-4 shrink-0 drop-shadow-md" />
        </div>
      );
    }
    return null;
  }

  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <button
      title={title}
      type="button"
      className={`rounded-full p-0.5 text-gray-50 drop-shadow-md dark:text-zinc-100 ${
        favourite ? 'block' : 'hidden group-hover:block'
      }`}
      onClick={onClick}
    >
      <Icon className="h-4 w-4 shrink-0 drop-shadow-md" />
    </button>
  );
}

FavouriteButton.propTypes = {
  mediaItem: MediaItemShape.isRequired,
  touch: PropTypes.bool.isRequired,
};

export default FavouriteButton;
