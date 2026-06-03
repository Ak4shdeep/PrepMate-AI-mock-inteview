import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils'; 
import type { Route } from '@/lib/helpers'; 

interface DropdownNavLinkProps {
  route: Route; 
  isMobile?: boolean;
}

export const DropdownNavLink: React.FC<DropdownNavLinkProps> = ({ route, isMobile }) => {
  if (isMobile) {
    return (
      <div className="flex flex-col gap-2">
        <NavLink to={route.href} className="text-base text-neutral-900 font-semibold">
          {route.label}
        </NavLink>
        {route.children?.map((child) => (
          <NavLink
            key={child.href}
            to={child.href}
            className="ml-4 text-sm text-neutral-600"
          >
            {child.label}
          </NavLink>
        ))}
      </div>
    );
  }

  return (
 
    <div className="relative group"> 
    <NavLink
        to={route.href}
        className={({ isActive }) =>
          cn(
            "text-base text-neutral-600 transition-colors duration-150",
            isActive && "text-neutral-900 font-semibold"
          )
        }
      >
        {route.label} 
      </NavLink>
      <div 
        className={cn(
          "absolute left-0 top-full mt-2 w-max min-w-[200px] bg-white border border-gray-200 rounded-lg shadow-lg z-10",
          "opacity-0 invisible transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0",
          "transform translate-y-2" 
        )}
      >
        <div className="flex flex-col p-2">
          {route.children?.map((child) => (
            <NavLink
              key={child.href}
              to={child.href}
              className={({ isActive }) =>
                cn(
                  "p-2 text-sm text-neutral-700 hover:bg-gray-100 rounded-md transition-colors",
                  isActive && "bg-gray-100 font-medium text-neutral-900"
                )
              }
            >
              {child.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};