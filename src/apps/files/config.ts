import i18n from 'i18n';

import { type AppConfig } from '@/types/AppConfig';

import { BookmarksIcon, FilesAppIcon, HomeIcon, LinkIcon, ShareIcon, TrashIcon } from '@/icons';
import * as routes from '@/routes';

const config: AppConfig = {
  key: 'files',
  title: 'Files',
  path: routes.FILES.prefix,
  Icon: FilesAppIcon,
  menu: {
    sections: [
      {
        key: 'general',
        title: undefined,
        items: [
          {
            path: routes.FILES.prefix,
            title: 'Home',
            Icon: HomeIcon,
            desktopOnly: false,
            end: false,
          },
          {
            path: routes.BOOKMARKS.prefix,
            title: 'Saved',
            Icon: BookmarksIcon,
            desktopOnly: false,
            end: false,
          },
          {
            path: routes.TRASH.prefix,
            title: 'Trash',
            Icon: TrashIcon,
            desktopOnly: false,
            end: false,
          },
        ],
      },
      {
        key: 'sharing',
        title: 'Sharing',
        items: [
          {
            path: routes.SHARED_IN_APP.prefix,
            title: 'In app',
            Icon: ShareIcon,
            desktopOnly: false,
            end: true,
          },
          {
            path: routes.SHARED_VIA_LINK.prefix,
            title: 'Links',
            Icon: LinkIcon,
            desktopOnly: false,
            end: true,
          },
        ],
      },
    ],
  },
};

i18n.on('languageChanged init', async () => {
  if (!i18n.hasLoadedNamespace('files')) {
    try {
      await i18n.loadNamespaces('files');
    } catch (error) {
      console.error('Error loading files namespace:', error);
    }
  }

  const { t } = i18n;

  config.title = t('nav.title', { ns: 'files', defaultValue: 'Files' });
  config.menu.sections[0].items[0].title = t('nav.home', { ns: 'files', defaultValue: 'Home' });
  config.menu.sections[0].items[1].title = t('nav.saved', { ns: 'files', defaultValue: 'Saved' });
  config.menu.sections[0].items[2].title = t('nav.trash', { ns: 'files', defaultValue: 'Trash' });

  config.menu.sections[1].title = t('nav.sharing', { ns: 'files', defaultValue: 'Sharing' });
  config.menu.sections[1].items![0].title = t('nav.inApp', { ns: 'files', defaultValue: 'In app' });
  config.menu.sections[1].items![1].title = t('nav.links', { ns: 'files', defaultValue: 'Links' });
});

export default config;
