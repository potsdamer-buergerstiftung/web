"use client";

import NextImage, { ImageLoaderProps, ImageProps } from "next/image";

type CustomImageProps = Omit<ImageProps, "loader"> & {
  height?: number | string;
  loader?: boolean;
};

export default function Image(data: CustomImageProps) {
  const { height } = data;
  const enableLoader = data.loader ?? true;

  const loader = ({ width, src, quality }: ImageLoaderProps) => {
    return (
      `https://portal.potsdamer-buergerstiftung.org/assets/${src}?width=${width}&q=${
        quality || 40
      }&format=auto&fit=cover` + (height ? `&height=${height}` : "")
    );
  };

  return <NextImage {...data} loader={enableLoader ? loader : undefined} />;
}
