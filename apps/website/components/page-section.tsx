import {
  Children,
  isValidElement,
  type ComponentProps,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { Heading } from "@/components/ui/heading";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

type PageSectionGrid = "default" | "vertical" | "1/2" | "1/3";

const pageSectionVariants = cva("container py-16", {
  variants: {
    grid: {
      default: "grid grid-cols-1 gap-10",
      vertical:
        "grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:[&>[data-slot=header]]:col-span-2 md:[&>[data-slot=header]]:grid md:[&>[data-slot=header]]:grid-cols-2 md:[&>[data-slot=header]]:gap-x-8 md:[&>[data-slot=header]]:gap-y-2 md:[&>[data-slot=header]]:space-y-0 md:[&>[data-slot=content]]:col-span-2",
      "1/2":
        "grid grid-cols-1 gap-10 md:grid-cols-2 md:[&>[data-slot=header]]:col-span-2 md:[&>[data-slot=header]]:grid md:[&>[data-slot=header]]:grid-cols-2 md:[&>[data-slot=header]]:gap-x-8 md:[&>[data-slot=header]]:gap-y-2 md:[&>[data-slot=header]]:space-y-0 md:[&>[data-slot=content]]:col-span-2 md:[&>[data-slot=content]]:row-start-2 lg:grid-cols-3 lg:[&>[data-slot=header]]:col-span-1 lg:[&>[data-slot=header]]:block lg:[&>[data-slot=header]]:space-y-4 lg:[&>[data-slot=content]]:col-start-2 lg:[&>[data-slot=content]]:col-span-2 lg:[&>[data-slot=content]]:row-start-1",
      "1/3":
        "grid grid-cols-1 gap-10 md:grid-cols-2 md:[&>[data-slot=header]]:col-span-2 md:[&>[data-slot=header]]:grid md:[&>[data-slot=header]]:grid-cols-2 md:[&>[data-slot=header]]:gap-x-8 md:[&>[data-slot=header]]:gap-y-2 md:[&>[data-slot=header]]:space-y-0 md:[&>[data-slot=content]]:col-span-2 md:[&>[data-slot=content]]:row-start-2 lg:grid-cols-4 lg:[&>[data-slot=header]]:col-span-1 lg:[&>[data-slot=header]]:block lg:[&>[data-slot=header]]:space-y-4 lg:[&>[data-slot=content]]:col-start-2 lg:[&>[data-slot=content]]:col-span-3 lg:[&>[data-slot=content]]:row-start-1",
    },
    sticky: {
      true: "lg:[&>[data-slot=header]]:sticky lg:[&>[data-slot=header]]:top-32 lg:[&>[data-slot=header]]:self-start",
      false: "",
    },
  },
  defaultVariants: {
    grid: "default",
    sticky: false,
  },
});

export const PageSection = ({
  children,
  className,
  grid = "default",
  sticky = false,
  ...props
}: {
  grid?: PageSectionGrid;
  sticky?: boolean;
} & HTMLAttributes<HTMLElement>) => {
  return (
    <section
      className={cn(pageSectionVariants({ grid, sticky }), className)}
      {...props}
    >
      {children}
    </section>
  );
};

export const PageSectionHeader = ({
  children,
  sticky = false,
  className,
  ...props
}: { sticky?: boolean } & HTMLAttributes<HTMLDivElement>) => {
  const leftChildren: ReactNode[] = [];
  const descriptionChildren: ReactNode[] = [];
  const otherChildren: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      otherChildren.push(child);
      return;
    }

    if (child.type === PageSectionDescription) {
      descriptionChildren.push(child);
      return;
    }

    if (child.type === PageSectionSubTitle || child.type === PageSectionTitle) {
      leftChildren.push(child);
      return;
    }

    otherChildren.push(child);
  });

  const hasStructuredHeader =
    leftChildren.length > 0 || descriptionChildren.length > 0;

  return (
    <div
      data-slot="header"
      className={cn(
        "space-y-4",
        sticky && "lg:sticky lg:top-32 lg:self-start max-w-8xl",
        className,
      )}
      {...props}
    >
      {hasStructuredHeader ? (
        <>
          {leftChildren.length > 0 || otherChildren.length > 0 ? (
            <div data-slot="header-left" className="space-y-4">
              {leftChildren}
              {otherChildren}
            </div>
          ) : null}
          {descriptionChildren}
        </>
      ) : (
        children
      )}
    </div>
  );
};

export const PageSectionTitle = ({
  children,
  className,
  size = "sm",
  ...props
}: ComponentProps<typeof Heading>) => {
  return (
    <Heading
      as="h4"
      size={size}
      data-slot="title"
      className={className}
      {...props}
    >
      {children}
    </Heading>
  );
};

export const PageSectionSubTitle = ({
  children,
  className,
  ...props
}: ComponentProps<typeof Heading>) => {
  return (
    <Heading
      size="subtitle"
      data-slot="subtitle"
      className={className}
      {...props}
    >
      {children}
    </Heading>
  );
};

export const PageSectionDescription = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      data-slot="description"
      className={cn("text-muted-foreground max-w-3xl text-lg", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const PageSectionContent = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div data-slot="content" className={cn(className)} {...props}>
      {children}
    </div>
  );
};
