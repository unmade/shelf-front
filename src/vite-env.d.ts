/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_AVAILABLE_APPS: string;
  VITE_DEFAULT_APP: 'files' | 'photos';
  VITE_MODE: string;
  VITE_PRIVACY_POLICY_URL: string;
  VITE_REFRESH_ACCESS_TOKEN_ON_UPLOAD_DELTA: string;
  VITE_TRASH_FOLDER_NAME: string;
  VITE_TERMS_AND_CONDITION_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
