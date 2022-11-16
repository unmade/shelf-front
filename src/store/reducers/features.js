import { combineReducers, createReducer } from '@reduxjs/toolkit';

import { fulfilled } from '../actions';
import * as actions from '../actions/features';

const INITIAL_STATE = {};

const byKey = createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(fulfilled(actions.listFeatures), (_, action) => {
    const { items } = action.payload;
    const nextState = {};
    items.forEach((feature) => {
      nextState[feature.name] = feature.value;
    });
    return nextState;
  });
});

export default combineReducers({
  byKey,
});

export const getFeature = (state, key) => state.features.byKey[key] ?? null;
