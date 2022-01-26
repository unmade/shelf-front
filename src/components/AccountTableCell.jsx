import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { getAccountById } from '../store/reducers/accounts';

function AccountTableCell({ className, id }) {
  const account = useSelector((state) => getAccountById(state, { id }));
  const fullName = [account.first_name, account.last_name].join(' ').trim() || '-';
  return (
    <tr className={className}>
      <td className="px-6 py-4 rounded-tl-xl rounded-bl-xl whitespace-nowrap">
        <div className="flex items-center">
          <div className="shrink-0 h-10 w-10 flex items-center justify-center border rounded-full bg-gray-50 border-gray-200 text-gray-600">
            {account.username.substring(0, 1).toUpperCase()}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {account.username}
            </div>
            <div className="text-sm text-gray-500">
              {account.email}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {fullName}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
          Active
        </span>
      </td>
      <td className="px-6 py-4 rounded-tr-xl rounded-br-xl whitespace-nowrap text-sm text-gray-500">
        {(account.superuser) ? 'Superuser' : 'Member'}
      </td>
    </tr>
  );
}

export default AccountTableCell;

AccountTableCell.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
};

AccountTableCell.defaultProps = {
  className: '',
};
