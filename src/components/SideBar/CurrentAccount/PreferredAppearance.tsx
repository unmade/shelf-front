import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from 'hooks';
import * as icons from 'icons';

import { appearanceChanged, selectAppearance } from 'store/ui';

import Button from 'components/ui/Button';
import Listbox from 'components/ui/Listbox';

interface Option {
  name: string;
  value: string;
}

export default function PreferredAppearance() {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const options: Option[] = [
    { name: t('Light'), value: 'light' },
    { name: t('Dark'), value: 'dark' },
    { name: t('Auto'), value: 'auto' },
  ];

  const appearance = useAppSelector(selectAppearance);
  const currentOption = options.find(({ value }) => value === appearance)!;

  const onOptionChange = (option: Option) => {
    dispatch(appearanceChanged({ appearance: option.value }));
  };

  return (
    <Listbox
      initial={currentOption}
      options={options}
      placement="right-end"
      onOptionChange={onOptionChange}
    >
      <Button full variant="text" icon={<icons.MoonOutlined className="h-5 w-5" />}>
        <div className="my-1">
          {t('Appearance')}: {currentOption.name.toLowerCase()}
        </div>
      </Button>
    </Listbox>
  );
}
