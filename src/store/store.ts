import {
  combineReducers,
  configureStore,
  isRejectedWithValue,
  createListenerMiddleware,
  Middleware,
} from '@reduxjs/toolkit';

import apiSlice from './apiSlice';

import auth, { signedOut, saveAuthState, loadAuthState } from './authSlice';
import browser from './browser';
import tasks from './tasks';
import toasts, { addToast } from './toasts';
import { appearance, loadAppearanceState, saveAppearanceState } from './ui';
import uploads, { fileEntriesAdded } from './uploads/slice';

import listenFileEntriesAdded from './uploads/listeners';

const reducers = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  appearance,
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

interface RejectedWithAPIError {
  payload: {
    data: {
      code: string | number;
      code_verbose: string;
      message: string;
    };
  };
}

function isRejectedWithApiError(action: unknown): action is RejectedWithAPIError {
  if (action == null) {
    return false;
  }
  if (typeof action !== 'object') {
    return false;
  }
  if (!('payload' in action)) {
    return false;
  }

  const { payload } = action;
  if (payload == null) {
    return false;
  }

  if (typeof payload !== 'object') {
    return false;
  }

  if (!('data' in payload)) {
    return false;
  }

  const { data } = payload;

  if (data == null) {
    return false;
  }

  if (typeof data !== 'object') {
    return false;
  }

  if (!('code' in data)) {
    return false;
  }

  if (!('code_verbose' in data)) {
    return false;
  }

  if (!('message' in data)) {
    return false;
  }

  const { code, code_verbose: codeVerbose, message } = data;
  if (typeof code !== 'string' || typeof code !== 'number') {
    return false;
  }
  if (typeof codeVerbose !== 'string') {
    return false;
  }
  if (typeof message !== 'string') {
    return false;
  }

  return true;
}

const ignoredErrorCodes = new Set([
  422,
  'EMAIL_ALREADY_TAKEN',
  'EMAIL_UPDATE_LIMIT_REACHED',
  'CONTENT_METADATA_NOT_FOUND',
  'INVALID_TOKEN',
  'MISSING_TOKEN',
  'OTP_CODE_ALREADY_SENT',
  'SHARED_LINK_NOT_FOUND',
]);

const errorsMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action) && isRejectedWithApiError(action)) {
      const { payload } = action;
      const { code, code_verbose: title, message: description } = payload.data;
      if (!ignoredErrorCodes.has(code) && title != null && description != null) {
        dispatch(addToast({ title, description }));
      } else {
        dispatch(addToast({ title: 'Server Error', description: 'Something went wrong' }));
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
  devTools: import.meta.env.SNOWPACK_PUBLIC_MODE !== 'production',
  preloadedState: { ...loadAuthState(), ...loadAppearanceState() },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
  saveAuthState(store.getState());
  saveAppearanceState(store.getState());
});

export default store;
