import { useSelector } from 'react-redux';

import { selectPhotosLibraryPath } from 'store/features';
import type { IMediaItem } from 'types/photos';
import type { IFile } from 'types/files';

export function makeFileFromMediaItem(mediaItem: IMediaItem, libraryPath: string): IFile {
  return {
    id: mediaItem.fileId,
    name: mediaItem.name,
    path: `${libraryPath}/${mediaItem.name}`,
    size: mediaItem.size,
    modified_at: mediaItem.modifiedAt,
    hidden: false,
    mediatype: mediaItem.mediatype,
    thumbnail_url: mediaItem.thumbnailUrl,
    deleted_at: mediaItem.deletedAt,
  };
}

// Function overload for when the argument is a string
function useFileFromMediaItem(mediaItem: IMediaItem): IFile;

function useFileFromMediaItem(mediaItem: undefined): undefined;

function useFileFromMediaItem(mediaItem: IMediaItem | undefined): IFile | undefined {
  const libraryPath = useSelector(selectPhotosLibraryPath) ?? '';
  if (mediaItem == null) {
    return undefined;
  }
  return makeFileFromMediaItem(mediaItem, libraryPath);
}

export default useFileFromMediaItem;
