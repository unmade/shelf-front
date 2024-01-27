import i18n from './i18n';

import * as icons from './icons';
import * as routes from './routes';

const menu = [
  {
    path: routes.FILES.prefix,
    title: i18n.t('Home', { defaultValue: 'Home' }),
    icon: icons.HomeOutlined,
    desktopOnly: false,
    items: null,
    end: false,
  },
  {
    path: routes.BOOKMARKS.prefix,
    title: i18n.t('Saved', { defaultValue: 'Saved' }),
    icon: icons.BookmarkOutlined,
    desktopOnly: false,
    items: null,
    end: false,
  },
  {
    path: routes.DUPLICATES.prefix,
    title: i18n.t('Duplicates', { defaultValue: 'Duplicates' }),
    icon: icons.DocumentSearchOutlined,
    desktopOnly: true,
    items: null,
    end: false,
  },
  {
    path: null,
    title: i18n.t('Shared', { defaultValue: 'Shared' }),
    icon: icons.ShareOutlined,
    desktopOnly: false,
    items: [
      {
        path: routes.SHARED_IN_APP.prefix,
        title: i18n.t('In app', { defaultValue: 'In app' }),
      },
      {
        path: routes.SHARED_VIA_LINK.prefix,
        title: i18n.t('Links', { defaultValue: 'Links' }),
      },
    ],
    end: false,
  },
  {
    path: routes.TRASH.prefix,
    title: i18n.t('Trash', { defaultValue: 'Trash' }),
    icon: icons.TrashOutlined,
    desktopOnly: false,
    items: null,
    end: false,
  },
];

i18n.on('languageChanged init', () => {
  menu[0].title = i18n.t('Home');
  menu[1].title = i18n.t('Saved');
  menu[2].title = i18n.t('Duplicates');
  menu[3].title = i18n.t('Shared');
  menu[3].items[0].title = i18n.t('In app');
  menu[3].items[1].title = i18n.t('Links');
  menu[4].title = i18n.t('Trash');
});

export default menu;
