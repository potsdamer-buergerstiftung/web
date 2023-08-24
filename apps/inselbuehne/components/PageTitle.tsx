import clsx from "clsx";

interface PageTitleProps {
  title: string;
  heading?: string;
  description?: React.ReactNode;
}

export default function PageTitle({
  title,
  description,
  heading
}: PageTitleProps) {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 pt-48 pb-24 text-center lg:px-0">
        {(heading) && (
          <h4 className="text-sm font-bold uppercase tracking-widest text-green-500">
            {heading}
          </h4>
        )}
        <h1 className="mt-6 font-serif text-5xl md:text-6xl">{title}</h1>
        {(description) && (
          <p className="pt-5 text-lg text-gray-600" v-if="$slots.description">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
