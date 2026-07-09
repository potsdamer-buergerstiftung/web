import React from "react";
import clsx from "clsx";
import { ArrowDownTrayIcon, DocumentIcon } from "@heroicons/react/24/outline";
import { RenderFn } from "./render";

export interface AttachesBlockData {
  file: {
    url: string;
    fileURL?: string;
    name?: string;
    title?: string;
    extension?: string;
    size?: string | number;
  };
  title?: string;
}

const formatFileSize = (size?: string | number) => {
  const bytes = Number(size);
  if (!bytes || Number.isNaN(bytes)) return undefined;

  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex++;
  }

  return `${value.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
};

const Attaches: RenderFn<AttachesBlockData> = ({ data, className = "mb-6" }) => {
  if (!data?.file?.url) return <></>;

  const title = data.title || data.file.title || data.file.name;
  const size = formatFileSize(data.file.size);
  const extension = data.file.extension?.toUpperCase();
  const meta = [extension, size].filter(Boolean).join(" · ");

  return (
    <a
      href={`https://portal.potsdamer-buergerstiftung.org${data.file.url}`}
      download={data.file.name}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "not-prose flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition hover:bg-muted",
        className,
      )}
    >
      <DocumentIcon className="h-8 w-8 shrink-0 text-slate-500" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium dark:text-foreground">{title}</p>
        {meta && <p className="text-sm text-slate-500">{meta}</p>}
      </div>
      <ArrowDownTrayIcon className="h-5 w-5 shrink-0 text-slate-500" />
    </a>
  );
};

export default Attaches;
