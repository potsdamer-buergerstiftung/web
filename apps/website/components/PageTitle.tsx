import clsx from "clsx";

interface PageTitleProps {
  title: string;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  breadcrumb?: React.ReactNode;
  isCompact?: boolean;
  isLoading?: boolean;
}

export default function PageTitle({
  title,
  description,
  actions,
  breadcrumb,
  isCompact = false,
  isLoading = false,
}: PageTitleProps) {
  return (
    <section className="bg-white dark:bg-background">
      <div
        className={clsx(
          "container mx-auto px-4 pt-36 pb-8 md:pt-44",
          isCompact && "max-w-4xl",
        )}
      >
        <h1 className="font-header text-5xl font-bold text-slate-900 dark:text-slate-50 md:text-6xl lg:text-7xl">
          {isLoading ? (
            <div className="h-16 w-3/4 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
          ) : (
            title
          )}
        </h1>
        {description && (
          <div className="mt-4 text-slate-700 dark:text-slate-300">
            {description}
          </div>
        )}
        {actions && (
          <div className="mt-4 text-slate-700 dark:text-slate-300">
            {actions}
          </div>
        )}
        {breadcrumb && <div className="mt-16 md:mt-24">{breadcrumb}</div>}
      </div>
    </section>
  );
}
