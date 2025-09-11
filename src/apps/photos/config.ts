import i18n from 'i18n';

import {
  Collection,
  HeartOutlined,
  LinkOutlined,
  PhotographOutlined,
  PhotosAppIcon,
  TrashOutlined,
} from 'icons';
import * as routes from 'routes';

import { type AppConfig } from 'types/AppConfig';

const config: AppConfig = {
  key: 'photos',
  title: i18n.t('photosApp.title'),
  path: routes.PHOTOS.prefix,
  Icon: PhotosAppIcon,
  menu: {
    sections: [
      {
        key: 'general',
        title: undefined,
        items: [
          {
            path: '/photos',
            title: i18n.t('Library', { defaultValue: 'Library' }),
            Icon: PhotographOutlined,
            desktopOnly: false,
            end: true,
          },
          {
            path: '/photos/albums',
            title: i18n.t('Albums', { defaultValue: 'Albums' }),
            Icon: Collection,
            desktopOnly: false,
            end: true,
          },
          {
            path: '/photos/favourites',
            title: i18n.t('Favourites', { defaultValue: 'Favourites' }),
            Icon: HeartOutlined,
            desktopOnly: false,
            end: false,
          },
          {
            path: '/photos/trash',
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
            path: '/photos/shared-links',
            title: i18n.t('Shared links', { defaultValue: 'Shared links' }),
            Icon: LinkOutlined,
            desktopOnly: false,
            end: false,
          },
        ],
      },
    ],
  },
};

i18n.on('languageChanged init', () => {
  config.title = i18n.t('photosApp.title', { defaultValue: 'Photos' });
  config.menu.sections[0].items[0].title = i18n.t('Library');
  config.menu.sections[0].items[1].title = i18n.t('Albums');
  config.menu.sections[0].items[2].title = i18n.t('Favourites');
  config.menu.sections[0].items[3].title = i18n.t('Trash');

  config.menu.sections[1].title = i18n.t('Sharing');
  config.menu.sections[1].items[0].title = i18n.t('Shared links');
});

export default config;
