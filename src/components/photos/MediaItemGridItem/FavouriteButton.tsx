import React from 'react';

import { IMediaItem } from 'types/photos';

import { useFavouriteAction } from 'hooks/file-actions';

import useFileFromMediaItem from '../hooks/file-from-media-item';

interface Props {
  mediaItem: IMediaItem;
  touch: boolean;
}

function FavouriteButton({ mediaItem, touch }: Props) {
  const file = useFileFromMediaItem(mediaItem);

  const { key, name, Icon, onClick } = useFavouriteAction([file]);
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
    <button
      aria-label="Favourite"
      title={name}
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

export default FavouriteButton;
