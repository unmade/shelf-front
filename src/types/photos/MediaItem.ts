export interface IMediaItem {
  id: string;
  fileId: string;
  name: string;
  size: number;
  mtime: number;
  mediatype: string;
  thumbnailUrl?: string;
  deletedAt: string | null;
}
