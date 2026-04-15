import React, { useEffect, useImperativeHandle, useState } from "react";

import { Input as InputBase } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Eye from "@/modules/common/icons/eye";
import EyeOff from "@/modules/common/icons/eye-off";

type InputProps = Omit<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
  "placeholder"
> & {
  label: string;
  errors?: Record<string, unknown>;
  touched?: Record<string, unknown>;
  name: string;
  topLabel?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, label, touched, required, topLabel, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [inputType, setInputType] = useState(type);

    useEffect(() => {
      if (type === "password" && showPassword) {
        setInputType("text");
      }

      if (type === "password" && !showPassword) {
        setInputType("password");
      }
    }, [type, showPassword]);

    useImperativeHandle(ref, () => inputRef.current!);

    return (
      <div className="flex w-full flex-col gap-2">
        {topLabel && (
          <Label htmlFor={name} className="text-sm font-medium">
            {topLabel}
          </Label>
        )}
        <div className="flex flex-col gap-2">
          <Label htmlFor={name} className="text-sm font-medium">
            {label}
            {required && <span className="text-destructive">*</span>}
          </Label>
          <div className="relative">
            <InputBase
              ref={inputRef}
              id={name}
              type={inputType}
              name={name}
              required={required}
              className={type === "password" ? "pr-12" : undefined}
              {...props}
            />
            {type === "password" && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-0 flex items-center px-4 transition-colors"
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
