import {
  ADD_UPLOAD_FILES,
  UPLOAD_FILE,
  UPLOAD_PROGRESS,
  LIST_FILES_REQUEST,
  LIST_FILES_SUCCESS,
} from './actions';


const INITIAL_STATE = {
  data: {
    items: [],
  },
  error: null,
  loading: false,
};


const FilesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIST_FILES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LIST_FILES_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }
    default:
      return {
        ...state,
      };
  };
};


const UPLOAD_INITIAL_STATE = {
  data: {},
  nextId: 0,
};


function prepareFiles(files, nextId) {
  const data = {};
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    nextId += i;
    data[nextId] = {
      id: nextId,
      file,
      progress: 0,
    };
  }
  return data;
}

export const UploadFilesReducer = (state = UPLOAD_INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_UPLOAD_FILES: {
      const { data, nextId } = state;
      const files = prepareFiles(action.payload, nextId);
      return {
        ...state,
        data: {
          ...data,
          ...files,
        },
        nextId: nextId + action.payload.length,
      };
    }
    case UPLOAD_FILE: {
      const { data } = state;
      const { file } = action.payload;
      return {
        ...state,
        data: {
          ...data,
          [file.id]: {
            ...file,
            progress: 1,
          },
        },
      };
    }
    case UPLOAD_PROGRESS: {
      const { data } = state;
      const { file, progress } = action.payload;
      return {
        ...state,
        data: {
          ...data,
          [file.id]: {
            ...file,
            progress,
          },
        },
      };
    }
    default:
      return state;
  }
};

export default FilesReducer;
