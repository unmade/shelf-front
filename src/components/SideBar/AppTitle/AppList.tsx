import AppListItem from './AppListItem';
import type { IAppItem } from '../hooks/available-apps';

interface Props {
  items: IAppItem[];
}

export default function AppList({ items }: Props) {
  return (
    <div className="min-w-56 space-y-1 px-2 py-2 text-base">
      {items.map(({ name, path, icon, iconColor }) => (
        <AppListItem key={path} name={name} path={path} icon={icon} iconColor={iconColor} />
      ))}
    </div>
  );
}
