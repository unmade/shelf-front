import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '@/icons';
import * as routes from '@/routes';

import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/ui/empty';

import { Breadcrumbs } from '@/apps/files/components/breadcrumbs';

import FolderPickerList from './FolderPickerList';

const FolderPicker = ({
  className,
  emptyTitle,
  emptyDescription,
  excludeIds,
  initialPath,
  onPathChange,
}) => {
  const [path, setPath] = React.useState(initialPath);

  const changePath = (nextPath, onPathChangeCallback) => (event) => {
    event.preventDefault();
    event.stopPropagation();
    setPath(nextPath);
    onPathChangeCallback(nextPath);
  };

  const onItemClick = (nextPath) => changePath(nextPath, onPathChange);

  const breadcrumbs = routes.breadcrumbs(path).map(({ key, name, path: itemPath }) => ({
    key,
    name,
    onClick: changePath(itemPath, onPathChange),
  }));

  return (
    <div className={className}>
      <Breadcrumbs items={breadcrumbs} collapseAfter={1} />
      <div className="mt-1 flex flex-1 flex-col rounded-lg border border-gray-200 dark:border-zinc-700">
        <FolderPickerList
          path={path}
          excludeIds={excludeIds}
          onItemClick={onItemClick}
          emptyView={
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <icons.Collection />
                </EmptyMedia>
                <EmptyTitle>{emptyTitle}</EmptyTitle>
                <EmptyDescription>{emptyDescription}</EmptyDescription>
              </EmptyHeader>
            </Empty>
          }
        />
      </div>
    </div>
  );
};

FolderPicker.propTypes = {
  emptyTitle: PropTypes.string,
  emptyDescription: PropTypes.string,
  excludeIds: PropTypes.arrayOf(PropTypes.string.isRequired),
  initialPath: PropTypes.string,
  onPathChange: PropTypes.func.isRequired,
};

FolderPicker.defaultProps = {
  emptyTitle: '',
  emptyDescription: '',
  initialPath: '.',
  excludeIds: [],
};

export default FolderPicker;
