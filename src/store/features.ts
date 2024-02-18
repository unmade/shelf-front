import { EntityState, Selector, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

import apiSlice from './apiSlice';
import { RootState } from './store';

type FeatureValue = number | string | boolean;

interface Feature {
  name: string;
  value: FeatureValue;
}

const featuresAdapter = createEntityAdapter<Feature>({
  selectId: (feature) => feature.name,
});
const initialState = featuresAdapter.getInitialState();

export const featuresApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listFeatures: builder.query<EntityState<Feature>, undefined>({
      query: () => '/features/list',
      keepUnusedDataFor: Number.MAX_SAFE_INTEGER,
      transformResponse: (rawResult: { items: Feature[] }) =>
        featuresAdapter.setAll(initialState, rawResult.items),
    }),
  }),
});

export const { useListFeaturesQuery } = featuresApi;

const selectListFeaturesResult = featuresApi.endpoints.listFeatures.select(undefined);

const selectListFeaturesData = createSelector(selectListFeaturesResult, (result) => result.data);

const { selectById } = featuresAdapter.getSelectors(
  (state: RootState) => selectListFeaturesData(state) ?? initialState,
);

export const selectFeatureValue: Selector<RootState, FeatureValue | undefined> = (state, name) =>
  selectById(state, name)?.value;

export const selectFeatureMaxFileSizeToThumbnail: Selector<RootState, number> = (state) =>
  selectFeatureValue(state, 'max_file_size_to_thumbnail') as number;

export const selectPhotosLibraryPath = (state: RootState) =>
  (selectFeatureValue(state, 'photos_library_path') as string | undefined) ?? '.';

export const selectFeatureSharedLinksDisabled = (state: RootState) =>
  selectFeatureValue(state, 'shared_links_disabled') as boolean;

export const selectFeatureUploadFileMaxSize: Selector<RootState, number> = (state) =>
  selectFeatureValue(state, 'upload_file_max_size') as number;

export const selectFeatureVerificationRequired = (state: RootState) =>
  selectFeatureValue(state, 'verification_required') as boolean;
