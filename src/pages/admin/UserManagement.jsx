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
      <div className="px-8 py-7 flex items-center justify-between">
        <h2 className="text-gray-900 truncate text-xl sm:text-3xl font-medium">
          User Management
        </h2>
        <div className="ml-6 flex text-2xl items-center space-x-8">
          <Button
            as="div"
            type="primary"
            title="Uploads"
            size="lg"
            icon={<icons.Plus className="shrink-0 w-5 h-5" />}
          />
        </div>
      </div>

      <div className="flex flex-col px-4 pt-4">
        <div className="overflow-x-auto">
          <div className="align-middle">
            <div className="overflow-hidden border-gray-200">
              <table className="min-w-full">
                <thead>
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
                <tbody className="bg-white">
                  {ids?.map((id) => (
                    <AccountTableCell key={id} id={id} className="odd:bg-gray-50" />
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
