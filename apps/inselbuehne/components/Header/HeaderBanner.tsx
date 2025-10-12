export default function HeaderBanner() {
  return (
    <div className="absolute z-50 w-full bg-green-200 py-3 md:p-3">
      <p className="container mx-auto px-4 text-sm md:text-center">
        Ein Projekt der{" "}
        <a
          className="font-bold"
          href="https://www.potsdamer-buergerstiftung.org"
          rel="noreferrer"
          target="_blank"
        >
          Potsdamer Bürgerstiftung
        </a>
      </p>
    </div>
  );
}
