import { v4 as uuid4 } from 'uuid';

export const types = {
  CREATE_ERROR_MESSAGE: 'CREATE_ERROR_MESSAGE',
  REMOVE_MESSAGE: 'REMOVE_MESSAGE',
};

export const createErrorMessage = (title, description, closeAfter = null) => ({
  type: types.CREATE_ERROR_MESSAGE,
  payload: {
    id: uuid4(),
    title,
    description,
    closeAfter,
  },
});

export const removeMessage = (id) => ({
  type: types.REMOVE_MESSAGE,
  payload: {
    id,
  },
});
