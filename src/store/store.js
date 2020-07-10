import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import { saveAuthState, loadAuthState } from './reducers/auth';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = (() => createStore(
  rootReducer,
  { ...loadAuthState() },
  applyMiddleware(sagaMiddleware),
))();

store.subscribe(() => {
  saveAuthState(store.getState());
});

sagaMiddleware.run(rootSaga);

export default store;
