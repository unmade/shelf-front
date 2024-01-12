import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import moment from 'moment/min/moment-with-locales';

function TimeAgo({ className, format, mtime }) {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const dt =
    format != null
      ? moment(mtime).locale(lang).format(format)
      : moment(mtime).locale(lang).fromNow();
  return <span className={className}>{dt}</span>;
}

TimeAgo.propTypes = {
  format: PropTypes.string,
  mtime: PropTypes.number.isRequired,
};

TimeAgo.defaultProps = {
  format: null,
};

export default TimeAgo;
