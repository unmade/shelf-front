import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { listAccounts } from '../../store/actions/accounts';

import { getAccountsIdsByPage } from '../../store/reducers/accounts';

import * as icons from '../../icons';

import Button from '../../components/ui/Button';

import AccountTableCell from '../../components/AccountTableCell';

function UserManagement() {
  const dispatch = useDispatch();
  const [page] = useState(1);
  const ids = useSelector((state) => getAccountsIdsByPage(state, { page }));
  React.useEffect(() => {
    if (ids == null) {
      dispatch(listAccounts(page));
    }
  }, [ids, page, dispatch]);
  return (
    <div>
      <div className="px-8 pt-4 flex items-center justify-between">
        <h2 className="text-gray-900 truncate text-xl sm:text-3xl font-medium">
          User Management
        </h2>
        <div className="ml-6 flex text-2xl items-center space-x-8">
          <Button
            as="div"
            type="primary"
            title="Uploads"
            size="lg"
            icon={<icons.Plus className="flex-shrink-0 w-5 h-5" />}
          />
        </div>
      </div>

      <div className="flex flex-col px-8 pt-8">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Username
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {ids?.map((id) => (
                    <AccountTableCell key={id} id={id} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
