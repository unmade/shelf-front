import { useTranslation } from 'react-i18next';

import { ColorScheme } from 'hooks/prefers-color-scheme';
import usePrefersColorScheme from 'hooks/prefers-color-scheme';

import Select from 'components/ui/Select';

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

  const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setScheme(event.target.value as ColorScheme);
  };

  return (
    <Select name="colorscheme" defaultValue={currentOption.value} onChange={onChangeHandler}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </Select>
  );
}
