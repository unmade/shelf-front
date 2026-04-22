export type UploadEntries = FileSystemFileEntry[] | File[];
export type UploadScope = 'files' | 'mediaItems';

export interface IUploadError {
  code: string;
}

export interface IUpload {
  id: string;
  name: string;
  scope: UploadScope;
  mediatype: string | null;
  uploadPath: string | null;
  parentPath: string | null;
  progress: number;
  thumbnail: string | null;
  mtime: number | null;
  error: IUploadError | null;
  done: boolean;
}
