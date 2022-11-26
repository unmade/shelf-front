import { createSlice } from '@reduxjs/toolkit';

const appearanceSlice = createSlice({
  name: 'appearance',
  initialState: 'auto',
  reducers: {
    appearanceChanged(_state, action) {
      const { appearance: value } = action.payload;
      return value;
    },
  },
});

export const { appearanceChanged } = appearanceSlice.actions;
export const { reducer: appearance } = appearanceSlice;

export const selectAppearance = (state) => state.appearance ?? 'auto';

const APPEARANCE_KEY = 'state.appearance';

export const saveAppearanceState = (state) => {
  localStorage.setItem(APPEARANCE_KEY, selectAppearance(state));
};

export const loadAppearanceState = () => ({
  appearance: localStorage.getItem(APPEARANCE_KEY) ?? 'auto',
});
