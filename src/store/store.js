import { configureStore } from '@reduxjs/toolkit';
// import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import * as uploadActions from './actions/uploads';

import rootReducer from './reducers';
import { saveAuthState, loadAuthState } from './reducers/auth';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [uploadActions.fileEntriesAdded.type],
      },
    }).concat(sagaMiddleware),
  devTools: import.meta.env.SNOWPACK_PUBLIC_MODE !== 'production',
  preloadedState: { ...loadAuthState() },
});

store.subscribe(() => {
  saveAuthState(store.getState());
});

sagaMiddleware.run(rootSaga);

export default store;
