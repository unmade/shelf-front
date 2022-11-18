import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import * as uploadActions from './actions/uploads';
import apiSlice from './apiSlice';

import rootReducer from './reducers';
import { saveAuthState, loadAuthState } from './reducers/auth';
import { loadAppearanceState, saveAppearanceState } from './reducers/ui';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [uploadActions.fileEntriesAdded.type],
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

sagaMiddleware.run(rootSaga);

export default store;
