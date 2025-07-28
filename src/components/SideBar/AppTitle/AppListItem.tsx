import React from 'react';

import { NavLink } from 'react-router';

import { IAppItem } from '../hooks/available-apps';

const defaultClasses =
  'my-1 flex items-center rounded-lg px-2 hover:bg-gray-50 dark:hover:bg-zinc-700/50';
const activeClasses = 'bg-gray-50 font-medium dark:bg-zinc-700/50';

export default function AppListItem({ name, path, icon: Icon, iconColor }: Omit<IAppItem, 'key'>) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive ? `${defaultClasses} ${activeClasses}` : defaultClasses
      }
    >
      <Icon className={`mr-2 h-10 w-10 ${iconColor}`} />
      <span>{name}</span>
    </NavLink>
  );
}
