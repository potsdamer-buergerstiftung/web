import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-transparent dark:bg-input/30 focus-visible:border-transparent focus-visible:ring-primary aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 disabled:bg-input/50 dark:disabled:bg-input/80 rounded-sm border bg-input px-4 py-2 text-base transition-colors focus-visible:ring-2 aria-invalid:ring-2 md:text-md flex field-sizing-content min-h-16 w-full outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
