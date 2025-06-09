export interface IAlbumCover {
  fileId: string;
  thumbnailUrl: string | null;
}

export interface IAlbum {
  id: string;
  slug: string;
  title: string;
  cover: IAlbumCover | null;
  itemsCount: number;
  createdAt: string;
}
