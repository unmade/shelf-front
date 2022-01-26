import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import moment from 'moment/min/moment-with-locales';

function TimeAgo({ mtime, format = null }) {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const dt =
    format != null
      ? moment(mtime).locale(lang).format(format)
      : moment(mtime).locale(lang).fromNow();
  return <>{dt}</>;
}

TimeAgo.propTypes = {
  mtime: PropTypes.number.isRequired,
};

export default TimeAgo;
