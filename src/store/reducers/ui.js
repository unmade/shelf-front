import { combineReducers } from 'redux';

import { types } from '../actions/ui';

function fileBrowser(state = { createFolderShown: false }, action) {
  switch (action.type) {
    case types.TOGGLE_CREATE_FOLDER_SHOWN: {
      return {
        ...state,
        createFolderShown: !state.createFolderShown,
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
