import {
  LIST_FILES_REQUEST,
  LIST_FILES_SUCCESS,
} from './actions';


const INITIAL_STATE = {
  data: {
    directory: {
      name: "home",
      path: "",
      folderCount: 0,
      fileCount: 0,
    },
    files: [],
  },
  error: null,
  loading: false,
};


const FilesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIST_FILES_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case LIST_FILES_SUCCESS:
      return {
        loading: false,
        items: action.payload,
        ...state
      };
    default:
      return {
        ...state
      };
  };
};


export default FilesReducer;
