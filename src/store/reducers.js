import { combineReducers } from 'redux';
import FilesReducer from './files/reducers';

const reducers = combineReducers({
  files: FilesReducer,
});

export default reducers;
