import filesApp from '../filesApp';
import photosApp from '../photosApp';

const apps = [filesApp, photosApp];

const defaultApp = import.meta.env.VITE_DEFAULT_APP ?? 'photos';

export default function useDefaultApp() {
  return apps.find((app) => app.key === defaultApp)!;
}
