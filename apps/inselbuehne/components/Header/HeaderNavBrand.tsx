import Link from "next/link";

export default function HeaderNavBrand() {
    return (
        <Link href="/">
            <h1
                className="my-6 -ml-4 whitespace-nowrap px-4 py-2 font-serif text-2xl md:text-3xl lg:m-6 lg:px-2 xl:px-4"
            >
                Inselbühne Potsdam
            </h1>
        </Link>
    )
}