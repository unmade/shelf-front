import React, { createContext, useCallback, useContext, useReducer } from 'react';

import ToastList from './ToastList';
import ToastListItem from './ToastListItem';

const defaultCloseAfter = 10;

const empty = [];

const toastAdded = (id, toast) => ({
  type: 'toast/added',
  payload: { id, toast },
});
toastAdded.type = 'toast/added';

const toastRemoved = (toastId) => ({
  type: 'toast/removed',
  payload: { toastId },
});
toastRemoved.type = 'toast/removed';

function reducer(state, action) {
  switch (action.type) {
    case toastAdded.type: {
      const { id, toast } = action.payload;
      const { title, description } = toast;
      return [
        ...state,
        {
          id,
          title,
          description,
          closeAfter: toast.closeAfter ?? defaultCloseAfter,
        },
      ];
    }
    case toastRemoved.type: {
      const { toastId } = action.payload;
      return state.filter((item) => item.id !== toastId);
    }
    default:
      return empty;
  }
}

let id = 1;

const ToastContext = createContext(null);

const ToastProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  const addToast = useCallback(
    (toast) => {
      id += 1;
      dispatch(toastAdded(id, toast));
    },
    [dispatch]
  );

  const removeToast = useCallback(
    (toastId) => {
      dispatch(toastRemoved(toastId));
    },
    [dispatch]
  );

  return (
    <ToastContext.Provider
      value={{
        addToast,
        removeToast,
      }}
    >
      <ToastList items={state} itemRenderer={ToastListItem} onClose={removeToast} />
      {children}
    </ToastContext.Provider>
  );
};

export function useToast() {
  const { addToast } = useContext(ToastContext);
  return addToast;
}

export default ToastProvider;
