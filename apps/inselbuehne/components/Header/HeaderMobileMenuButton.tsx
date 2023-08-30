import { useAtom } from "jotai"
import { mobileMenuOpen } from "./state"

export default function HeaderMobileMenuButton() {
    const [mobileOpen, setMobileOpen] = useAtom(mobileMenuOpen);
    return (
        <button
            className="flex flex-row items-center lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
        >
            <span className="font-bold">Menü</span>
            {!mobileOpen && (
                <svg
                    xmlns=" http://www.w3.org/2000/svg"
                    className="ml-1 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            )}
            {mobileOpen && (
                <svg
                    xmlns=" http://www.w3.org/2000/svg"
                    className="ml-1 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            )}
        </button>
    )
}