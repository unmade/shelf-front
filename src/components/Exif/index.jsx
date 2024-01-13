import React from 'react';
import PropTypes from 'prop-types';

import {
  getCameraModel,
  getDimensions,
  getExposure,
  getFNumber,
  getFocalLength,
  getISO,
} from './utils';

import { useGetContentMetadataQuery } from '../../store/files';

import TimeAgo from '../ui/TimeAgo';

function ExifProperty({ title, value }) {
  return (
    <div className="mt-1 flex items-center justify-between">
      <p className="text-gray-700 dark:text-zinc-400">{title}</p>
      <p className="text-right">{value}</p>
    </div>
  );
}

ExifProperty.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
};

function Exif({ path }) {
  const { data, isFetching: loading, isError } = useGetContentMetadataQuery(path);
  const meta = data?.data;

  if (loading || meta == null || isError) {
    return null;
  }

  const dimensions = getDimensions(meta);
  const focalLength = getFocalLength(meta);
  const fnumber = getFNumber(meta);
  const exposure = getExposure(meta);
  const iso = getISO(meta);

  return (
    <div className="px-3 py-2 bg-gray-100 dark:bg-zinc-900/50 text-gray-900 dark:text-zinc-100 rounded-lg sm:text-sm">
      <div className="py-1 border-b-2 dark:border-zinc-800">
        <div className="flex justify-between">
          <p className="font-medium text-left text-base">
            {getCameraModel(meta) ?? 'No camera information'}
          </p>
        </div>
        {(focalLength || fnumber || exposure || iso) && (
          <div className="mt-2 flex items-center justify-between">
            <div>{focalLength ?? '—'}</div>
            <div>{fnumber ?? '—'}</div>
            <div>{exposure ?? '—'}</div>
            <div>{iso ?? '—'}</div>
          </div>
        )}
      </div>
      <div>
        {dimensions && <ExifProperty title="Dimensions" value={dimensions} />}
        {meta.dt_original && (
          <ExifProperty
            title="Date Taken"
            value={
              <>
                <TimeAgo
                  className="sm:hidden xl:inline-block"
                  mtime={meta.dt_original * 1000}
                  format="LLL"
                />
                <TimeAgo
                  className="hidden sm:block xl:hidden"
                  mtime={meta.dt_original * 1000}
                  format="lll"
                />
              </>
            }
          />
        )}
      </div>
    </div>
  );
}

Exif.propTypes = {
  path: PropTypes.string.isRequired,
};

export default Exif;
