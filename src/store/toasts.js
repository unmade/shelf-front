import { createSlice, nanoid } from '@reduxjs/toolkit';

const defaultCloseAfter = 10;

const initialState = [];

const toastsSlice = createSlice({
  name: 'toasts',
  initialState,
  reducers: {
    toastAdded(state, action) {
      const { id, toast } = action.payload;
      const { title, description } = toast;
      state.push({
        id,
        title,
        description,
        closeAfter: toast.closeAfter ?? defaultCloseAfter,
      });
    },
    toastRemoved(state, action) {
      const { toastId } = action.payload;
      return state.filter((item) => item.id !== toastId);
    },
  },
});

export default toastsSlice.reducer;

const { toastAdded } = toastsSlice.actions;
export const { toastRemoved } = toastsSlice.actions;

export const addToast = (toast) => (dispatch) => {
  dispatch(toastAdded({ id: nanoid(), toast }));
};

export const selectToasts = (state) => state.toasts ?? initialState;
