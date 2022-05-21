import { createReducer } from '@reduxjs/toolkit';

import * as actions from '../actions/loading';

const INITIAL_STATE = [];

const loading = createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(actions.started, (state, action) => {
    const { actionType, ref } = action.payload;
    state.push({ actionType: actionType.toString(), ref });
  });
  builder.addCase(actions.loaded, (state, action) => {
    const { actionType, ref } = action.payload;
    return state.filter((item) => item.actionType !== actionType.toString() || item.ref !== ref);
  });
});

export default loading;

export const getLoading = (state, { actionType, ref = null }) =>
  state.loading.some(({ actionType: t, ref: r }) => t === actionType.toString() && r === ref);
