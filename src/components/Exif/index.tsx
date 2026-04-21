import { useTranslation } from 'react-i18next';

import type { DataExifSchema } from '@/types/Exif';

import { TimeAgo } from '@/ui/timeago';

import {
  getCameraModel,
  getDimensions,
  getExposure,
  getFNumber,
  getFocalLength,
  getISO,
} from './utils';

interface ExifPropertyProps {
  title: string;
  value: React.ReactNode;
}

function ExifProperty({ title, value }: ExifPropertyProps) {
  return (
    <div className="mt-1 flex items-center justify-between">
      <p className="text-gray-700 dark:text-zinc-400">{title}</p>
      <p className="text-right">{value}</p>
    </div>
  );
}

interface Props {
  data: DataExifSchema;
}

export function Exif({ data }: Props) {
  const { t } = useTranslation('files');

  const dimensions = getDimensions(data);
  const focalLength = getFocalLength(data);
  const fnumber = getFNumber(data);
  const exposure = getExposure(data);
  const iso = getISO(data);

  return (
    <div className="rounded-lg bg-gray-100 px-3 py-2 text-gray-900 sm:text-sm dark:bg-zinc-900/50 dark:text-zinc-100">
      <div className="border-b-2 border-gray-200 py-1 dark:border-zinc-800">
        <div className="flex justify-between">
          <p className="text-left text-base font-medium">
            {getCameraModel(data) ??
              t('exif.noCameraInformation', { defaultValue: 'No camera information' })}
          </p>
        </div>
        {(focalLength != null || fnumber != null || exposure != null || iso != null) && (
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
            title={t('exif.dimensions', { defaultValue: 'Dimensions' })}
            value={dimensions}
          />
        )}
        {data.dt_original && (
          <ExifProperty
            title={t('exif.dateTaken', { defaultValue: 'Date Taken' })}
            value={
              <>
                <TimeAgo
                  className="sm:hidden xl:inline-block"
                  value={data.dt_original * 1000}
                  format="LLL"
                />
                <TimeAgo
                  className="hidden sm:block xl:hidden"
                  value={data.dt_original * 1000}
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
