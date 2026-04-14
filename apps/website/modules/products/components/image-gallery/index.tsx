import { HttpTypes } from "@medusajs/types"
import Image from "next/image"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <div className="relative">
      <div className="grid gap-4">
        {images.map((image, index) => {
          return (
            <div
              key={image.id}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border bg-white shadow-sm"
              id={image.id}
            >
              {!!image.url && (
                <Image
                  src={image.url}
                  priority={index <= 2 ? true : false}
                  className="absolute inset-0 object-cover object-center"
                  alt={`Product image ${index + 1}`}
                  fill
                  sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGallery
