import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import apiSlice from './apiSlice';
import { fileEntriesAdded } from './uploads';

import rootReducer from './reducers';
import { saveAuthState, loadAuthState } from './auth';
import { loadAppearanceState, saveAppearanceState } from './reducers/ui';
import uploadsSaga from './uploadsSaga';

const sagaMiddleware = createSagaMiddleware();

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
