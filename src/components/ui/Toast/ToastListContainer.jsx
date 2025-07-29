import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { selectToasts, toastRemoved } from '../../../store/toasts';

import ToastList from './ToastList';
import ToastListItem from './ToastListItem';

function ToastListContainer({ children }) {
  const dispatch = useDispatch();

  const toasts = useSelector(selectToasts);

  const removeToast = React.useCallback(
    (toastId) => {
      dispatch(toastRemoved({ toastId }));
    },
    [dispatch],
  );

  return (
    <>
      <ToastList items={toasts} itemRenderer={ToastListItem} onClose={removeToast} />
      {children}
    </>
  );
}

export default ToastListContainer;
