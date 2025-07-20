import i18n from 'i18n';

import * as icons from 'icons';
import * as routes from 'routes';

const availableApps = import.meta.env.VITE_AVAILABLE_APPS?.split(',') ?? ['files', 'photos'];

export interface IAppItem {
  key: 'files' | 'photos';
  name: string;
  path: string;
  icon: React.ElementType;
  iconColor: string;
}

const apps: IAppItem[] = [
  {
    key: 'files',
    name: i18n.t('Files', { defaultValue: 'Files' }),
    path: routes.FILES.prefix,
    icon: icons.Folder,
    iconColor: 'text-blue-400',
  },
  {
    key: 'photos',
    name: i18n.t('Photos', { defaultValue: 'Photos' }),
    path: routes.PHOTOS.prefix,
    icon: icons.PhotoApp,
    iconColor: 'text-green-500',
  },
];

i18n.on('languageChanged init', () => {
  apps[0].name = i18n.t('Files');
  apps[1].name = i18n.t('Photos');
});

export default function useAvailableApps() {
  return apps.filter((app) => availableApps.includes(app.key));
}
