import {
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';

import API_BASE_URL from '../api-config';
import * as actions from '../actions/files';
import { getAccessToken } from '../reducers/auth';

function* listFolder({ payload }) {
  const { path } = payload;
  const accessToken = yield select(getAccessToken);
  const url = `${API_BASE_URL}/files/list_folder`;
  const options = {
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ path: path || '.' }),
    mode: 'cors',
    cache: 'default',
  };

  yield put(actions.listFolderRequest());

  try {
    const response = yield fetch(url, options);
    const data = yield response.json();
    if (response.ok) {
      yield put(actions.listFolderSuccess(data));
    } else {
      yield put(actions.listFolderFailure(data));
    }
  } catch (e) {
    yield put(actions.listFolderFailure(e));
  }
}

export default [
  takeEvery(actions.types.LIST_FOLDER, listFolder),
];
