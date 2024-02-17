import React from 'react';

import AppListItem from './AppListItem';
import { IAppItem } from '../hooks/available-apps';

interface Props {
  items: IAppItem[];
}

export default function AppList({ items }: Props) {
  return (
    <div className="min-w-56 space-y-1 rounded-xl bg-white px-2 py-2 text-base drop-shadow-md dark:bg-zinc-800">
      {items.map(({ name, path, icon, iconColor }) => (
        <AppListItem key={path} name={name} path={path} icon={icon} iconColor={iconColor} />
      ))}
    </div>
  );
}
