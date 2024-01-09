import React from 'react';

import * as icons from '../../../../icons';

import Button from '../../../../components/ui/Button';

function Header({ idx, total, title, onGoBack, onInfo }) {
  return (
    <div className="flex flex-row items-center justify-between px-4 py-3">
      <div className="flex flex-row sm:w-48">
        <Button
          variant="text"
          size="base"
          icon={<icons.ChevronLeftOutlined className="h-5 w-5" />}
          onClick={onGoBack}
        />
      </div>

      <div className="w-full min-w-0 px-4 sm:px-8 text-center">
        <p className="truncate text-sm font-medium">{title}</p>
        <p className="text-xs dark:text-zinc-400">
          {idx + 1} of {total}
        </p>
      </div>

      <div className="flex min-w-max flex-row items-center justify-end space-x-2 text-gray-800 dark:text-zinc-200 sm:w-48">
        <Button
          className="hidden sm:block"
          variant="text"
          size="base"
          icon={<icons.InformationCircleOutlined className="h-5 w-5" />}
          onClick={onInfo}
        />
      </div>
    </div>
  );
}

export default Header;
