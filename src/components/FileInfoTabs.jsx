import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { getContentMetadata as fetchContentMetadata } from '../store/actions/files';
import { getFileById, getContentMetadata } from '../store/reducers/files';
import { getLoading } from '../store/reducers/loading';

import * as icons from '../icons';

import FileSize from './ui/FileSize';
import Tabs from './ui/Tabs';
import TimeAgo from './ui/TimeAgo';

function Property({ name, value }) {
  return (
    <div className="flex justify-between py-3">
      <p className="text-gray-500">{name}</p>
      <p>{value}</p>
    </div>
  );
}

function InformationPanel({ fileId }) {
  const { t } = useTranslation();

  const file = useSelector((state) => getFileById(state, fileId));

  return (
    <div className="divide-y text-xs font-medium">
      <Property name={t('Size')} value={<FileSize size={file.size} />} />
      <Property name={t('Created')} value={<TimeAgo mtime={file.mtime * 1000} format="LLL" />} />
      <Property name={t('Modified')} value={<TimeAgo mtime={file.mtime * 1000} format="LLL" />} />
    </div>
  );
}

Property.fileProps = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

function ExifPanel({ fileId }) {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const file = useSelector((state) => getFileById(state, fileId));
  const meta = useSelector((state) => getContentMetadata(state, fileId));
  const loading = useSelector((state) =>
    getLoading(state, { actionType: fetchContentMetadata, ref: file?.path })
  );

  const { path, has_thumbnail: hasThumbnail } = file;
  const shouldFetchMetadata = meta == null && hasThumbnail;

  React.useEffect(() => {
    if (shouldFetchMetadata) {
      dispatch(fetchContentMetadata(path));
    }
  }, [path, shouldFetchMetadata, dispatch]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-2 py-3 text-gray-500">
        <icons.Spinner className="h-7 w-7 animate-spin text-gray-600" />
      </div>
    );
  }

  if (meta == null) {
    return (
      <div className="flex flex-col items-center justify-center space-y-2 py-3 text-gray-500">
        <p>{t('Not available')}</p>
      </div>
    );
  }

  return (
    <div className="divide-y text-xs font-medium">
      {meta.make && <Property name={t('Maker')} value={`${meta.make}`} />}
      {meta.model && <Property name={t('Camera')} value={`${meta.model}`} />}
      {meta.width && meta.height && (
        <Property name={t('Dimensions')} value={`${meta.width}x${meta.height}`} />
      )}
      {meta.dt_digitized && (
        <Property
          name={t('Date Time Digitized')}
          value={<TimeAgo mtime={meta.dt_digitized * 1000} format="LLL" />}
        />
      )}
      {meta.dt_original && (
        <Property
          name={t('Date Time Original')}
          value={<TimeAgo mtime={meta.dt_original * 1000} format="LLL" />}
        />
      )}
      {meta.fnumber && <Property name={t('Aperture')} value={`ƒ/${meta.fnumber}`} />}
      {meta.exposure && <Property name={t('Exposure')} value={meta.exposure} />}
      {meta.iso && <Property name={t('ISO')} value={meta.iso} />}
    </div>
  );
}

ExifPanel.propTypes = {
  fileId: PropTypes.string.isRequired,
};

const tabs = {
  Information: InformationPanel,
  Meta: ExifPanel,
};

function FileInfoTabs({ fileId }) {
  return (
    <Tabs
      tabs={Object.entries(tabs).map(([key, Panel]) => ({
        name: key,
        render: <Panel fileId={fileId} />,
      }))}
    />
  );
}

export default FileInfoTabs;

FileInfoTabs.propTypes = {
  fileId: PropTypes.string.isRequired,
};
