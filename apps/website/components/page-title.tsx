import { cn } from "@/lib/utils";
import clsx from "clsx";

interface PageTitleProps {
  title: string;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  breadcrumb?: React.ReactNode;
  isCentered?: boolean;
  isCompact?: boolean;
  isLoading?: boolean;
  className?: string;
}

export default function PageTitle({
  title,
  description,
  actions,
  breadcrumb,
  isCompact = false,
  isLoading = false,
  isCentered = false,
  className,
}: PageTitleProps) {
  return (
    <section className={cn("bg-white dark:bg-background", className)}>
      <div
        className={clsx(
          "container mx-auto px-4 pt-36 pb-8 md:pt-44",
          isCompact && "max-w-4xl",
          isCentered && "text-center",
        )}
      >
        <h1
          className={clsx(
            "font-header text-5xl font-bold text-slate-900 dark:text-slate-50 md:text-6xl lg:text-7xl",
            isCentered && "mx-auto",
          )}
        >
          {isLoading ? (
            <div
              className={clsx(
                "h-16 w-3/4 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800",
                isCentered && "mx-auto",
              )}
            />
          ) : (
            title
          )}
        </h1>
        {description && (
          <div
            className={clsx(
              "mt-4 text-slate-700 dark:text-slate-300",
              isCentered && "mx-auto max-w-3xl",
            )}
          >
            {description}
          </div>
        )}
        {actions && (
          <div
            className={clsx(
              "mt-4 text-slate-700 dark:text-slate-300",
              isCentered && "flex justify-center",
            )}
          >
            {actions}
          </div>
        )}
        {breadcrumb && (
          <div
            className={clsx(
              "mt-16 md:mt-24",
              isCentered && "flex justify-center",
            )}
          >
            {breadcrumb}
          </div>
        )}
      </div>
    </section>
  );
}
