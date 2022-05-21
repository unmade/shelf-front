import { createAction } from '@reduxjs/toolkit';

function preparePayload(actionType, ref = null) {
  return {
    payload: {
      actionType,
      ref,
    },
  };
}

export const started = createAction('loading/started', preparePayload);
export const loaded = createAction('loading/loaded', preparePayload);
