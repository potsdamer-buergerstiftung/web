import InteractiveLink from "@/modules/common/components/interactive-link"

const EmptyCartMessage = () => {
  return (
    <div
      className="flex flex-col items-start justify-center px-2 py-24"
      data-testid="empty-cart-message"
    >
      <h1 className="font-header text-5xl font-bold text-foreground md:text-6xl">
        Warenkorb
      </h1>
      <p className="mt-4 mb-6 max-w-lg text-base text-muted-foreground">
        Sie haben noch nichts in Ihrem Warenkorb. Das ändern wir jetzt. Nutzen
        Sie den Link unten, um unsere Produkte zu entdecken.
      </p>
      <InteractiveLink href="/store">Produkte entdecken</InteractiveLink>
    </div>
  )
}

export default EmptyCartMessage
