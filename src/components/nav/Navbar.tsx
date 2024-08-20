import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu';

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            href={props.href || '/'}
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = 'ListItem';

const Navbar = async () => {
  return (
    <header className="flex sticky items-center top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex w-full h-14 container justify-between">
        <div className="mr-4 flex items-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'bg-transparent')} asChild>
                  <Link href={'/'}>Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'bg-transparent')} asChild>
                  <Link href="/data">Datas</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
