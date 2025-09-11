interface AppMenuSectionItem {
  path: string;
  title: string;
  Icon: React.ElementType;
  desktopOnly: boolean;
  end: boolean;
}

interface AppMenuSection {
  key: string;
  title?: string;
  items: AppMenuSectionItem[];
}

interface AppMenu {
  sections: AppMenuSection[];
}

export interface AppConfig {
  key: 'files' | 'photos';
  title: string;
  path: string;
  Icon: React.ElementType;
  menu: AppMenu;
}
