import React from 'react';

import { useListMediaItemCategoriesQuery } from 'store/mediaItems';

import Spinner from 'components/ui/Spinner';

import CategoryListItem from './CategoryListItem';

interface Props {
  fileId: string;
}

export default function CategoryList({ fileId }: Props) {
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
    return <p className="mt-1 italic text-gray-500 dark:text-zinc-400">No categories provided</p>;
  }

  return categories?.map(({ name }) => <CategoryListItem key={name} name={name} />);
}
