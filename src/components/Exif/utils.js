const makersToExclude = new Set([
  'canon',
  'hp',
  'htc',
  'huawei',
  'nikon corporation',
  'pentax corporation',
]);

export function getCameraModel(meta) {
  const { make, model } = meta;
  const items = [];
  if (!makersToExclude.has(make?.toLowerCase())) {
    items.push(make);
  }
  if (model != null) {
    items.push(model);
  }

  const cameraModel = items.join(' ');
  if (cameraModel === '') {
    return null;
  }
  return cameraModel;
}

export function getFocalLength(meta) {
  if (meta.focal_length_35mm) {
    return `${meta.focal_length_35mm}mm`;
  }
  if (meta.focal_length) {
    return `${meta.focal_length}mm`;
  }
  return null;
}

export function getFNumber(meta) {
  if (meta.fnumber) {
    return `ƒ${meta.fnumber}`;
  }
  return null;
}

export function getExposure(meta) {
  if (meta.exposure) {
    return `${meta.exposure} s`;
  }
  return null;
}

export function getISO(meta) {
  if (meta.iso) {
    return `ISO ${meta.iso}`;
  }
  return null;
}

export function getDimensions(meta) {
  return [meta.width, meta.height].join('×');
}
