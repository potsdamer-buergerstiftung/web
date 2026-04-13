import Link from "next/link"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis } from "@/components/ui/breadcrumb";

export function PageBreadcrumb({ children }: React.PropsWithChildren) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink render={<Link href="/">Startseite</Link>} />
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {children}
            </BreadcrumbList>
        </Breadcrumb>
    );
}


interface PageBreadcrumbItemProps {
    label: string;
    href?: string;
}

export function PageBreadcrumbItem({ label, href }: PageBreadcrumbItemProps) {
    if (!href) {
        return (
            <BreadcrumbItem>
                <BreadcrumbPage>{label}</BreadcrumbPage>
            </BreadcrumbItem>
        )
    }

    return (
        <BreadcrumbItem>
            <BreadcrumbLink render={<Link href={href}>{label}</Link>} />
        </BreadcrumbItem>
    );
}

export { BreadcrumbSeparator as PageBreadcrumbSeparator }