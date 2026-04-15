import * as AccordionPrimitive from "@radix-ui/react-accordion";
import React from "react";

import { cn } from "@/lib/utils";

type AccordionItemProps = AccordionPrimitive.AccordionItemProps & {
  title: string;
  subtitle?: string;
  description?: string;
  required?: boolean;
  tooltip?: string;
  forceMountContent?: true;
  headingSize?: "small" | "medium" | "large";
  customTrigger?: React.ReactNode;
  complete?: boolean;
  active?: boolean;
  triggerable?: boolean;
  children: React.ReactNode;
};

type AccordionProps =
  | (AccordionPrimitive.AccordionSingleProps &
      React.RefAttributes<HTMLDivElement>)
  | (AccordionPrimitive.AccordionMultipleProps &
      React.RefAttributes<HTMLDivElement>);

const Accordion: React.FC<AccordionProps> & {
  Item: React.FC<AccordionItemProps>;
} = ({ children, ...props }) => {
  return (
    <AccordionPrimitive.Root {...props}>{children}</AccordionPrimitive.Root>
  );
};

const Item: React.FC<AccordionItemProps> = ({
  title,
  subtitle,
  description,
  children,
  className,
  headingSize = "large",
  customTrigger = undefined,
  forceMountContent = undefined,
  triggerable,
  ...props
}) => {
  return (
    <AccordionPrimitive.Item
      {...props}
      className={cn(
        "group border-t border-border py-3 last:border-b",
        className,
      )}
    >
      <AccordionPrimitive.Header className="px-1">
        <div className="flex flex-col">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-foreground">
                {title}
              </span>
            </div>
            <AccordionPrimitive.Trigger>
              {customTrigger || <MorphingTrigger />}
            </AccordionPrimitive.Trigger>
          </div>
          {subtitle && (
            <span className="mt-1 text-sm text-muted-foreground">
              {subtitle}
            </span>
          )}
        </div>
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content
        forceMount={forceMountContent}
        className="px-1 radix-state-closed:pointer-events-none radix-state-closed:animate-accordion-close radix-state-open:animate-accordion-open"
      >
        <div className="group-radix-state-closed:animate-accordion-close">
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
          <div className="w-full">{children}</div>
        </div>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  );
};

Accordion.Item = Item;

const MorphingTrigger = () => {
  return (
    <div className="group relative rounded-full p-1.5 text-foreground transition-colors hover:bg-background">
      <div className="relative h-5 w-5">
        <span className="bg-current absolute inset-y-[31.75%] left-[48%] right-1/2 w-[1.5px] rounded-full duration-300 group-radix-state-open:rotate-90 group-radix-state-open:left-1/2 group-radix-state-open:right-1/2" />
        <span className="bg-current absolute inset-x-[31.75%] top-[48%] bottom-1/2 h-[1.5px] rounded-full duration-300 group-radix-state-open:rotate-90" />
      </div>
    </div>
  );
};

export default Accordion;
