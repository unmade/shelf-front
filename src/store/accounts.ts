import apiSlice from './apiSlice';
import { RootState } from './store';

export interface ICurrentAccountSchema {
  id: string;
  username: string;
  email: string | null;
  display_name: string;
  verified: boolean;
  superuser: boolean;
}

interface ChangeEmailCompleteArg {
  email: string;
  code: string;
}

const accountsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    changeEmailComplete: builder.mutation<{ completed: boolean }, ChangeEmailCompleteArg>({
      query: ({ code }) => ({
        url: '/accounts/change_email/complete',
        method: 'POST',
        body: { code },
      }),
      async onQueryStarted({ email }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.completed) {
            dispatch(
              accountsApi.util.updateQueryData('getCurrentAccount', undefined, (draft) => ({
                ...draft,
                email,
                verified: true,
              })),
            );
          }
        } catch (err) {
          // empty
        }
      },
    }),
    changeEmailResendCode: builder.mutation<undefined, undefined>({
      query: () => ({
        url: '/accounts/change_email/resend_code',
        method: 'POST',
      }),
    }),
    changeEmailStart: builder.mutation<undefined, string>({
      query: (email) => ({
        url: '/accounts/change_email/start',
        method: 'POST',
        body: { email },
      }),
    }),
    getCurrentAccount: builder.query<ICurrentAccountSchema, undefined>({
      query: () => 'accounts/get_current',
      providesTags: [{ type: 'Accounts', id: 'getCurrentAccount' }],
    }),
    getSpaceUsage: builder.query({
      query: () => '/accounts/get_space_usage',
    }),
    verifyEmailComplete: builder.mutation<{ completed: boolean }, string>({
      query: (code) => ({
        url: '/accounts/verify_email/complete',
        method: 'POST',
        body: { code },
      }),
      async onQueryStarted(code, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.completed) {
            dispatch(
              accountsApi.util.updateQueryData('getCurrentAccount', undefined, (draft) => ({
                ...draft,
                verified: true,
              })),
            );
          }
        } catch (err) {
          // empty
        }
      },
    }),
    verifyEmailSendCode: builder.mutation<undefined, undefined>({
      query: () => ({
        url: '/accounts/verify_email/send_code',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useChangeEmailCompleteMutation,
  useChangeEmailStartMutation,
  useChangeEmailResendCodeMutation,
  useGetCurrentAccountQuery,
  useGetSpaceUsageQuery,
  useVerifyEmailCompleteMutation,
  useVerifyEmailSendCodeMutation,
} = accountsApi;

export const selectGetCurrentAccountResult =
  accountsApi.endpoints.getCurrentAccount.select(undefined);

export const selectCurrentAccount = (state: RootState) => selectGetCurrentAccountResult(state).data;

export const selectIsSuperuser = (state: RootState) =>
  selectGetCurrentAccountResult(state).data?.superuser ?? false;
