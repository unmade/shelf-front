import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';

import apiSlice from './apiSlice';

const featuresAdapter = createEntityAdapter({
  selectId: (feature) => feature.name,
});
const initialState = featuresAdapter.getInitialState();

export const featuresApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listFeatures: builder.query({
      query: () => '/features/list',
      transformResponse: (response) => featuresAdapter.setAll(initialState, response.items),
    }),
  }),
});

export const { useListFeaturesQuery } = featuresApi;

const selectListFeaturesResult = featuresApi.endpoints.listFeatures.select();

const selectListFeaturesData = createSelector(selectListFeaturesResult, (result) => result.data);

const { selectById } = featuresAdapter.getSelectors(
  (state) => selectListFeaturesData(state) ?? initialState,
);

export const selectFeatureValue = (state, name) => selectById(state, name)?.value;

export const selectPhotosLibraryPath = (state) => selectFeatureValue(state, 'photos_library_path');
