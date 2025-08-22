import apiSlice from './apiSlice';
import { isFetchBaseQueryErrorWithApiError } from './store';

export function isInvalidCredentials(error: unknown): boolean {
  return isFetchBaseQueryErrorWithApiError(error) && error.data?.code === 'INVALID_CREDENTIALS';
}

export function isSignUpDisabled(error: unknown): boolean {
  return isFetchBaseQueryErrorWithApiError(error) && error.data?.code === 'SIGN_UP_DISABLED';
}

export function isUserAlreadyExists(error: unknown): boolean {
  return isFetchBaseQueryErrorWithApiError(error) && error.data?.code === 'USER_ALREADY_EXISTS';
}

interface TokenSchema {
  access_token: string;
  refresh_token: string;
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface SignInArgs {
  username: string;
  password: string;
}

export interface SignUpArgs {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<Tokens, SignInArgs>({
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
      transformResponse: (responseData: TokenSchema) => ({
        accessToken: responseData.access_token,
        refreshToken: responseData.refresh_token,
      }),
    }),
    signUp: builder.mutation<Tokens, SignUpArgs>({
      query: ({ email, name, password, confirmPassword }: SignUpArgs) => ({
        url: '/auth/sign_up',
        method: 'POST',
        body: { email, display_name: name, password, confirm_password: confirmPassword },
      }),
      transformResponse: (responseData: TokenSchema) => ({
        accessToken: responseData.access_token,
        refreshToken: responseData.refresh_token,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
