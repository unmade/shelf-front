import type { DataExifSchema } from '@/types/Exif';

const makersToExclude = new Set<string>([
  'canon',
  'hp',
  'htc',
  'huawei',
  'nikon corporation',
  'pentax corporation',
]);

export function getCameraModel(meta: DataExifSchema): string | null {
  const { make, model } = meta;
  const items = [];
  if (make && !makersToExclude.has(make.toLowerCase())) {
    items.push(make);
  }
  if (model != null) {
    items.push(model);
  }
  const cameraModel = items.filter(Boolean).join(' ');
  return cameraModel !== '' ? cameraModel : null;
}

export function getFocalLength(meta: DataExifSchema): string | null {
  if (meta.focal_length_35mm != null) {
    return `${meta.focal_length_35mm}mm`;
  }
  if (meta.focal_length != null) {
    return `${meta.focal_length}mm`;
  }
  return null;
}

export function getFNumber(meta: DataExifSchema): string | null {
  if (meta.fnumber != null) {
    return `ƒ${meta.fnumber}`;
  }
  return null;
}

export function getExposure(meta: DataExifSchema): string | null {
  if (meta.exposure != null) {
    return `${meta.exposure} s`;
  }
  return null;
}

export function getISO(meta: DataExifSchema): string | null {
  if (meta.iso != null) {
    return `ISO ${meta.iso}`;
  }
  return null;
}

export function getDimensions(meta: DataExifSchema): string | null {
  if (meta.width != null && meta.height != null) {
    return `${meta.width}×${meta.height}`;
  }
  return null;
}
