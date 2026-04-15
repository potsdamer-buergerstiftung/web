import { HTMLAttributes } from "react";

export function StepTitle({
  title,
  description,
  ...props
}: { title: string; description: string } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <h1 className="font-header font-bold text-3xl mb-2">{title}</h1>
      <p className="max-w-2xl">{description}</p>
    </div>
  );
}
