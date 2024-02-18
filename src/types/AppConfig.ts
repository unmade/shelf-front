export interface IAppMenuItem {
  path: string | null;
  title: string;
  icon: React.ElementType;
  desktopOnly: boolean;
  items:
    | {
        path: string | null;
        title: string;
      }[]
    | null;
  end: boolean;
}

export interface IAppConfig {
  key: 'files' | 'photos';
  title: string;
  path: string;
  menu: IAppMenuItem[];
}
