import { PayloadAction, createAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { RootState } from './store';

const defaultCloseAfter = 10;

interface ToastData {
  title: string;
  description: string;
  closeAfter?: number;
}

interface Toast extends ToastData {
  id: string;
}

const initialState: Toast[] = [];

const toastsSlice = createSlice({
  name: 'toasts',
  initialState,
  reducers: {
    toastAdded(state, action: PayloadAction<Toast>) {
      const { id, title, description, closeAfter } = action.payload;
      state.push({
        id,
        title,
        description,
        closeAfter: closeAfter ?? defaultCloseAfter,
      });
    },
    toastRemoved(state, action) {
      const { toastId } = action.payload;
      return state.filter((item) => item.id !== toastId);
    },
  },
});

export default toastsSlice.reducer;

export const { toastAdded, toastRemoved } = toastsSlice.actions;

export const addToast = createAction(toastAdded.type, (toast: ToastData) => ({
  payload: {
    id: nanoid(),
    ...toast,
  },
}));

export const selectToasts = (state: RootState) => state.toasts ?? initialState;
