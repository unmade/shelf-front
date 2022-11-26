import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import apiSlice from './apiSlice';

import auth, { signedOut, saveAuthState, loadAuthState } from './auth';
import browser from './browser';
import tasks from './tasks';
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
  uploads,
});

function rootReducer(state, action) {
  if (action.type === signedOut.type) {
    return reducers(undefined, action);
  }
  return reducers(state, action);
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [fileEntriesAdded.type],
      },
    })
      .concat(sagaMiddleware)
      .concat(apiSlice.middleware),
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
