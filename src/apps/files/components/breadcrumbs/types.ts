export interface BreadcrumbItem {
  key: string;
  name: string;
  Icon?: React.ElementType;
  url?: string;
  path?: string;
  onClick?: () => void;
}
