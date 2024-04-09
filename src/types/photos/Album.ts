export interface IAlbumCover {
  fileId: string;
  thumbnailUrl: string | null;
}

export interface IAlbum {
  id: string;
  title: string;
  createdAt: string;
  cover: IAlbumCover | null;
}
