import React from 'react';

import { useTranslation } from 'react-i18next';

import {
  useRemoveFileMemberMutation,
  useSetFileMemberAccessLevelMutation,
} from '../../store/sharing';

import * as icons from '../../icons';

import Button from '../ui/Button';
import Listbox from '../ui/Listbox';

function AccessOptionItem({ title, description }) {
  return (
    <div className="w-48 whitespace-pre-line">
      <p className="text-sm font-semibold">{title}</p>
      <p className="text-xs dark:text-zinc-400">{description}</p>
    </div>
  );
}

function FileMemberAccessLevel({ member }) {
  const { t } = useTranslation();

  const [setMemberAccessLevel] = useSetFileMemberAccessLevelMutation();
  const [removeMember] = useRemoveFileMemberMutation();

  const { access_level: accessLevel, permissions } = member;
  const { can_change_access_level: canChangeAccessLevel, can_remove: canRemove } = permissions;

  if (accessLevel === 'owner') {
    return (
      <div className="px-4">
        <p className="text-gray-700 dark:text-zinc-300">{t('Owner')}</p>
      </div>
    );
  }

  const options = [];
  if (canChangeAccessLevel || accessLevel === 'viewer') {
    options.push({
      name: (
        <AccessOptionItem
          title={t('Can view')}
          description={t('Member can view and download the files')}
        />
      ),
      shortName: t('Can view'),
      value: 'viewer',
    });
  }
  if (canChangeAccessLevel || accessLevel === 'editor') {
    options.push({
      name: (
        <AccessOptionItem
          title={t('Can edit')}
          description={t('Member can edit, delete and add the files')}
        />
      ),
      shortName: t('Can edit'),
      value: 'editor',
    });
  }
  if (canRemove) {
    options.push({
      name: <AccessOptionItem title={<span className="text-red-500">{t('Remove')}</span>} />,
      shortName: t('Remove'),
      value: 'remove',
    });
  }

  const currentOption = options.filter(({ value }) => value === accessLevel)[0];

  const onOptionChange = (option) => {
    const { id: memberId, file_id: fileId } = member;
    if (option.value === 'remove') {
      removeMember({ fileId, memberId });
    } else {
      setMemberAccessLevel({ fileId, memberId, accessLevel: option.value });
    }
  };

  return (
    <Listbox
      initial={currentOption}
      options={options}
      placement="top-end"
      onOptionChange={onOptionChange}
    >
      <Button full variant="text">
        {currentOption.shortName}
        <icons.ChevronDown className="ml-1 h-5 w-5 inline" />
      </Button>
    </Listbox>
  );
}

export default FileMemberAccessLevel;
