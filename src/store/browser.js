import { combineReducers, createSelector, createSlice } from '@reduxjs/toolkit';

const currentPath = createSlice({
  name: 'currentPath',
  initialState: '.',
  reducers: {
    fileBrowserPathChanged(_state, action) {
      const { path } = action.payload;
      return path;
    },
  },
});

export const { fileBrowserPathChanged } = currentPath.actions;

export const selectCurrentPath = (state) => state.browser.currentPath;

const selectionInitialState = [];

const selection = createSlice({
  name: 'selection',
  initialState: selectionInitialState,
  reducers: {
    filesSelectionChanged(_state, action) {
      const { ids } = action.payload;
      return [...ids];
    },
    fileSelectionCleared() {
      return selectionInitialState;
    },
    fileSelectionToggled(state, action) {
      const { id } = action.payload;
      const idx = state.indexOf(id);
      if (idx === -1) {
        return [...state, id];
      }
      return [...state.slice(0, idx), ...state.slice(idx + 1)];
    },
  },
});

export const { filesSelectionChanged, fileSelectionCleared, fileSelectionToggled } =
  selection.actions;

export const selectAllSelectedFileIds = createSelector(
  [(state) => state.browser.selection],
  (items) => new Set(items)
);

const scrollOffset = createSlice({
  name: 'scrollOffset',
  initialState: {},
  reducers: {
    scrollOffsetChanged(state, action) {
      const { key, offset } = action.payload;
      if (state[key] !== offset) {
        state[key] = offset;
      }
    },
  },
});

export const { scrollOffsetChanged: fileBrowserScrollOffsetChanged } = scrollOffset.actions;

export const selectScrollOffset = (state, key) => state.browser.scrollOffset[key] ?? 0;

export default combineReducers({
  [currentPath.name]: currentPath.reducer,
  [selection.name]: selection.reducer,
  [scrollOffset.name]: scrollOffset.reducer,
});
