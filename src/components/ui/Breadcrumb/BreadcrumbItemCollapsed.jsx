import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../../../icons';

import Button from '../Button';

import BreadcrumbItem from './BreadcrumbItem';

function BreadcrumbItemCollapsed({ children, className, to, onClick }) {
  return (
    <BreadcrumbItem to={to} className={className} onClick={onClick}>
      <Button type="text" icon={<icons.Folder className="text-lg text-blue-400" />} full>
        {children}
      </Button>
    </BreadcrumbItem>
  );
}

BreadcrumbItemCollapsed.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  className: PropTypes.string,
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

BreadcrumbItemCollapsed.defaultProps = {
  className: '',
  onClick: null,
};

export default BreadcrumbItemCollapsed;
