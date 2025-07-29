import { useTranslation } from 'react-i18next';

import moment from 'moment/min/moment-with-locales';

interface Props {
  className?: string;
  format?: string;
  value: string | number;
}

export default function TimeAgo({ className = '', format, value }: Props) {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const dt =
    format != null
      ? moment(value).locale(lang).format(format)
      : moment(value).locale(lang).fromNow();
  return <span className={className}>{dt}</span>;
}
