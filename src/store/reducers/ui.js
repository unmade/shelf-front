import { combineReducers } from 'redux';

import { types } from '../actions/ui';

function fileBrowser(
  state = {
    createFolderShown: false,
    fileIdToRename: null,
  },
  action,
) {
  switch (action.type) {
    case types.TOGGLE_CREATE_FOLDER_SHOWN: {
      return {
        ...state,
        createFolderShown: !state.createFolderShown,
      };
    }
    case types.OPEN_RENAME_FILE_DIALOG: {
      const { fileId } = action.payload;
      return {
        ...state,
        fileIdToRename: fileId,
      };
    }
    case types.CLOSE_RENAME_FILE_DIALOG: {
      return {
        ...state,
        fileIdToRename: null,
      };
    }
    default:
      return state;
  }
}

export default combineReducers({
  fileBrowser,
});

export const getCreateFolderShown = (state) => state.ui.fileBrowser.createFolderShown;
export const getFileIdToRename = (state) => state.ui.fileBrowser.fileIdToRename;
