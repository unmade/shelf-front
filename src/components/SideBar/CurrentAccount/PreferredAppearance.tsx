import { useTranslation } from 'react-i18next';

import * as icons from 'icons';

import { ColorScheme } from 'hooks/prefers-color-scheme';
import usePrefersColorScheme from 'hooks/prefers-color-scheme';

import Button from 'components/ui-legacy/Button';
import Listbox from 'components/ui-legacy/Listbox';

interface Option {
  name: string;
  value: ColorScheme;
}

export default function PreferredAppearance() {
  const { t } = useTranslation();

  const [scheme, setScheme] = usePrefersColorScheme();

  const options: Option[] = [
    { name: t('Light'), value: ColorScheme.Light },
    { name: t('Dark'), value: ColorScheme.Dark },
    { name: t('Auto'), value: ColorScheme.Auto },
  ];

  const currentOption = options.find(({ value }) => value === scheme)!;

  const onOptionChange = (option: Option) => {
    setScheme(option.value);
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
