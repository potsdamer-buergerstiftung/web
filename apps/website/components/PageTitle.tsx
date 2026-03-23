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
    <section className="bg-white">
      <div
        className={clsx(
          "container mx-auto px-4 pt-36 pb-8 md:pt-44",
          isCompact && "max-w-4xl"
        )}
      >
        <h1 className="font-header text-5xl font-bold md:text-6xl lg:text-7xl">
          {isLoading ? (
            <div className="h-16 w-3/4 bg-slate-200 animate-pulse rounded-md" />
          ) : (
            title
          )}
        </h1>
        {description && <div className="mt-4">{description}</div>}
        {actions && <div className="mt-4">{actions}</div>}
        {breadcrumb && <div className="mt-16 md:mt-24">{breadcrumb}</div>}
      </div>
    </section>
  );
}
