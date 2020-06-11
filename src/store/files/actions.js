import { put, takeEvery } from 'redux-saga/effects';


const LIST_FILES = "LIST_FILES";
export const LIST_FILES_REQUEST = "LIST_FILES_REQUEST";
export const LIST_FILES_SUCCESS = "LIST_FILES_SUCCESS";
export const LIST_FILES_FAILURE = "LIST_FILES_FAILURE";


function listFilesRequest() {
  return {
    type: LIST_FILES_REQUEST,
    payload: null,
  };
};


function listFilesSuccess(payload) {
  return {
    type: LIST_FILES_SUCCESS,
    payload: payload,
  };
};


function listFilesFailure(payload) {
  return {
    type: LIST_FILES_FAILURE,
    payload: payload,
  };
};


export function listFiles({ path }) {
  return {
    type: LIST_FILES,
    payload: {
      path,
    },
  };
};


function* listFilesSaga({ payload }) {
  const { path } = payload;

  yield put(listFilesRequest());

  yield put(listFilesSuccess(files));
};


export const filesSagas = [
  takeEvery(LIST_FILES, listFilesSaga),
];


const files = {
  directory: { 
    name: "Photos",
    path: "/Archive/Photos",
    folderCount: 4,
    fileCount: 1,
  },
  files: [
    {
      type: "folder",
      name: "25 лет выпуск 2008 С-П-бург сентябрь",
      size: "367.2 MB",
      modifiedAt: "11 days ago",
      path: "/Archive/Photos/25 лет выпуск 2008 С-П-бург сентябрь",
    },
    {
      type: "folder",
      name: "Алексей",
      size: "1.2 GB",
      modifiedAt: "3 days ago",
      path: "/Archive/Photos/Алексей",
    },
    {
      type: "folder",
      name: "Ваня и Таня",
      size: "118.2 MB",
      modifiedAt: "4 days ago",
      path: "/Archive/Photos/Ваня и Таня",
    },
    {
      type: "folder",
      name: "Гараж",
      size: "1.1 MB",
      modifiedAt: "11 days ago",
      path: "/Archive/Photos/Гараж",
    },
    {
      type: "image",
      name: "IMG_2408.jpg",
      size: "340 KB",
      modifiedAt: "1 day ago",
      path: "/Archive/Photos/IMG_2408.jpg",
    },
  ],
};
