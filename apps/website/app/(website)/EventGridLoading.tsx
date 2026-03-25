import React from "react";

export default function EventGridLoading() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="col-span-6 min-h-max lg:col-span-3 xl:col-span-2"
        >
          <div className="h-60 w-full animate-pulse overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-800" />
        </div>
      ))}
    </>
  );
}
