import { cn } from "@/lib/utils";
import { Heading } from "@/components/ui/heading";

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
    <section className={className}>
      <div
        className={cn(
          "mx-auto px-4 md:px-8 pt-36 pb-8 md:pt-44",
          isCompact && "max-w-4xl",
          isCentered && "text-center",
        )}
      >
        <Heading size="lg" className={cn(isCentered && "mx-auto")} isLoading={isLoading}>
          {title}
        </Heading>
        {description && (
          <div
            className={cn(
              "mt-4 text-muted-foreground",
              isCentered && "mx-auto max-w-3xl",
            )}
          >
            {description}
          </div>
        )}
        {actions && (
          <div
            className={cn(
              "mt-4 text-muted-foreground",
              isCentered && "flex justify-center",
            )}
          >
            {actions}
          </div>
        )}
        {breadcrumb && (
          <div
            className={cn(
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
