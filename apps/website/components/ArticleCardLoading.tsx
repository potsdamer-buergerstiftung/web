import React from "react";

const ArticleCardLoading: React.FC = () => {
  return (
    <div className="group relative block h-full w-full overflow-hidden rounded-md animate-pulse">
      <div className="relative aspect-[5/4] bg-slate-200" />
      <div className="relative bg-slate-100 px-6 py-8">
        <div className="flex flex-wrap gap-2 mb-4">
           <div className="h-4 w-24 bg-slate-200 rounded-sm" />
           <div className="h-4 w-32 bg-slate-200 rounded-sm" />
        </div>
        <div className="h-8 w-full bg-slate-200 rounded-sm mb-2" />
        <div className="h-8 w-3/4 bg-slate-200 rounded-sm" />
        <div className="mt-4 flex flex-wrap gap-2">
           <div className="h-7 w-16 bg-slate-200 rounded-md" />
           <div className="h-7 w-20 bg-slate-200 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default ArticleCardLoading;
