import { Fragment } from 'react';
import { NavLink } from 'react-router';

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/ui/dropdown-menu';

interface BreadcrumbShape {
  key: string;
  name: string;
  Icon?: React.ElementType;
  url?: string;
  path?: string;
  onClick?: () => void;
}

function Item({ name, Icon, url, onClick }: BreadcrumbShape) {
  return (
    <BreadcrumbItem className="max-w-3xs" onClick={onClick}>
      {url ? (
        <BreadcrumbLink asChild>
          <>
            {Icon && <Icon className="size-4" />}
            <NavLink className="hover:text-foreground truncate" to={url}>
              {name}
            </NavLink>
          </>
        </BreadcrumbLink>
      ) : (
        <BreadcrumbLink className="truncate">{name}</BreadcrumbLink>
      )}
    </BreadcrumbItem>
  );
}

interface Props {
  className?: string;
  collapseAfter: number;
  items: BreadcrumbShape[];
  maxLastItems: number;
}

export default function Breadcrumbs({
  className,
  items,
  collapseAfter = 2,
  maxLastItems = 1,
}: Props) {
  const [first] = items;
  let lastItems = items.slice(Math.max(items.length - maxLastItems, 1), items.length);
  const toCollapse = items.slice(1, -maxLastItems);

  const shouldCollapse = toCollapse.length >= collapseAfter;
  if (!shouldCollapse) {
    lastItems = [...toCollapse, ...lastItems];
  }

  const last = lastItems.pop();

  const collapsed = shouldCollapse ? (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <BreadcrumbEllipsis className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-md" side="top" align="start">
        {toCollapse.map((item) => (
          <DropdownMenuItem className="max-w-md" key={item.key} onClick={item.onClick}>
            {item.url ? (
              <NavLink className="truncate" to={item.url}>
                {item.name}
              </NavLink>
            ) : (
              <span className="truncate">{item.name}</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  ) : null;

  return (
    <Breadcrumb>
      <BreadcrumbList className={className}>
        <Item {...first} />
        {collapsed && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>{collapsed}</BreadcrumbItem>
          </>
        )}
        {lastItems.map((item) => (
          <Fragment key={item.key}>
            <BreadcrumbSeparator />
            <Item {...item} />
          </Fragment>
        ))}
        {last && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="max-w-3xs">
              <BreadcrumbPage className="truncate font-medium">
                {last.Icon && <last.Icon className="size-4" />}
                {last.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
