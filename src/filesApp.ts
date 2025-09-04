import type { AppConfig } from 'types/AppConfig';

import i18n from 'i18n';

import * as icons from 'icons';
import * as routes from 'routes';

const config: AppConfig = {
  key: 'files',
  title: i18n.t('filesApp.title'),
  path: routes.FILES.prefix,
  menu: {
    sections: [
      {
        key: 'general',
        title: undefined,
        items: [
          {
            path: routes.FILES.prefix,
            title: i18n.t('Home', { defaultValue: 'Home' }),
            icon: icons.HomeOutlined,
            desktopOnly: false,
            end: false,
          },
          {
            path: routes.BOOKMARKS.prefix,
            title: i18n.t('Saved', { defaultValue: 'Saved' }),
            icon: icons.BookmarkOutlined,
            desktopOnly: false,
            end: false,
          },
          {
            path: routes.DUPLICATES.prefix,
            title: i18n.t('Duplicates', { defaultValue: 'Duplicates' }),
            icon: icons.DocumentSearchOutlined,
            desktopOnly: true,
            end: false,
          },
          {
            path: routes.TRASH.prefix,
            title: i18n.t('Trash', { defaultValue: 'Trash' }),
            icon: icons.TrashOutlined,
            desktopOnly: false,
            end: false,
          },
        ],
      },
      {
        key: 'sharing',
        title: i18n.t('Sharing', { defaultValue: 'Sharing' }),
        items: [
          {
            path: routes.SHARED_IN_APP.prefix,
            title: i18n.t('In app', { defaultValue: 'In app' }),
            icon: icons.ShareOutlined,
            desktopOnly: false,
            end: true,
          },
          {
            path: routes.SHARED_VIA_LINK.prefix,
            title: i18n.t('Links', { defaultValue: 'Links' }),
            icon: icons.LinkOutlined,
            desktopOnly: false,
            end: true,
          },
        ],
      },
    ],
  },
};

i18n.on('languageChanged init', () => {
  config.title = i18n.t('filesApp.title', { defaultValue: 'Files' });
  config.menu.sections[0].items[0].title = i18n.t('Home');
  config.menu.sections[0].items[1].title = i18n.t('Saved');
  config.menu.sections[0].items[2].title = i18n.t('Duplicates');
  config.menu.sections[0].items[3].title = i18n.t('Trash');

  config.menu.sections[1].title = i18n.t('Sharing', { defaultValue: 'Sharing' });
  config.menu.sections[1].items![0].title = i18n.t('In app');
  config.menu.sections[1].items![1].title = i18n.t('Links');
});

export default config;
