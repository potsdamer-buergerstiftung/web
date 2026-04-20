import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const headingVariants = cva(undefined, {
  variants: {
    size: {
      subtitle:
        "text-sm font-medium uppercase tracking-[0.14em] text-primary",
      sm: "text-[clamp(1.5rem,4vw,2.25rem)] leading-[1.1] font-semibold font-header tracking-[-0.02em] text-secondary",
      md: "text-[clamp(2.5rem,4.8vw,5rem)] leading-[0.9] font-semibold font-header tracking-[-0.05em] text-secondary",
      lg: "text-[clamp(2.9rem,6vw,5.9rem)] leading-[0.9] font-semibold font-header tracking-[-0.06em] text-secondary",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const headingVariantsLoading = cva(
  "w-3/4 animate-pulse rounded-md bg-input",
  {
    variants: {
      size: {
        subtitle: "h-4",
        sm: "h-10",
        md: "h-16",
        lg: "h-20",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const Heading: React.FC<
  {
    children: React.ReactNode;
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    isLoading?: boolean;
  } & React.HTMLAttributes<HTMLHeadingElement> &
    VariantProps<typeof headingVariants>
> = ({ children, as = "h4", size = "lg", isLoading, className, ...props }) => {
  const Tag = size === "subtitle" ? "h1" : as;

  if (isLoading) {
    return (
      <Skeleton className={cn(headingVariantsLoading({ size }))} />
    );
  }

  return <Tag className={cn(headingVariants({ size }), className)} {...props}>
    {children}
  </Tag>;
};
