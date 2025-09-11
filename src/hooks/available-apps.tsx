import { type AppConfig } from 'types/AppConfig';

import files from 'apps/files/config';
import photos from 'apps/photos/config';

const apps: AppConfig[] = [files, photos];

const defaultApp = import.meta.env.VITE_DEFAULT_APP ?? 'photos';

export function useDefaultApp() {
  return apps.find((app) => app.key === defaultApp)!;
}

const availableApps = import.meta.env.VITE_AVAILABLE_APPS?.split(',') ?? ['files', 'photos'];

export function useAvailableApps() {
  return apps.filter((app) => availableApps.includes(app.key));
}
