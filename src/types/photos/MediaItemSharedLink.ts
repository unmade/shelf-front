import { IMediaItem } from './MediaItem';

export interface IMediaItemSharedLink {
  token: string;
  createdAt: string;
  item: IMediaItem;
}
