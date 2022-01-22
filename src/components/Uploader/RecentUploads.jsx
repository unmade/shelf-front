import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import i18n from '../../i18n';

import * as icons from '../../icons';

import UploadList from '../../containers/Uploader/UploadList';
import UploadListItem from '../../containers/Uploader/UploadListItem';

import Button from '../ui/Button';
import Pill from '../ui/Pill';

const height = {
  minHeight: '20vh',
  maxHeight: '50vh',
};

const fixedHeight = {
  height: height.maxHeight,
};

const PILLS = [
  {
    key: 'all',
    text: null,
    title: null,
  },
  {
    key: 'inProgress',
    text: null,
    title: null,
  },
  {
    key: 'failed',
    text: null,
    title: null,
  },
];

const TEXTS = {
  all: null,
  inProgress: null,
  failed: null,
};

i18n.on('languageChanged init', () => {
  PILLS[0].text = i18n.t('All');
  PILLS[0].title = i18n.t('Show all uploads');
  PILLS[1].text = i18n.t('In-Progress');
  PILLS[1].title = i18n.t('Show in-progress uploads');
  PILLS[2].text = i18n.t('Failed');
  PILLS[2].title = i18n.t('Show failed uploads');

  TEXTS.all = i18n.t('No recents');
  TEXTS.inProgress = i18n.t('No in-progress uploads');
  TEXTS.failed = i18n.t('No failed uploads');
});

function RecentUploads({
  uploadCount, visibilityFilter, onClear, onSetVisibilityFilter,
}) {
  const { t } = useTranslation();

  const virtual = uploadCount > 10;
  return (
    <div className="mt-6">
      <p className="font-semibold">
        {t('Recent Uploads')}
      </p>

      <div className="sm:flex sm:flex-col-reverse">
        <div className="pt-4 pb-2 sm:pb-0 sm:pt-2 text-xs border-b sm:border-b-0 sm:border-t border-solid flex flex-row justify-between">
          <div className="flex flex-row space-x-2">
            {PILLS.map((pill) => (
              <Pill
                key={pill.key}
                title={pill.title}
                active={visibilityFilter === pill.key}
                onClick={() => (onSetVisibilityFilter(pill.key))}
              >
                {pill.text}
              </Pill>
            ))}
          </div>
          <Button
            type="text"
            icon={<icons.Clear className="w-4 h-4" />}
            title={t('Clear')}
            onClick={onClear}
          />
        </div>

        {(uploadCount > 0) ? (
          <div className="text-xs" style={(virtual) ? fixedHeight : height}>
            <UploadList
              itemRender={UploadListItem}
              virtual={virtual}
            />
          </div>
        ) : (
          <div
            className="h-20 text-gray-600 flex flex-row items-center justify-center space-x-2"
            style={height}
          >
            <icons.Collection className="w-6 h-6 text-gray-500" />
            <p className="text-sm">
              {TEXTS[visibilityFilter]}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

RecentUploads.propTypes = {
  uploadCount: PropTypes.number.isRequired,
  visibilityFilter: PropTypes.string.isRequired,
  onClear: PropTypes.func.isRequired,
  onSetVisibilityFilter: PropTypes.func.isRequired,
};

export default RecentUploads;
