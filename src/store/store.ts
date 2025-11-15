import type { Middleware } from '@reduxjs/toolkit';
import {
  combineReducers,
  configureStore,
  isRejectedWithValue,
  createListenerMiddleware,
} from '@reduxjs/toolkit';

import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import apiSlice from './apiSlice';

import auth, { signedOut, saveAuthState, loadAuthState } from './authSlice';
import browser from './browser';
import tasks from './tasks';
import toasts, { addToast } from './toasts';
import uploads, { fileEntriesAdded } from './uploads/slice';

import listenFileEntriesAdded from './uploads/listeners';

const reducers = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth,
  browser,
  tasks,
  toasts,
  uploads,
});

// @ts-expect-error don't bother to annotate
function rootReducer(state, action) {
  if (action.type === signedOut.type) {
    return reducers(undefined, action);
  }
  return reducers(state, action);
}

interface APIError {
  code: string | number;
  code_verbose: string;
  message: string;
}

interface RejectedWithAPIError {
  payload: {
    data: APIError;
  };
}

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

export function isFetchBaseQueryErrorWithApiError(
  error: unknown,
): error is { status: unknown; data: APIError } {
  return isFetchBaseQueryError(error) && isApiError(error.data);
}

function isApiError(data: unknown): data is APIError {
  return (
    typeof data === 'object' &&
    data != null &&
    'code' in data &&
    (typeof data.code === 'string' || typeof data.code === 'number') &&
    'code_verbose' in data &&
    typeof data.code_verbose === 'string' &&
    'message' in data &&
    typeof data.message === 'string'
  );
}

function isRejectedWithApiError(action: unknown): action is RejectedWithAPIError {
  if (!isRejectedWithValue(action)) {
    return false;
  }

  return (
    isRejectedWithValue(action) &&
    typeof action.payload === 'object' &&
    action.payload != null &&
    'data' in action.payload &&
    isApiError(action.payload.data)
  );
}

const ignoredErrorCodes = new Set([
  422,
  'EMAIL_ALREADY_TAKEN',
  'EMAIL_UPDATE_LIMIT_REACHED',
  'EMAIL_UPDATE_NOT_STARTED',
  'CONTENT_METADATA_NOT_FOUND',
  'INVALID_CREDENTIALS',
  'INVALID_TOKEN',
  'MISSING_TOKEN',
  'OTP_CODE_ALREADY_SENT',
  'SIGN_UP_DISABLED',
  'SHARED_LINK_NOT_FOUND',
  'USER_ALREADY_EXISTS',
  'USER_EMAIL_ALREADY_VERIFIED',
  'USER_EMAIL_IS_MISSING',
]);

const errorsMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithApiError(action)) {
      const { payload } = action;
      const { code, code_verbose: title, message: description } = payload.data;
      if (!ignoredErrorCodes.has(code)) {
        if (title != null && description != null) {
          dispatch(addToast({ title, description }));
        } else {
          dispatch(addToast({ title: 'Server Error', description: 'Something went wrong' }));
        }
      }
    }

    return next(action);
  };

const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  actionCreator: fileEntriesAdded,
  effect: listenFileEntriesAdded,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [fileEntriesAdded.type],
      },
    })
      .prepend(listenerMiddleware.middleware)
      .concat(apiSlice.middleware)
      .concat(errorsMiddleware),
  devTools: import.meta.env.MODE !== 'production',
  preloadedState: { ...loadAuthState() },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
  saveAuthState(store.getState());
  // saveAppearanceState(store.getState());
});

export default store;
