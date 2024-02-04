export interface IMediaItem {
  id: string;
  fileId: string;
  name: string;
  size: number;
  modifiedAt: string;
  mediatype: string;
  thumbnailUrl?: string;
  deletedAt: string | null;
}
