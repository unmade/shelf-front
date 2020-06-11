import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = (() => createStore(
  reducers,
  applyMiddleware(sagaMiddleware),
))();

sagaMiddleware.run(rootSaga);

export default store;
