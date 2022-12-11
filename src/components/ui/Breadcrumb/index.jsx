import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import i18n from '../../../i18n';

import * as icons from '../../../icons';
import * as routes from '../../../routes';

import { useCreateFolderDialog } from '../../CreateFolderDialogProvider';

import Button from '../Button';
import Menu from '../Menu';

import BreadcrumbItem from './BreadcrumbItem';
import BreadcrumbItemCollapsed from './BreadcrumbItemCollapsed';

const breadcrumbsAliases = {
  files: {
    Icon: icons.Home,
    name: i18n.t('Home'),
    url: routes.FILES.prefix,
    path: '.',
  },
  trash: {
    Icon: icons.Trash,
    name: i18n.t('Trash'),
    url: routes.TRASH.prefix,
    path: 'trash',
  },
};

i18n.on('languageChanged init', () => {
  breadcrumbsAliases.files.name = i18n.t('Home');
  breadcrumbsAliases.trash.name = i18n.t('Trash');
});

export function breadcrumbs(path) {
  const items = [];

  if (path.toLowerCase() === 'trash' || path.toLowerCase().startsWith('trash/')) {
    items.push(breadcrumbsAliases.trash);
  } else {
    items.push(breadcrumbsAliases.files);
  }

  if (routes.isRoot(path)) {
    return items;
  }

  path.split('/').forEach((part, idx) => {
    items.push({
      Icon: icons.Folder,
      name: part,
      url: routes.join(items[idx].url, routes.encodePath(part)),
      path: routes.join(items[idx].path, part),
    });
  });

  return items;
}

function Breadcrumb({
  className,
  path,
  withCreateFolder,
  itemRender: Render,
  itemRenderCollapsed: RenderCollapsed,
}) {
  const { t } = useTranslation();

  const openCreateFolderDialog = useCreateFolderDialog();

  const items = breadcrumbs(path);
  if (items.length < 4) {
    return (
      <nav
        className={`${className} flex items-center space-x-1 whitespace-nowrap font-medium text-gray-500 dark:text-zinc-400 sm:space-x-4`}
      >
        {items.map((item, idx) => (
          <React.Fragment key={item.url}>
            {idx !== 0 && (
              <icons.ChevronRight className="h-4 w-4 shrink-0 text-gray-300 dark:text-zinc-600" />
            )}
            <span className="flex max-w-xs items-center truncate">
              {idx === 0 && (
                <span className="py-2 sm:py-1">
                  <item.Icon className="mr-2 h-4 w-4 shrink-0 text-gray-300 dark:text-zinc-600" />
                </span>
              )}
              <Render name={item.name} url={item.url} path={item.path} />
            </span>
          </React.Fragment>
        ))}
        {withCreateFolder && (
          <>
            <icons.ChevronRight className="h-4 w-4 shrink-0 text-gray-300 dark:text-zinc-600" />
            <button
              type="button"
              title={t('button_create_folder_title')}
              className="rounded-lg p-2 text-gray-400 hover:bg-teal-50 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-teal-200 focus:ring-offset-2 dark:text-zinc-500 dark:hover:bg-teal-700/30 dark:focus:ring-teal-700 dark:focus:ring-offset-zinc-800 sm:p-1"
              onClick={openCreateFolderDialog}
            >
              <icons.NewFolder className="h-4 w-4" />
            </button>
          </>
        )}
      </nav>
    );
  }

  const [first, ...rest] = items;
  const last = rest.pop();

  return (
    <nav
      className={`${className} flex items-center space-x-1 whitespace-nowrap font-medium text-gray-500 dark:text-zinc-400 sm:space-x-4`}
    >
      <span className="flex max-w-xs items-center">
        <first.Icon className="mr-2 h-4 w-4 shrink-0 text-gray-300 dark:text-zinc-600" />
        <Render name={first.name} url={first.url} path={first.path} />
      </span>
      <div>
        <icons.ChevronRight className="h-4 w-4 shrink-0 text-gray-300 dark:text-zinc-600" />
      </div>
      <Menu
        panelClassName="max-w-xs"
        items={rest}
        itemRender={({ item }) => (
          <RenderCollapsed name={item.name} url={item.url} path={item.path} />
        )}
      >
        <Button
          as="div"
          type="text"
          size="xs"
          icon={<icons.DotsHorizontal className="h-4 w-4 dark:text-zinc-600" />}
        />
      </Menu>
      <div>
        <icons.ChevronRight className="h-4 w-4 shrink-0 text-gray-300 dark:text-zinc-600" />
      </div>
      <span className="max-w-2xs">
        <Render name={last.name} url={last.url} path={last.path} />
      </span>
      {withCreateFolder && (
        <>
          <icons.ChevronRight className="h-4 w-4 shrink-0 text-gray-300 dark:text-zinc-600" />
          <button
            type="button"
            className="rounded-lg p-2 text-gray-400 hover:bg-teal-50 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-teal-200 focus:ring-offset-2 dark:text-zinc-500 dark:hover:bg-teal-700/30 dark:focus:ring-teal-700 dark:focus:ring-offset-zinc-800 sm:p-1"
            onClick={openCreateFolderDialog}
          >
            <icons.NewFolder className="h-4 w-4 shrink-0" />
          </button>
        </>
      )}
    </nav>
  );
}

Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.ItemCollapsed = BreadcrumbItemCollapsed;

Breadcrumb.propTypes = {
  className: PropTypes.string,
  path: PropTypes.string.isRequired,
  itemRender: PropTypes.elementType.isRequired,
  itemRenderCollapsed: PropTypes.func.isRequired,
};

Breadcrumb.defaultProps = {
  className: '',
};

export default Breadcrumb;
