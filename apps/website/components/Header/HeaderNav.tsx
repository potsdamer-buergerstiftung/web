"use client";

interface HeaderNavProps {
    items: React.ReactNode[];
}

export default function HeaderNav({ items }: HeaderNavProps) {
    return (
        <nav className="absolute top-0 bottom-0 left-0 right-0 flex h-screen min-h-screen flex-col overflow-y-auto bg-slate-900 transition-transform duration-500 md:right-1/4 lg:relative lg:h-auto lg:min-h-0 lg:translate-x-0 lg:flex-row lg:overflow-y-visible lg:bg-transparent lg:transition-none">
            <div className="mb-8 block px-4 py-8 lg:hidden"></div>
            {items}
            <div className="mb-8 flex flex-col items-start px-4 pt-8 pb-20 lg:hidden">
                <slot name="actions" />
            </div>
        </nav>
    );
}