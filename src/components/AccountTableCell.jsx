import React from 'react';
import PropTypes from 'prop-types';

function AccountTableCell({ className, id }) {
  const account = { id };
  const fullName = [account.first_name, account.last_name].join(' ').trim() || '-';
  return (
    <tr className={className}>
      <td className="rounded-tl-xl rounded-bl-xl px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-gray-600">
            {account.username.substring(0, 1).toUpperCase()}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{account.username}</div>
            <div className="text-sm text-gray-500">{account.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{fullName}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="inline-flex rounded-full bg-emerald-100 px-2 text-xs leading-5 font-semibold text-emerald-800">
          Active
        </span>
      </td>
      <td className="rounded-tr-xl rounded-br-xl px-6 py-4 text-sm whitespace-nowrap text-gray-500">
        {account.superuser ? 'Superuser' : 'Member'}
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
