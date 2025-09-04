interface AppMenuSectionItems {
  path: string | null;
  title: string;
  icon: React.ElementType;
  desktopOnly: boolean;
  end: boolean;
}

interface AppMenuSection {
  key: string;
  title?: string;
  items: AppMenuSectionItems[];
}

interface AppMenu {
  sections: AppMenuSection[];
}

export interface AppConfig {
  key: 'files' | 'photos';
  title: string;
  path: string;
  menu: AppMenu;
}
