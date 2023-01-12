import apiSlice from './apiSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: ({ username, password }) => ({
        url: '/auth/sign_in',
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: new URLSearchParams({
          username,
          password,
        }),
      }),
      transformResponse: (responseData) => ({
        accessToken: responseData.access_token,
        refreshToken: responseData.refresh_token,
      }),
    }),
    signUp: builder.mutation({
      query: ({ username, password, confirmPassword }) => ({
        url: '/auth/sign_up',
        method: 'POST',
        body: { username, password, confirm_password: confirmPassword },
      }),
      transformResponse: (responseData) => ({
        accessToken: responseData.access_token,
        refreshToken: responseData.refresh_token,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
