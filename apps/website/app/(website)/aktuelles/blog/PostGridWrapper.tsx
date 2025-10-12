"use client";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

interface PostGridWrapperProps {
  children: React.ReactNode;
}

export default function PostGridWrapper({ children }: PostGridWrapperProps) {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
      <Masonry gutter="2.5rem">{children}</Masonry>
    </ResponsiveMasonry>
  );
}
