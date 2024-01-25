import { useSelector } from 'react-redux';

import { selectPhotosLibraryPath } from 'store/features';
import { IMediaItem } from 'types/photos';
import { IFile } from 'types/files';

export function makeFileFromMediaItem(mediaItem: IMediaItem, libraryPath: string): IFile {
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

// Function overload for when the argument is a string
function useFileFromMediaItem(mediaItem: IMediaItem): IFile;
// eslint-disable-next-line no-redeclare
function useFileFromMediaItem(mediaItem: undefined): undefined;
// eslint-disable-next-line no-redeclare
function useFileFromMediaItem(mediaItem: IMediaItem | undefined): IFile | undefined {
  const libraryPath = useSelector(selectPhotosLibraryPath) ?? '';
  if (mediaItem == null) {
    return undefined;
  }
  return makeFileFromMediaItem(mediaItem, libraryPath);
}

export default useFileFromMediaItem;
