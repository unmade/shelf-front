export interface IFile {
  id: string;
  name: string;
  path: string;
  size: number;
  modified_at: string;
  hidden: boolean;
  mediatype: string;
  thumbnail_url?: string;
  deleted_at: string | null;
}
