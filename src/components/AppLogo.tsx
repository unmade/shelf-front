import { AppLogo as AppLogoIcon } from 'icons';
import Heading from 'components/ui/Heading';

export default function AppLogo() {
  return (
    <div className="relative inline-flex w-full items-center space-x-4">
      <AppLogoIcon className="h-10 w-10" />
      <Heading>
        <span className="text-gray-400 text-shadow-2xs dark:text-zinc-500 dark:shadow-none">
          S H E L F
        </span>
      </Heading>
    </div>
  );
}
