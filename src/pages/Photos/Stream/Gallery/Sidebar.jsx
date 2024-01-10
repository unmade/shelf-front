import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { useGetContentMetadataQuery } from '../../../../store/files';

import FileSize from '../../../../components/ui/FileSize';
import TimeAgo from '../../../../components/ui/TimeAgo';

function Property({ name, value }) {
  return (
    <div className="flex justify-between py-3">
      <p className="text-gray-500 dark:text-zinc-400">{name}</p>
      <p>{value}</p>
    </div>
  );
}

function Information({ path }) {
  const { data, isFetching: loading } = useGetContentMetadataQuery(path);
  const meta = data?.data;

  if (loading) {
    return null;
  }

  const camera = [meta.make, meta.model].join(' ');
  const exposure = [
    `${meta.fnumber && `ƒ${meta.fnumber}`}`,
    `${meta.exposure && `${meta.exposure} s`}`,
    `${meta.iso && `ISO ${meta.iso}`}`,
  ].join(' · ');
  const dimensions = [meta.width, meta.height].join('×');

  return (
    <>
      <p className="font-medium text-base">Information</p>
      <div className="divide-y text-sm font-semibold dark:divide-zinc-700">
        {camera.trim() !== '' && <Property name="Camera" value={camera} />}
        {meta.dt_original && (
          <Property
            name="Created"
            value={<TimeAgo mtime={meta.dt_original * 1000} format="LLL" />}
          />
        )}
        {exposure !== '' && <Property name="Exposure" value={exposure} />}
        {dimensions !== '' && <Property name="Dimensions" value={dimensions} />}
      </div>
    </>
  );
}

function Sidebar({ className, fileId, selectById }) {
  const file = useSelector((state) => selectById(state, fileId));

  return (
    <div className={className}>
      <div className="flex">
        <div className="mr-4 w-full min-w-0 text-gray-800 dark:text-zinc-200">
          <p className="truncate text-lg font-semibold">{file.name}</p>
          <p className="text-xs font-medium text-gray-500 dark:text-zinc-400">
            <FileSize size={file.size} />
          </p>
        </div>
      </div>

      <div className="pt-8">
        <Information path={file.path} />
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  className: PropTypes.string,
  fileId: PropTypes.string.isRequired,
  selectById: PropTypes.func.isRequired,
};

Sidebar.defaultProps = {
  className: '',
};

export default Sidebar;
