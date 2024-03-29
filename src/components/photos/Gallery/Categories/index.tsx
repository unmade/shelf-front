import React from 'react';

import AdjustButton from './AdjustButton';
import CategoryList from './CategoryList';

interface Props {
  fileId: string;
  readOnly?: boolean;
}

export default function Categories({ fileId, readOnly = false }: Props) {
  return (
    <>
      <div className="flex items-center justify-between dark:text-zinc-100 sm:text-sm">
        <h2 className="text-base font-medium">Categories</h2>
        {!readOnly && <AdjustButton fileId={fileId} />}
      </div>
      <div className="flex flex-wrap text-sm capitalize">
        <CategoryList fileId={fileId} />
      </div>
    </>
  );
}
