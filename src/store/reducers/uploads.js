import { types } from '../actions/uploads';

const INITIAL_STATE = {
  data: {},
  nextId: 0,
};

function prepareFiles(files, nextId) {
  const data = {};
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const id = i + nextId;
    data[id] = {
      id,
      file,
      progress: 0,
    };
  }
  return data;
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.ADD_UPLOAD_FILES: {
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

    case types.UPLOAD_FILE: {
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

    case types.UPLOAD_PROGRESS: {
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

export const getUploads = (state) => Object.values(state.uploads.data);
export const getUploadById = (state, id) => state.uploads.data[id];
