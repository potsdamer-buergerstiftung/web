import Image from "next/image"
import React from "react"

import { cn } from "@/lib/utils"

import PlaceholderImage from "@/modules/common/icons/placeholder-image"

type ThumbnailProps = {
  thumbnail?: string | null
  // TODO: Fix image typings
  images?: any[] | null
  size?: "small" | "medium" | "large" | "full" | "square"
  isFeatured?: boolean
  className?: string
  "data-testid"?: string
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  images,
  size = "small",
  isFeatured,
  className,
  "data-testid": dataTestid,
}) => {
  const initialImage = thumbnail || images?.[0]?.url
  const aspectRatio = isFeatured
    ? "11 / 14"
    : size === "square"
      ? "1 / 1"
      : "9 / 16"

  const width =
    size === "small"
      ? 180
      : size === "medium"
        ? 290
        : size === "large"
          ? 440
          : undefined

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-3xl border border-border bg-white shadow-sm transition-shadow duration-150 group-hover:shadow-md",
        className,
        { "w-full": size === "full" }
      )}
      style={{ aspectRatio, width }}
      data-testid={dataTestid}
    >
      <ImageOrPlaceholder image={initialImage} size={size} />
    </div>
  )
}

const ImageOrPlaceholder = ({
  image,
  size,
}: Pick<ThumbnailProps, "size"> & { image?: string }) => {
  return image ? (
    <Image
      src={image}
      alt="Thumbnail"
      className="absolute inset-0 object-cover object-center"
      draggable={false}
      quality={50}
      sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
      fill
    />
  ) : (
    <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-muted/40">
      <PlaceholderImage size={size === "small" ? 16 : 24} />
    </div>
  )
}

export default Thumbnail
