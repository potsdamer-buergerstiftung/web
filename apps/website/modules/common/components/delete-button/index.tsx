import { deleteLineItem } from "@/lib/data/cart"
import { useState } from "react"

import { TrashIcon } from "@heroicons/react/24/outline"

import { cn } from "@/lib/utils"
import Spinner from "@/modules/common/icons/spinner"

const DeleteButton = ({
  id,
  children,
  className,
}: {
  id: string
  children?: React.ReactNode
  className?: string
}) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (id: string) => {
    setIsDeleting(true)
    await deleteLineItem(id).catch((err) => {
      setIsDeleting(false)
    })
  }

  return (
    <div
      className={cn("flex items-center justify-between text-sm", className)}
    >
      <button
        className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
        onClick={() => handleDelete(id)}
      >
        {isDeleting ? <Spinner size="14" /> : <TrashIcon className="size-4" />}
        <span>{children}</span>
      </button>
    </div>
  )
}

export default DeleteButton
