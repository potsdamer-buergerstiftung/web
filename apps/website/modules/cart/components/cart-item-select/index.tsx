"use client";

import {
  SelectHTMLAttributes,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import ChevronDown from "@/modules/common/icons/chevron-down";
import { cn } from "@/lib/utils";

type NativeSelectProps = {
  placeholder?: string;
  errors?: Record<string, unknown>;
  touched?: Record<string, unknown>;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "size">;

const CartItemSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ placeholder = "Select...", className, children, ...props }, ref) => {
    const innerRef = useRef<HTMLSelectElement>(null);
    const [isPlaceholder, setIsPlaceholder] = useState(false);

    useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
      ref,
      () => innerRef.current,
    );

    useEffect(() => {
      if (innerRef.current && innerRef.current.value === "") {
        setIsPlaceholder(true);
      } else {
        setIsPlaceholder(false);
      }
    }, [innerRef.current?.value]);

    return (
      <div>
        <div
          onFocus={() => innerRef.current?.focus()}
          onBlur={() => innerRef.current?.blur()}
          className={cn(
            "relative flex h-12 w-16 items-center justify-center rounded-md border border-border bg-white text-sm text-foreground transition-colors hover:border-primary/40 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 group",
            className,
            {
              "text-muted-foreground": isPlaceholder,
            },
          )}
        >
          <select
            ref={innerRef}
            {...props}
            className="h-full w-full appearance-none border-none bg-transparent px-4 text-center outline-none"
          >
            <option disabled value="">
              {placeholder}
            </option>
            {children}
          </select>
          <span className="absolute flex pointer-events-none justify-end w-8 group-hover:animate-pulse">
            <ChevronDown />
          </span>
        </div>
      </div>
    );
  },
);

CartItemSelect.displayName = "CartItemSelect";

export default CartItemSelect;
