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
          {title}
        </h1>
        {description && (
          <div className="mt-4" v-if="$slots.description">
            {description}
          </div>
        )}
        {actions && (
          <div className="mt-4" v-if="$slots.actions">
            {actions}
          </div>
        )}
        {breadcrumb && (
          <div className="mt-16 md:mt-24" v-if="$slots.breadcrumb">
            {breadcrumb}
          </div>
        )}
      </div>
    </section>
  );
}
