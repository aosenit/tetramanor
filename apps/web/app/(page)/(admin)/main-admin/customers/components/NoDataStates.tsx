import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  Loader2,
  Search,
  FileX,
  RefreshCw,
  Home,
  ArrowLeft,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface StateProps {
  message?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  showBackButton?: boolean;
  showHomeButton?: boolean;
  variant?: "default" | "minimal" | "card";
}

export const ErrorState = ({
  message = "Something went wrong",
  description = "We encountered an error while loading your data. Please try again.",
  actionText = "Try Again",
  onAction,
  showBackButton = true,
  showHomeButton = false,
  variant = "default",
}: StateProps) => {
  const router = useRouter();

  const handleBack = () => router.back();
  const handleHome = () => router.push("/main-admin");

  const content = (
    <div className="flex flex-col items-center space-y-6 text-center">
      <div className="relative">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
          <AlertCircle className="h-10 w-10 text-red-500" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
          <AlertCircle className="h-4 w-4 text-red-600" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-gray-900">{message}</h3>
        <p className="text-sm text-gray-600 max-w-md">{description}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        {onAction && (
          <Button
            onClick={onAction}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            {actionText}
          </Button>
        )}

        {showBackButton && (
          <Button
            variant="outline"
            onClick={handleBack}
            className="border-gray-300 hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        )}

        {showHomeButton && (
          <Button
            variant="outline"
            onClick={handleHome}
            className="border-gray-300 hover:bg-gray-50"
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Button>
        )}
      </div>
    </div>
  );

  if (variant === "minimal") {
    return (
      <div className="flex items-center justify-center py-12">{content}</div>
    );
  }

  if (variant === "card") {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
        {content}
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      {content}
    </div>
  );
};

export const EmptyState = ({
  message = "No data found",
  description = "There are no items to display at the moment.",
  actionText = "Add New",
  onAction,
  showBackButton = false,
  showHomeButton = false,
  variant = "default",
}: StateProps) => {
  const router = useRouter();

  const handleBack = () => router.back();
  const handleHome = () => router.push("/main-admin");

  const content = (
    <div className="flex flex-col items-center space-y-6 text-center">
      <div className="relative">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
          <Search className="h-10 w-10 text-[#116114]" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
          <FileX className="h-4 w-4 text-[#116114]" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-gray-900">{message}</h3>
        <p className="text-sm text-gray-600 max-w-md">{description}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        {onAction && (
          <Button
            onClick={onAction}
            className="bg-[#116114] hover:bg-[#116114]/80 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            {actionText}
          </Button>
        )}

        {showBackButton && (
          <Button
            variant="outline"
            onClick={handleBack}
            className="border-gray-300 hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        )}

        {showHomeButton && (
          <Button
            variant="outline"
            onClick={handleHome}
            className="border-gray-300 hover:bg-gray-50"
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Button>
        )}
      </div>
    </div>
  );

  if (variant === "minimal") {
    return (
      <div className="flex items-center justify-center py-12">{content}</div>
    );
  }

  if (variant === "card") {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
        {content}
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      {content}
    </div>
  );
};

export const LoadingState = ({
  message = "Loading...",
  description = "Please wait while we fetch your data.",
  variant = "default",
}: StateProps) => {
  const content = (
    <div className="flex flex-col items-center space-y-6 text-center">
      <div className="relative">
        {/* <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
          <Loader2 className="h-10 w-10 text-green-500 animate-spin" />
        </div> */}
        {/* <div className="absolute inset-0 w-20 h-20 border-4 border-green-200 border-t-green-500 rounded-full animate-spin"></div> */}
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-gray-900">{message}</h3>
        <p className="text-sm text-gray-600 max-w-md">{description}</p>
      </div>

      {/* <div className="flex space-x-1">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
        <div
          className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
      </div> */}
    </div>
  );

  if (variant === "minimal") {
    return (
      <div className="flex items-center justify-center py-12">{content}</div>
    );
  }

  if (variant === "card") {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
        {content}
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      {content}
    </div>
  );
};

// Additional specialized states
export const SearchEmptyState = ({
  searchTerm,
  onClearSearch,
  ...props
}: StateProps & { searchTerm?: string; onClearSearch?: () => void }) => {
  return (
    <EmptyState
      message={`No results found for "${searchTerm}"`}
      description="Try adjusting your search terms or filters to find what you're looking for."
      actionText="Clear Search"
      onAction={onClearSearch}
      variant="card"
      {...props}
    />
  );
};

export const NetworkErrorState = ({
  onRetry,
  ...props
}: StateProps & { onRetry?: () => void }) => {
  return (
    <ErrorState
      message="Connection Error"
      description="Unable to connect to the server. Please check your internet connection and try again."
      actionText="Retry"
      onAction={onRetry}
      variant="card"
      {...props}
    />
  );
};

export const PermissionErrorState = ({ ...props }: StateProps) => {
  return (
    <ErrorState
      message="Access Denied"
      description="You don't have permission to view this content. Please contact your administrator."
      showHomeButton={true}
      variant="card"
      {...props}
    />
  );
};

/*
Usage Examples:

// Basic usage
<ErrorState message="Failed to load data" onAction={() => refetch()} />
<EmptyState message="No customers found" onAction={() => navigate('/add-customer')} />
<LoadingState message="Loading customers..." />

// With custom descriptions and actions
<ErrorState 
  message="Network Error"
  description="Unable to connect to the server. Please check your internet connection."
  actionText="Retry Connection"
  onAction={handleRetry}
  showBackButton={true}
/>

// Card variant for inline use
<EmptyState 
  message="No search results"
  description="Try adjusting your search terms"
  variant="card"
/>

// Minimal variant for compact spaces
<LoadingState 
  message="Processing..."
  variant="minimal"
/>

// Specialized states
<SearchEmptyState 
  searchTerm="John Doe"
  onClearSearch={() => setSearchTerm("")}
/>

<NetworkErrorState onRetry={handleRetry} />
<PermissionErrorState />
*/
