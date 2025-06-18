"use client";

import { RicosViewer, quickStartViewerPlugins } from "@wix/ricos";

const RichContentViewer = ({ content }) => {
  console.log("RENDERING CONTENT", content);
  return <RicosViewer content={content} plugins={quickStartViewerPlugins()} />;
};
export default RichContentViewer;
