import Link from "next/link"

interface PageBreadcrumb {
    items: React.ReactNode[];
}

export default function PageBreadcrumb({ items }: PageBreadcrumb) {
    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol role="list" className="flex flex-row items-center space-x-2 flex-wrap">
                <li>
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="text-sm font-bold transition hover:text-emerald-500"
                        >
                            Startseite
                        </Link>
                    </div>
                </li>
                {items}
            </ol >
        </nav >
    );
}