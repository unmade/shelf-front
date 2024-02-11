import apiSlice from './apiSlice';
import { RootState } from './store';

interface ICurrentAccountSchema {
  id: string;
  username: string;
  email: string | null;
  email_verified: boolean;
  display_name: string;
  superuser: boolean;
}

const accountsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentAccount: builder.query<ICurrentAccountSchema, undefined>({
      query: () => 'accounts/get_current',
    }),
    getSpaceUsage: builder.query({
      query: () => '/accounts/get_space_usage',
    }),
  }),
});

export const { useGetCurrentAccountQuery, useGetSpaceUsageQuery } = accountsApi;

export const selectGetCurrentAccountResult =
  accountsApi.endpoints.getCurrentAccount.select(undefined);

export const selectIsAdmin = (state: RootState) =>
  selectGetCurrentAccountResult(state).data?.superuser ?? false;
