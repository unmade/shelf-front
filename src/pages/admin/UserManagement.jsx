import React from 'react';

import * as icons from '../../icons';

import Button from '../../components/ui/Button';

import AccountTableCell from '../../components/AccountTableCell';

function UserManagement() {
  const ids = null;

  return (
    <div>
      <div className="flex items-center justify-between px-8 py-7">
        <h2 className="truncate text-xl font-medium text-gray-900 sm:text-3xl">User Management</h2>
        <div className="ml-6 flex items-center space-x-8 text-2xl">
          <Button
            as="div"
            type="primary"
            title="Uploads"
            size="lg"
            icon={<icons.Plus className="h-5 w-5 shrink-0" />}
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
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Username
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
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
