import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  homeHref?: string;
  className?: string;
  separator?: React.ReactNode;
}

export const Breadcrumb = ({
  items,
  showHome = false,
  homeHref = "/main-admin",
  className = "",
  separator = <ChevronRight className="w-4 h-4 text-gray-400" />,
}: BreadcrumbProps) => {
  const allItems = showHome
    ? [{ label: "Home", href: homeHref }, ...items]
    : items;

  return (
    <nav
      className={cn("flex items-center space-x-1 text-sm", className)}
      aria-label="Breadcrumb"
    >
      {allItems.map((item, index) => {
        const isLast = index === allItems.length - 1;
        const isActive = item.isActive || isLast;

        return (
          <div key={index} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-gray-400">{separator}</span>
            )}

            {isActive ? (
              <span
                className={cn(
                  "font-medium",
                  isActive
                    ? "text-[#116114] cursor-default"
                    : "text-gray-500 hover:text-gray-700"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  "text-gray-500 hover:text-gray-700 transition-colors duration-200",
                  "hover:underline"
                )}
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

// Compact version for smaller spaces
export const CompactBreadcrumb = ({
  items,
  showHome = false,
  homeHref = "/main-admin",
  className = "",
  maxItems = 3,
}: BreadcrumbProps & { maxItems?: number }) => {
  const allItems = showHome
    ? [{ label: "Home", href: homeHref }, ...items]
    : items;

  // Show ellipsis if too many items
  const shouldShowEllipsis = allItems.length > maxItems;
  const visibleItems = shouldShowEllipsis
    ? [...allItems.slice(0, 1), ...allItems.slice(-maxItems + 1)]
    : allItems;

  return (
    <nav
      className={cn("flex items-center space-x-1 text-xs", className)}
      aria-label="Breadcrumb"
    >
      {visibleItems.map((item, index) => {
        const isLast = index === visibleItems.length - 1;
        const isActive = item.isActive || isLast;
        const isEllipsis = shouldShowEllipsis && index === 1;

        return (
          <div key={index} className="flex items-center">
            {index > 0 && (
              <span className="mx-1 text-gray-400">
                <ChevronRight className="w-3 h-3" />
              </span>
            )}

            {isEllipsis ? (
              <span className="text-gray-400">...</span>
            ) : isActive ? (
              <span
                className={cn(
                  "font-medium truncate max-w-24",
                  isActive
                    ? "text-[#116114] cursor-default"
                    : "text-gray-500 hover:text-gray-700"
                )}
                aria-current={isActive ? "page" : undefined}
                title={item.label}
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  "text-gray-500 hover:text-gray-700 transition-colors duration-200",
                  "hover:underline truncate max-w-24"
                )}
                title={item.label}
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

// Icon breadcrumb with home icon
export const IconBreadcrumb = ({
  items,
  homeHref = "/main-admin",
  className = "",
  separator = <ChevronRight className="w-4 h-4 text-gray-400" />,
}: BreadcrumbProps) => {
  const allItems = [{ label: "Home", href: homeHref }, ...items];

  return (
    <nav
      className={cn("flex items-center space-x-1 text-sm", className)}
      aria-label="Breadcrumb"
    >
      {allItems.map((item, index) => {
        const isLast = index === allItems.length - 1;
        const isActive = item.isActive || isLast;

        return (
          <div key={index} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-gray-400">{separator}</span>
            )}

            {isActive ? (
              <span
                className={cn(
                  "font-medium flex items-center gap-1",
                  isActive
                    ? "text-[#116114] cursor-default"
                    : "text-gray-500 hover:text-gray-700"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {index === 0 && <Home className="w-4 h-4" />}
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  "text-gray-500 hover:text-gray-700 transition-colors duration-200",
                  "hover:underline flex items-center gap-1"
                )}
              >
                {index === 0 && <Home className="w-4 h-4" />}
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};
