export type ExifMeta = {
  make?: string | null;
  model?: string | null;
  focal_length_35mm?: number | string | null;
  focal_length?: number | string | null;
  fnumber?: number | string | null;
  exposure?: number | string | null;
  iso?: number | string | null;
  width?: number | string | null;
  height?: number | string | null;
};

const makersToExclude = new Set<string>([
  'canon',
  'hp',
  'htc',
  'huawei',
  'nikon corporation',
  'pentax corporation',
]);

export function getCameraModel(meta: ExifMeta): string | null {
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

export function getFocalLength(meta: ExifMeta): string | null {
  if (meta.focal_length_35mm != null) {
    return `${meta.focal_length_35mm}mm`;
  }
  if (meta.focal_length != null) {
    return `${meta.focal_length}mm`;
  }
  return null;
}

export function getFNumber(meta: ExifMeta): string | null {
  if (meta.fnumber != null) {
    return `ƒ${meta.fnumber}`;
  }
  return null;
}

export function getExposure(meta: ExifMeta): string | null {
  if (meta.exposure != null) {
    return `${meta.exposure} s`;
  }
  return null;
}

export function getISO(meta: ExifMeta): string | null {
  if (meta.iso != null) {
    return `ISO ${meta.iso}`;
  }
  return null;
}

export function getDimensions(meta: ExifMeta): string {
  const width = meta.width ?? '';
  const height = meta.height ?? '';
  return `${width}×${height}`;
}
