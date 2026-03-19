import type { Middleware, TypedStartListening } from '@reduxjs/toolkit';
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
import uploads, { fileEntriesAdded } from './uploads/slice';

import listenFileEntriesAdded from './uploads/listeners';
import { toast } from '@/ui/sonner';

const reducers = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth,
  browser,
  tasks,
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

export function isFetchBaseQueryErrorWithApiErrorCode(
  error: unknown,
  code: string | number,
): error is { status: unknown; data: APIError } {
  return isFetchBaseQueryError(error) && isApiError(error.data) && error.data?.code === code;
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
  return (
    isRejectedWithValue(action) &&
    typeof action.payload === 'object' &&
    action.payload != null &&
    'data' in action.payload &&
    isApiError(action.payload.data)
  );
}

function isServerError(action: unknown): boolean {
  return (
    isRejectedWithValue(action) &&
    typeof action.payload === 'object' &&
    action.payload != null &&
    'status' in action.payload &&
    action.payload.status === 'FETCH_ERROR'
  );
}

const ignoredErrorCodes = new Set([
  422,
  // Accounts
  'EMAIL_ALREADY_TAKEN',
  'EMAIL_UPDATE_LIMIT_REACHED',
  'EMAIL_UPDATE_NOT_STARTED',
  'OTP_CODE_ALREADY_SENT',
  'USER_EMAIL_ALREADY_VERIFIED',
  'USER_EMAIL_IS_MISSING',

  // Auth
  'INVALID_CREDENTIALS',
  'INVALID_TOKEN',
  'MISSING_TOKEN',
  'SIGN_UP_DISABLED',
  'USER_ALREADY_EXISTS',

  // Files
  'ACTION_NOT_ALLOWED',
  'CONTENT_METADATA_NOT_FOUND',
  'FILE_ALREADY_EXISTS',
  'NOT_A_DIRECTORY',

  // Sharing
  'FILE_MEMBER_ALREADY_EXISTS',
  'SHARED_LINK_NOT_FOUND',

  // Users
  'USER_NOT_FOUND',
]);

const errorsMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithApiError(action)) {
    const { payload } = action;
    const { code, code_verbose: title, message: description } = payload.data;
    if (!ignoredErrorCodes.has(code)) {
      if (title != null && description != null) {
        toast.error(title, { description });
      } else {
        toast.error('Server Error', { description: 'Something went wrong' });
      }
    }
  } else if (isServerError(action)) {
    toast.error('Server Error', { description: 'Something went wrong' });
  }

  return next(action);
};

const listenerMiddleware = createListenerMiddleware<RootState>();

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

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;

(listenerMiddleware.startListening as TypedStartListening<RootState, AppDispatch>)({
  actionCreator: fileEntriesAdded,
  effect: listenFileEntriesAdded,
});

store.subscribe(() => {
  saveAuthState(store.getState());
});

export default store;
