import apiSlice from './apiSlice';

const accountsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentAccount: builder.query({
      query: () => 'accounts/get_current',
    }),
    getSpaceUsage: builder.query({
      query: () => '/accounts/get_space_usage',
    }),
  }),
});

export const { useGetCurrentAccountQuery, useGetSpaceUsageQuery } = accountsApi;

const selectGetCurrentAccountResult = accountsApi.endpoints.getCurrentAccount.select();

export const selectIsAdmin = (state) => selectGetCurrentAccountResult(state)?.superuser ?? false;
