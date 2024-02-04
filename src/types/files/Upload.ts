export interface IUploadError {
  code: string;
}

export interface IUpload {
  id: string;
  name: string;
  mediatype: string | null;
  uploadPath: string;
  parentPath: string;
  progress: number;
  thumbnail: string | null;
  mtime: number | null;
  error: IUploadError | null;
  done: boolean | false;
}
