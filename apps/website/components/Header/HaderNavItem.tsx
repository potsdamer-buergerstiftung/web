import clsx from "clsx";
import Link from "next/link";

interface HeaderNavItemProps {
    isActive?: boolean;
    children: React.ReactNode;
    index: number;
    href?: string;
}

function addZero(index: string): string {
    const number = Number(index);
    return number < 10 ? `0${index}` : index.toString();
}

const HeaderNavItem: React.FC<HeaderNavItemProps> = ({
    isActive = false,
    href,
    children,
    index,
}) => {
    const anchorClass = clsx(
        "group flex flex-row justify-start gap-1 px-4 py-4 outline-none lg:flex-col lg:gap-0 lg:px-3 lg:py-2"
    )
    const AnchorElement = ({ children }: { children: React.ReactNode }) => href ? <Link
        href={href}
        className={anchorClass}
    >{children}</Link> : <a className={anchorClass}>{children}</a>;

    return (
        <div className="group relative flex flex-col justify-start">
            <AnchorElement>
                <span
                    className={clsx(
                        "text-xs font-bold leading-4 transition group-hover:text-emerald-500 group-focus:text-emerald-500"
                    )}
                >
                    {addZero(index.toString())}
                </span>
                <span
                    className={clsx(
                        "text-2xl font-bold text-white lg:text-slate-900 transition group-hover:text-emerald-500 group-focus:text-emerald-500 lg:text-[1rem] lg:font-medium lg:leading-6"
                    )}
                >
                    {children}
                </span>
            </AnchorElement>
        </div>
    );
};

export default HeaderNavItem;
