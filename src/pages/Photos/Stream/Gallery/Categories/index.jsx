import React from 'react';
import PropTypes from 'prop-types';

import { useListMediaItemCategoriesQuery } from '../../../../../store/photos';

import Button from '../../../../../components/ui/Button';
import Spinner from '../../../../../components/ui/Spinner';

import { useAdjustCategoriesDialogContext } from '../AdjustCategoriesDialogProvider';

function AdjustButton({ fileId }) {
  const { openDialog } = useAdjustCategoriesDialogContext();

  return (
    <>
      <Button
        className="md:hidden"
        size="xs"
        variant="text"
        onClick={() => {
          openDialog(fileId);
        }}
      >
        <span className="font-medium dark:text-indigo-500">Adjust</span>
      </Button>
      <Button
        className="hidden md:block"
        variant="text"
        onClick={() => {
          openDialog(fileId);
        }}
      >
        <span className="font-medium dark:text-indigo-500">Adjust</span>
      </Button>
    </>
  );
}

AdjustButton.propTypes = {
  fileId: PropTypes.string.isRequired,
};

function CategoryListItem({ name }) {
  return (
    <div className="mr-2 mt-2 flex items-center rounded-lg px-3 py-1 dark:bg-zinc-700">{name}</div>
  );
}

CategoryListItem.propTypes = {
  name: PropTypes.string.isRequired,
};

function CategoryList({ fileId }) {
  const { categories, loading } = useListMediaItemCategoriesQuery(fileId, {
    selectFromResult: ({ data, isFetching }) => ({
      categories: data?.categories,
      loading: isFetching,
    }),
  });

  if (loading) {
    return <Spinner className="h-4 w-4" />;
  }

  if (!categories?.length) {
    return <p className="mt-1 italic dark:text-zinc-400">No categories provided</p>;
  }

  return categories?.map(({ name }) => <CategoryListItem key={name} name={name} />);
}

CategoryList.propTypes = {
  fileId: PropTypes.string.isRequired,
};

function Categories({ fileId }) {
  return (
    <>
      <div className="flex items-center justify-between dark:text-zinc-100 sm:text-sm">
        <h2 className="text-base font-medium">Categories</h2>
        <AdjustButton fileId={fileId} />
      </div>
      <div className="flex flex-wrap text-sm capitalize">
        <CategoryList fileId={fileId} />
      </div>
    </>
  );
}

Categories.propTypes = {
  fileId: PropTypes.string.isRequired,
};

export default Categories;
