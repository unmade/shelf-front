import { createAction } from '@reduxjs/toolkit';

// eslint-disable-next-line import/prefer-default-export
export const messageClosed = createAction('messages/messageClosed', (id) => ({
  payload: { id },
}));
