import { useTranslation } from 'react-i18next';

import { useListMediaItemCategoriesQuery } from 'store/mediaItems';

import Spinner from 'components/ui/Spinner';

import useMediaItemCategories from 'components/photos/hooks/media-item-categories';

import CategoryListItem from './CategoryListItem';

interface Props {
  fileId: string;
}

export default function CategoryList({ fileId }: Props) {
  const { t } = useTranslation(['photos']);

  const allCategories = useMediaItemCategories();

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
    return (
      <p className="mt-1 text-gray-500 italic dark:text-zinc-400">
        {t('photos:mediaItem.categories.empty.title', { defaultValue: 'No categories provided' })}
      </p>
    );
  }

  return categories?.map(({ name }) => (
    <CategoryListItem key={name} name={allCategories[name].displayName} />
  ));
}
