import { useSelector } from 'react-redux';

import { selectPhotosLibraryPath } from '../../../store/features';

export function makeFileFromMediaItem(mediaItem, libraryPath) {
  return {
    id: mediaItem.fileId,
    name: mediaItem.name,
    path: `${libraryPath}/${mediaItem.name}`,
    size: mediaItem.size,
    mtime: mediaItem.mtime,
    hidden: false,
    mediatype: mediaItem.mediatype,
    thumbnail_url: mediaItem.thumbnailUrl,
  };
}

function useFileFromMediaItem(mediaItem) {
  const libraryPath = useSelector(selectPhotosLibraryPath);
  if (mediaItem == null) {
    return null;
  }
  return makeFileFromMediaItem(mediaItem, libraryPath);
}

export default useFileFromMediaItem;
