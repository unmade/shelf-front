import { NavLink } from 'react-router';

import type { IAppItem } from '../hooks/available-apps';

const defaultClasses = [
  'my-1 rounded-lg px-2',
  'flex items-center',
  'text-gray-900 hover:text-gray-950 dark:text-zinc-100 dark:hover:text-white',
  'hover:bg-gray-950/5 dark:hover:bg-zinc-50/5',
].join(' ');
const activeClasses = 'text-gray-950 bg-gray-950/5 font-medium dark:text-white dark:bg-zinc-50/5';

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
