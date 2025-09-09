import i18n from 'i18n';

import { type AppConfig } from 'types/AppConfig';

import * as routes from 'routes';
import {
  BookmarkOutlined,
  DocumentSearchOutlined,
  FilesAppIcon,
  HomeOutlined,
  LinkOutlined,
  ShareOutlined,
  TrashOutlined,
} from 'icons';

const config: AppConfig = {
  key: 'files',
  title: i18n.t('filesApp.title'),
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
            title: i18n.t('Home', { defaultValue: 'Home' }),
            Icon: HomeOutlined,
            desktopOnly: false,
            end: false,
          },
          {
            path: routes.BOOKMARKS.prefix,
            title: i18n.t('Saved', { defaultValue: 'Saved' }),
            Icon: BookmarkOutlined,
            desktopOnly: false,
            end: false,
          },
          {
            path: routes.DUPLICATES.prefix,
            title: i18n.t('Duplicates', { defaultValue: 'Duplicates' }),
            Icon: DocumentSearchOutlined,
            desktopOnly: true,
            end: false,
          },
          {
            path: routes.TRASH.prefix,
            title: i18n.t('Trash', { defaultValue: 'Trash' }),
            Icon: TrashOutlined,
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
            Icon: ShareOutlined,
            desktopOnly: false,
            end: true,
          },
          {
            path: routes.SHARED_VIA_LINK.prefix,
            title: i18n.t('Links', { defaultValue: 'Links' }),
            Icon: LinkOutlined,
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
