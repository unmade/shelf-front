import { combineReducers, configureStore, isRejectedWithValue } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import apiSlice from './apiSlice';

import auth, { signedOut, saveAuthState, loadAuthState } from './authSlice';
import browser from './browser';
import tasks from './tasks';
import toasts, { addToast } from './toasts';
import { appearance, loadAppearanceState, saveAppearanceState } from './ui';
import uploads, { fileEntriesAdded } from './uploads';

import uploadsSaga from './uploadsSaga';

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  appearance,
  auth,
  browser,
  tasks,
  toasts,
  uploads,
});

function rootReducer(state, action) {
  if (action.type === signedOut.type) {
    return reducers(undefined, action);
  }
  return reducers(state, action);
}

const ignoredErrorCodes = new Set([422, 'SHARED_LINK_NOT_FOUND', 'INVALID_TOKEN', 'MISSING_TOKEN']);

export const errorsMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action)) {
      const { payload } = action;
      if (payload.data != null) {
        const { code, code_verbose: title, message: description } = payload.data;
        if (!ignoredErrorCodes.has(code) && title != null && description != null) {
          dispatch(addToast({ title, description }));
        }
      } else {
        dispatch(addToast({ title: 'Server Error', description: 'Something went wrong' }));
      }
    }

    return next(action);
  };

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [fileEntriesAdded.type],
      },
    })
      .concat(sagaMiddleware)
      .concat(apiSlice.middleware)
      .concat(errorsMiddleware),
  devTools: import.meta.env.SNOWPACK_PUBLIC_MODE !== 'production',
  preloadedState: { ...loadAuthState(), ...loadAppearanceState() },
});

store.subscribe(() => {
  saveAuthState(store.getState());
  saveAppearanceState(store.getState());
});

function* rootSaga() {
  yield all([...uploadsSaga]);
}

sagaMiddleware.run(rootSaga);

export default store;
