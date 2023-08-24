import Link from "next/link";

const FooterCopyright: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <div className="container mx-auto grid grid-cols-1 justify-between gap-4 px-4 py-6 md:grid-cols-2">
      <p>© {year} Potsdamer Bürgerstiftung & Mitwirkende</p>
      <ul className="flex flex-row justify-start space-x-4 md:justify-end">
        <li>
          <Link
            href="/kontakt"
            className="text-navy-900 transition hover:text-green-500"
          >
            Kontakt
          </Link>
        </li>
        <li>
          <Link
            href="/impressum"
            className="text-navy-900 transition hover:text-green-500"
          >
            Impressum
          </Link>
        </li>
        <li>
          <Link
            href="/datenschutz"
            className="text-navy-900 transition hover:text-green-500"
          >
            Datenschutz
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default FooterCopyright;
