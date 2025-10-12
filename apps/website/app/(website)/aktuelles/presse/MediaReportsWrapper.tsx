"use client";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

interface MediaReportsWrapperProps {
  children: React.ReactNode;
}

export default function MediaReportsWrapper(props: MediaReportsWrapperProps) {
  const { children } = props;
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
      <Masonry gutter="2.5rem">{children}</Masonry>
    </ResponsiveMasonry>
  );
}
