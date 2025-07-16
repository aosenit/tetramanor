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
  variant?: "default" | "compact" | "icon";
  maxItems?: number;
}

export const Breadcrumb = ({
  items,
  showHome = false,
  homeHref = "/main-admin",
  className = "",
  separator = <ChevronRight className="w-4 h-4 text-gray-400" />,
  variant = "default",
  maxItems = 3,
}: BreadcrumbProps) => {
  const allItems = showHome
    ? [{ label: "Home", href: homeHref }, ...items]
    : items;

  // Handle compact variant with ellipsis
  const shouldShowEllipsis =
    variant === "compact" && allItems.length > maxItems;
  const visibleItems = shouldShowEllipsis
    ? [...allItems.slice(0, 1), ...allItems.slice(-maxItems + 1)]
    : allItems;

  const renderItem = (
    item: BreadcrumbItem,
    index: number,
    items: BreadcrumbItem[]
  ) => {
    const isLast = index === items.length - 1;
    const isActive = item.isActive || isLast;
    const isEllipsis = shouldShowEllipsis && index === 1;

    return (
      <div key={index} className="flex items-center">
        {index > 0 && (
          <span
            className={cn(
              "text-gray-400",
              variant === "compact" ? "mx-1" : "mx-2"
            )}
          >
            {variant === "compact" ? (
              <ChevronRight className="w-3 h-3" />
            ) : (
              separator
            )}
          </span>
        )}

        {isEllipsis ? (
          <span className="text-gray-400">...</span>
        ) : isActive ? (
          <span
            className={cn(
              "font-medium",
              variant === "compact" && "truncate max-w-24",
              isActive
                ? "text-[#116114] cursor-default"
                : "text-gray-500 hover:text-gray-700"
            )}
            aria-current={isActive ? "page" : undefined}
            title={variant === "compact" ? item.label : undefined}
          >
            {variant === "icon" && index === 0 && (
              <Home className="w-4 h-4 mr-1" />
            )}
            {item.label}
          </span>
        ) : (
          <Link
            href={item.href}
            className={cn(
              "text-gray-500 hover:text-gray-700 transition-colors duration-200",
              "hover:text-[#116114]",
              variant === "compact" && "truncate max-w-24",
              variant === "icon" && "flex items-center gap-1"
            )}
            title={variant === "compact" ? item.label : undefined}
          >
            {variant === "icon" && index === 0 && <Home className="w-4 h-4" />}
            {item.label}
          </Link>
        )}
      </div>
    );
  };

  return (
    <nav
      className={cn(
        "flex items-center space-x-1",
        variant === "compact" ? "text-xs" : "text-sm",
        className
      )}
      aria-label="Breadcrumb"
    >
      {visibleItems.map((item, index) => renderItem(item, index, visibleItems))}
    </nav>
  );
};

// Convenience exports for different variants
export const CompactBreadcrumb = (props: Omit<BreadcrumbProps, "variant">) => (
  <Breadcrumb {...props} variant="compact" />
);

export const IconBreadcrumb = (props: Omit<BreadcrumbProps, "variant">) => (
  <Breadcrumb {...props} variant="icon" />
);

/*
Usage Examples:

// Basic breadcrumb
<Breadcrumb
  items={[
    { label: "Properties", href: "/main-admin/properties" },
    { label: "Add Property", href: "#", isActive: true }
  ]}
/>

// With home icon
<Breadcrumb
  showHome={true}
  items={[
    { label: "Properties", href: "/main-admin/properties" },
    { label: "Add Property", href: "#", isActive: true }
  ]}
/>

// Compact version for small spaces
<CompactBreadcrumb
  items={[
    { label: "Properties", href: "/main-admin/properties" },
    { label: "Property Details", href: "/main-admin/properties/details" },
    { label: "Edit Property", href: "#", isActive: true }
  ]}
  maxItems={2}
/>

// Icon version with home
<IconBreadcrumb
  items={[
    { label: "Properties", href: "/main-admin/properties" },
    { label: "Add Property", href: "#", isActive: true }
  ]}
/>

// Custom separator
<Breadcrumb
  items={[
    { label: "Properties", href: "/main-admin/properties" },
    { label: "Add Property", href: "#", isActive: true }
  ]}
  separator={<span className="text-gray-400">/</span>}
/>
*/
