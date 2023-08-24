import Link from "next/link";

interface PageBreadcrumbItemProps {
    label: string;
    href?: string;
}

export default function PageBreadcrumbItem({ label, href }: PageBreadcrumbItemProps) {
    return (
        <li >
            <div className="flex items-center">
                <svg
                    className="h-2 w-auto"
                    viewBox="0 0 9 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0 14.5697L1.36504 16L9 8L1.36504 0L0 1.4303L6.26992 8L0 14.5697V14.5697Z"
                    ></path>
                </svg>
                {!href ? (
                    <div
                        className="ml-2 cursor-default text-sm"
                    >
                        {label}
                    </div>

                ) : (
                    <Link
                        href={href}
                        className="ml-2 text-sm font-bold transition hover:text-emerald-500"
                    >
                        {label}
                    </Link>
                )}
            </div>
        </li>
    );
}