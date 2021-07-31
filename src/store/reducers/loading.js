import { types as authTypes } from '../actions/auth';
import { types as fileTypes } from '../actions/files';
import { scopes, types } from '../actions/loading';

function loading(state = {}, action) {
  switch (action.type) {
    case types.SET_LOADING: {
      const { scope, value } = action.payload;
      return {
        ...state,
        [scope]: value,
      };
    }
    case authTypes.SIGN_IN_FAILURE:
    case authTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        [scopes.signingIn]: false,
      };
    case fileTypes.CREATE_FOLDER_FAILURE:
    case fileTypes.CREATE_FOLDER_SUCCESS:
      return {
        ...state,
        [scopes.creatingFolder]: false,
      };
    case fileTypes.DELETE_IMMEDIATELY_FAILURE:
    case fileTypes.DELETE_IMMEDIATELY_SUCCESS:
      return {
        ...state,
        [scopes.deletingFileImmediately]: false,
      };
    case fileTypes.EMPTY_TRASH_FAILURE:
    case fileTypes.EMPTY_TRASH_SUCCESS:
      return {
        ...state,
        [scopes.emptyingTrash]: false,
      };
    case fileTypes.LIST_FOLDER_FAILURE:
    case fileTypes.LIST_FOLDER_SUCCESS:
      return {
        ...state,
        [scopes.listingFolder]: false,
      };
    case fileTypes.MOVE_FILE_FAILURE:
    case fileTypes.MOVE_FILE_SUCCESS:
    case fileTypes.MOVE_FILE_BATCH_FAILURE:
    case fileTypes.MOVE_FILE_BATCH_SUCCESS:
      return {
        ...state,
        [scopes.movingFile]: false,
      };
    case fileTypes.MOVE_TO_TRASH_FAILURE:
    case fileTypes.MOVE_TO_TRASH_SUCCESS:
      return {
        ...state,
        [scopes.movingToTrash]: false,
      };
    default:
      return state;
  }
}

export default loading;

export const getLoading = (state, scope) => state.loading[scope] || false;
