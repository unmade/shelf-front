import { combineReducers } from 'redux';

import { types } from '../actions/ui';
import { types as fileTypes } from '../actions/files';

function fileBrowser(
  state = {
    createFolderDialogVisible: false,
    emptyTrashDialogVisible: false,
    fileIdToRename: null,
    fileIdToDelete: null,
    fileIdToDeleteImmediately: null,
    fileIdToMove: null,
  },
  action,
) {
  switch (action.type) {
    case types.TOGGLE_CREATE_FOLDER_DIALOG_VISIBLE: {
      return {
        ...state,
        createFolderDialogVisible: !state.createFolderDialogVisible,
      };
    }
    case fileTypes.CREATE_FOLDER_SUCCESS: {
      return {
        ...state,
        createFolderDialogVisible: false,
      };
    }
    case types.TOGGLE_EMPTY_TRASH_DIALOG: {
      return {
        ...state,
        emptyTrashDialogVisible: !state.emptyTrashDialogVisible,
      };
    }
    case fileTypes.EMPTY_TRASH_SUCCESS: {
      return {
        ...state,
        emptyTrashDialogVisible: false,
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
    case fileTypes.MOVE_TO_TRASH_SUCCESS:
    case types.CLOSE_DELETE_DIALOG: {
      return {
        ...state,
        fileIdToDelete: null,
      };
    }
    case types.OPEN_DELETE_IMMEDIATELY_DIALOG: {
      const { fileId } = action.payload;
      return {
        ...state,
        fileIdToDeleteImmediately: fileId,
      };
    }
    case fileTypes.DELETE_IMMEDIATELY_SUCCESS:
    case types.CLOSE_DELETE_IMMEDIATELY_DIALOG: {
      return {
        ...state,
        fileIdToDeleteImmediately: null,
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
    case fileTypes.MOVE_FILE_SUCCESS: {
      return {
        ...state,
        fileIdToRename: null,
        fileIdToMove: null,
      };
    }
    default:
      return state;
  }
}

function uploader(state = { visibilityFilter: 'all' }, action) {
  switch (action.type) {
    case types.SET_UPLOAD_FILTER: {
      const { visibilityFilter } = action.payload;
      return {
        ...state,
        visibilityFilter,
      };
    }
    default:
      return state;
  }
}

export default combineReducers({
  fileBrowser,
  uploader,
});

export const getCreateFolderDialogVisible = (state) => state.ui.fileBrowser.createFolderDialogVisible;
export const getEmptyTrashDialogVisible = (state) => state.ui.fileBrowser.emptyTrashDialogVisible;
export const getFileIdToRename = (state) => state.ui.fileBrowser.fileIdToRename;
export const getFileIdToDelete = (state) => state.ui.fileBrowser.fileIdToDelete;
export const getFileIdToDeleteImmediately = (state) => state.ui.fileBrowser.fileIdToDeleteImmediately;
export const getFileIdToMove = (state) => state.ui.fileBrowser.fileIdToMove;

export const getUploadFilter = (state) => state.ui.uploader.visibilityFilter;
