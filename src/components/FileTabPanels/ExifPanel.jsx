import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import Spinner from '../ui-legacy/Spinner';
import TimeAgo from '../ui-legacy/TimeAgo';

import Property from './Property';

function ExifPanel({ meta, loading }) {
  const { t } = useTranslation(['exif']);

  if (loading) {
    return <Spinner className="h-full w-full py-3" />;
  }

  if (meta == null) {
    return (
      <div className="py-3 text-center text-gray-500 dark:text-zinc-400">
        <p>{t('exif:notAvailable')}</p>
      </div>
    );
  }

  return (
    <div className="divide-y text-xs font-medium dark:divide-zinc-700">
      {meta.make && <Property name={t('exif:make')} value={`${meta.make}`} />}
      {meta.model && <Property name={t('exif:model')} value={`${meta.model}`} />}
      {meta.width && meta.height && (
        <Property name={t('exif:dimensions')} value={`${meta.width}x${meta.height}`} />
      )}
      {meta.dt_digitized && (
        <Property
          name={t('exif:dateTimeDigitized')}
          value={<TimeAgo value={meta.dt_digitized * 1000} format="LLL" />}
        />
      )}
      {meta.dt_original && (
        <Property
          name={t('exif:dateTimeOriginal')}
          value={<TimeAgo value={meta.dt_original * 1000} format="LLL" />}
        />
      )}
      {meta.fnumber && <Property name={t('exif:aperture')} value={`ƒ/${meta.fnumber}`} />}
      {meta.exposure && <Property name={t('exif:exposure')} value={meta.exposure} />}
      {meta.iso && <Property name={t('exif:ISO')} value={meta.iso} />}
    </div>
  );
}

ExifPanel.propTypes = {
  meta: PropTypes.shape({
    make: PropTypes.string,
    model: PropTypes.string,
    fnumber: PropTypes.string,
    exposure: PropTypes.string,
    iso: PropTypes.string,
    dt_digitized: PropTypes.number,
    dt_original: PropTypes.number,
    height: PropTypes.number,
    width: PropTypes.number,
  }),
  loading: PropTypes.bool.isRequired,
};

ExifPanel.defaultProps = {
  meta: null,
};

export default ExifPanel;
