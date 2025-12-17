import { combineReducers, createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from './store';

const selectionInitialState: string[] = [];

const selection = createSlice({
  name: 'selection',
  initialState: selectionInitialState,
  reducers: {
    filesSelectionChanged(_state, action: PayloadAction<{ ids: string[] }>) {
      const { ids } = action.payload;
      return [...ids];
    },
    fileSelectionToggled(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      const idx = state.indexOf(id);
      if (idx === -1) {
        return [...state, id];
      }
      return [...state.slice(0, idx), ...state.slice(idx + 1)];
    },
  },
});

export const { filesSelectionChanged, fileSelectionToggled } = selection.actions;

export const selectAllSelectedFileIds = createSelector(
  [(state) => state.browser.selection],
  (items) => new Set(items),
);

const scrollOffsetInitialState: Record<string, number> = {};

const scrollOffset = createSlice({
  name: 'scrollOffset',
  initialState: scrollOffsetInitialState,
  reducers: {
    scrollOffsetChanged(state, action: PayloadAction<{ key: string; offset: number }>) {
      const { key, offset } = action.payload;
      if (state[key] !== offset) {
        state[key] = offset;
      }
    },
  },
});

export const { scrollOffsetChanged: fileBrowserScrollOffsetChanged } = scrollOffset.actions;

export const selectScrollOffset = (state: RootState, key: string) =>
  state.browser.scrollOffset[key] ?? 0;

export default combineReducers({
  [selection.name]: selection.reducer,
  [scrollOffset.name]: scrollOffset.reducer,
});
