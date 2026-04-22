export interface DataExifSchema {
  type: 'exif';
  make: string | null;
  model: string | null;
  focal_length: number | null;
  focal_length_35mm: number | null;
  fnumber: string | null;
  exposure: string | null;
  iso: string | null;
  dt_original: number | null;
  dt_digitized: number | null;
  height: number | null;
  width: number | null;
}
