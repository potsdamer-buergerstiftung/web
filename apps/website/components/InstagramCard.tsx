import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

const InstagramCard: React.FC<{
    title: string;
    date: Date;
    imageUrl?: string;
    compact?: boolean;
    link?: string;
}> = (props) => {
    const {
        compact = true,
        title,
        date,
        imageUrl,
        link,
    } = props;

    const formattedDate = date.toLocaleDateString("de", {
        year: "numeric",
        day: "numeric",
        month: "long",
    });

    const wrapperClass =
        "group relative block h-full w-full overflow-hidden rounded-md";

    const Wrapper = ({ children }) =>
        link ? (
            <Link href={link} className={wrapperClass} rel="noopener noreferrer" target="_blank">
                {children}
            </Link>
        ) : (
            <div className={wrapperClass}>{children}</div>
        );

    return (
        <Wrapper>
            {imageUrl && (
                <div
                    className="relative overflow-hidden aspect-[4/3]"
                >
                    <Image
                        src={imageUrl}
                        height={300}
                        width={300}
                        quality={35}
                        alt="Bild vom Event"
                        className={clsx(
                            "h-full",
                            "w-full",
                            "object-cover",
                            "transition",
                            "duration-500",
                            "group-hover:scale-110",
                        )}
                    />
                    <div
                        className="absolute left-0 right-0 bottom-0 transition duration-500 translate-y-3 bg-gradient-to-t from-slate-900 to-transparent px-6 pb-8"
                    >
                        <h2
                            className="font-header text-3xl font-bold text-white"
                        >
                            {title}
                        </h2>
                    </div>
                </div>
            )
            }
        </Wrapper >
    );
};

export default InstagramCard;
