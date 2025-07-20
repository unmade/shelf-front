import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import { useGetContentMetadataQuery } from 'store/files';

import TimeAgo from 'components/ui/TimeAgo';

import {
  getCameraModel,
  getDimensions,
  getExposure,
  getFNumber,
  getFocalLength,
  getISO,
} from './utils';

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

function Exif({ fileId }) {
  const { t } = useTranslation(['exif']);
  const { data, isFetching: loading, isError } = useGetContentMetadataQuery(fileId);
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
    <div className="rounded-lg bg-gray-100 px-3 py-2 text-gray-900 dark:bg-zinc-900/50 dark:text-zinc-100 sm:text-sm">
      <div className="border-b-2 py-1 dark:border-zinc-800">
        <div className="flex justify-between">
          <p className="text-left text-base font-medium">
            {getCameraModel(meta) ??
              t('exif:noCameraInformation', { defaultValue: 'No camera information' })}
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
        {dimensions && (
          <ExifProperty
            title={t('exif:dimensions', { defaultValue: 'Dimensions' })}
            value={dimensions}
          />
        )}
        {meta.dt_original && (
          <ExifProperty
            title={t('exif:dateTaken', { defaultValue: 'Date Taken' })}
            value={
              <>
                <TimeAgo
                  className="sm:hidden xl:inline-block"
                  value={meta.dt_original * 1000}
                  format="LLL"
                />
                <TimeAgo
                  className="hidden sm:block xl:hidden"
                  value={meta.dt_original * 1000}
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
  fileId: PropTypes.string.isRequired,
};

export default Exif;
