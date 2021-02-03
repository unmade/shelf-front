import { combineReducers } from 'redux';

import { types } from '../actions/ui';

function fileBrowser(
  state = {
    createFolderShown: false,
    emptyTrashDialogVisible: false,
    fileIdToRename: null,
    fileIdToDelete: null,
    fileIdToMove: null,
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
    case types.TOGGLE_EMPTY_TRASH_DIALOG: {
      return {
        ...state,
        emptyTrashDialogVisible: !state.emptyTrashDialogVisible,
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
    case types.OPEN_DELETE_DIALOG: {
      const { fileId } = action.payload;
      return {
        ...state,
        fileIdToDelete: fileId,
      };
    }
    case types.CLOSE_DELETE_DIALOG: {
      return {
        ...state,
        fileIdToDelete: null,
      };
    }
    case types.OPEN_MOVE_DIALOG: {
      const { fileId } = action.payload;
      return {
        ...state,
        fileIdToMove: fileId,
      };
    }
    case types.CLOSE_MOVE_DIALOG: {
      return {
        ...state,
        fileIdToMove: null,
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
export const getEmptyTrashDialogVisible = (state) => state.ui.fileBrowser.emptyTrashDialogVisible;
export const getFileIdToRename = (state) => state.ui.fileBrowser.fileIdToRename;
export const getFileIdToDelete = (state) => state.ui.fileBrowser.fileIdToDelete;
export const getFileIdToMove = (state) => state.ui.fileBrowser.fileIdToMove;
