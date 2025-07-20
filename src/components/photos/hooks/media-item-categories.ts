import { useTranslation } from 'react-i18next';

export interface MediaItemCategory {
  name: string;
  displayName: string;
}

function useMediaItemCategories() {
  const { t } = useTranslation('photos');

  const categoryList: Array<MediaItemCategory> = [
    {
      name: 'animals',
      displayName: t('mediaItem.categories.listItem.animals', { defaultValue: 'animals' }),
    },
    {
      name: 'arts',
      displayName: t('mediaItem.categories.listItem.arts', { defaultValue: 'arts' }),
    },
    {
      name: 'birthdays',
      displayName: t('mediaItem.categories.listItem.birthdays', { defaultValue: 'birthdays' }),
    },
    {
      name: 'cityscapes',
      displayName: t('mediaItem.categories.listItem.cityscapes', { defaultValue: 'cityscapes' }),
    },
    {
      name: 'cooking',
      displayName: t('mediaItem.categories.listItem.cooking', { defaultValue: 'cooking' }),
    },
    {
      name: 'crafts',
      displayName: t('mediaItem.categories.listItem.crafts', { defaultValue: 'crafts' }),
    },
    {
      name: 'documents',
      displayName: t('mediaItem.categories.listItem.documents', { defaultValue: 'documents' }),
    },
    {
      name: 'fashion',
      displayName: t('mediaItem.categories.listItem.fashion', { defaultValue: 'fashion' }),
    },
    {
      name: 'flowers',
      displayName: t('mediaItem.categories.listItem.flowers', { defaultValue: 'flowers' }),
    },
    {
      name: 'food',
      displayName: t('mediaItem.categories.listItem.food', { defaultValue: 'food' }),
    },
    {
      name: 'gardens',
      displayName: t('mediaItem.categories.listItem.gardens', { defaultValue: 'gardens' }),
    },
    {
      name: 'holidays',
      displayName: t('mediaItem.categories.listItem.holidays', { defaultValue: 'holidays' }),
    },
    {
      name: 'houses',
      displayName: t('mediaItem.categories.listItem.houses', { defaultValue: 'houses' }),
    },
    {
      name: 'landmarks',
      displayName: t('mediaItem.categories.listItem.landmarks', { defaultValue: 'landmarks' }),
    },
    {
      name: 'landscapes',
      displayName: t('mediaItem.categories.listItem.landscapes', { defaultValue: 'landscapes' }),
    },
    {
      name: 'night',
      displayName: t('mediaItem.categories.listItem.night', { defaultValue: 'night' }),
    },
    {
      name: 'party',
      displayName: t('mediaItem.categories.listItem.party', { defaultValue: 'party' }),
    },
    {
      name: 'people',
      displayName: t('mediaItem.categories.listItem.people', { defaultValue: 'people' }),
    },
    {
      name: 'pets',
      displayName: t('mediaItem.categories.listItem.pets', { defaultValue: 'pets' }),
    },
    {
      name: 'performances',
      displayName: t('mediaItem.categories.listItem.performances', {
        defaultValue: 'performances',
      }),
    },
    {
      name: 'receipts',
      displayName: t('mediaItem.categories.listItem.receipts', { defaultValue: 'receipts' }),
    },
    {
      name: 'school',
      displayName: t('mediaItem.categories.listItem.school', { defaultValue: 'school' }),
    },
    {
      name: 'screenshots',
      displayName: t('mediaItem.categories.listItem.screenshots', { defaultValue: 'screenshots' }),
    },
    {
      name: 'selfies',
      displayName: t('mediaItem.categories.listItem.selfies', { defaultValue: 'selfies' }),
    },
    {
      name: 'shopping',
      displayName: t('mediaItem.categories.listItem.shopping', { defaultValue: 'shopping' }),
    },
    {
      name: 'sport',
      displayName: t('mediaItem.categories.listItem.sport', { defaultValue: 'sport' }),
    },
    {
      name: 'travel',
      displayName: t('mediaItem.categories.listItem.travel', { defaultValue: 'travel' }),
    },
    {
      name: 'utility',
      displayName: t('mediaItem.categories.listItem.utility', { defaultValue: 'utility' }),
    },
    {
      name: 'weddings',
      displayName: t('mediaItem.categories.listItem.weddings', { defaultValue: 'weddings' }),
    },
    {
      name: 'whiteboards',
      displayName: t('mediaItem.categories.listItem.whiteboards', { defaultValue: 'whiteboards' }),
    },
  ];

  return Object.fromEntries(categoryList.map((category) => [category.name, category]));
}

export default useMediaItemCategories;
