import React from 'react';

import * as Collapsible from '@radix-ui/react-collapsible';
import { useLocation } from 'react-router';

import useSidePreview from '@/hooks/preview-available';

import { Spinner } from '@/ui/spinner';

import FileTableCell from '../FileTableCell';
import FileTableView from '../FileTableView';

import { useBrowserData } from './BrowserDataProvider';
import SidePreview from './SidePreview';

function FileTableViewContainer() {
  const { pathname } = useLocation();

  const { ids, loading } = useBrowserData();

  if (loading) {
    return <Spinner />;
  }

  return <FileTableView items={ids ?? []} scrollKey={pathname} itemRenderer={FileTableCell} />;
}

function TableView() {
  const withSidePreview = useSidePreview();

  return (
    <div className="flex h-full flex-row overflow-y-auto">
      <div
        className={`easy-in-out h-full overflow-y-auto transition-all duration-500 ${withSidePreview ? 'w-7/12' : 'w-full'}`}
      >
        <FileTableViewContainer />
      </div>
      <Collapsible.Root
        open={withSidePreview}
        className="w-5/12 transform overflow-hidden transition-all duration-500 data-[state=closed]:pointer-events-none data-[state=closed]:w-0 data-[state=closed]:translate-x-full"
      >
        <Collapsible.Content forceMount className="h-full w-full">
          <SidePreview />
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  );
}

export default TableView;
