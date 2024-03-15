import React from 'react';

import { IMediaItem } from 'types/photos';

import { useAppSelector } from 'hooks';

import { selectIsBookmarked } from 'store/users';

import { useFavouriteAction } from '../hooks/media-item-actions';

interface Props {
  mediaItem: IMediaItem;
  touch: boolean;
}

function FavouriteButton({ mediaItem, touch }: Props) {
  const { name, Icon, onClick } = useFavouriteAction([mediaItem]);
  const favourite = useAppSelector((state) => selectIsBookmarked(state, mediaItem.fileId));

  if (touch) {
    if (favourite) {
      return (
        <div>
          <Icon className="h-4 w-4 shrink-0 text-gray-50 drop-shadow-md dark:text-zinc-100" />
        </div>
      );
    }
    return null;
  }

  return (
    <button
      aria-label={name}
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
