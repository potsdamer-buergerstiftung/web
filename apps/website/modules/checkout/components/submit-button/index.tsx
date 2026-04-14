"use client"

import React from "react"
import { useFormStatus } from "react-dom"

import { Button } from "@/components/ui/button"

export function SubmitButton({
  children,
  variant = "primary",
  className,
  "data-testid": dataTestId,
}: {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "transparent" | "danger" | null
  className?: string
  "data-testid"?: string
}) {
  const { pending } = useFormStatus()

  const buttonVariant =
    variant === "secondary"
      ? "secondary"
      : variant === "transparent"
        ? "ghost"
        : variant === "danger"
          ? "destructive"
          : "default"

  return (
    <Button
      size="lg"
      className={className}
      type="submit"
      isLoading={pending}
      variant={buttonVariant}
      data-testid={dataTestId}
    >
      {children}
    </Button>
  )
}
