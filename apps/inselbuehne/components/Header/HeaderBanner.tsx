export default function HeaderBanner() {
    return (
        <div className="absolute z-50 w-full bg-green-200 py-3 md:p-3">
            <p className="container mx-auto px-4 text-sm md:text-center">
                Ein Projekt der <a
                    className="font-bold"
                    href="https://www.potsdamer-buergerstiftung.org"
                    target="_blank"
                >Potsdamer Bürgerstiftung</a> und <a className="font-bold" href="https://eventbikezero.de" target="_blank"
                >Eventbike Zero</a>.
            </p>
        </div>
    )
}