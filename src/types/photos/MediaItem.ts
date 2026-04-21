export interface IMediaItem {
  id: string;
  name: string;
  size: number;
  mediaType: string;
  thumbnailUrl?: string | null;
  takenAt: string | null;
  createdAt: string;
  modifiedAt: string;
  deletedAt: string | null;
}
