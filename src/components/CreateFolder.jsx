import React from 'react';

import * as icons from '../icons';

import Modal from './Modal';

function CreateFolder({ visible, onClose }) {
  return (
    <Modal visible={visible} onClose={onClose}>
      <div className="bg-white rounded-lg overflow-hidden z-50">
        <div className="flex flex-row p-4">
          <div className="w-12 h-12 flex items-center justify-center bg-gray-75 rounded-full">
            <icons.Folder className="h-6 w-6 text-blue-400" />
          </div>

          <div className="flex-1 ml-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              New Folder
            </h3>
            <form className="text-sm mt-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="input"
                className="p-1 border rounded focus:outline-none focus:shadow-outline"
                placeholder="Folder name"
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
              />
            </form>
          </div>
        </div>

        <div className="bg-gray-75 px-4 py-3 sm:flex sm:flex-row-reverse">
          <span className="flex w-full rounded-md shadow-sm sm:ml-2 sm:w-auto">
            <button type="button" className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-1 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5">
              Create
            </button>
          </span>
          <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
            <button type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-1 bg-white text-base leading-6 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
              Cancel
            </button>
          </span>
        </div>

      </div>
    </Modal>
  );
}

export default CreateFolder;
