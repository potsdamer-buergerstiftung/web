"use client";

import Image from "@components/Image";
import clsx from "clsx";
import NextImage from "next/image";
import { useState } from "react";

interface EventCardProps {
  eventId?: string;
  title: string;
  summary?: string;
  start: Date;
  image: string;
  registration_needed?: boolean;
  external_ticket_url?: string;
  canceled?: boolean;
  localImage?: boolean;
}

export default function EventCard({
  title,
  summary,
  start,
  image,
  localImage,
  eventId,
}: EventCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <a
      href={`https://potsdamer-buergerstiftung.org/aktuelles/veranstaltungen/${eventId}`}
      // onClick={() => setExpanded(!expanded)}
      className={clsx([
        "cursor-pointer bg-white grid min-h-max w-full grid-cols-5 overflow-hidden rounded-tl-2xl rounded-br-2xl shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-xl",
        expanded ? "h-full" : "lg:h-64",
      ])}
    >
      <div className="relative col-span-5 h-64 w-full lg:col-span-2 lg:h-full">
        <NextImage
          src={`https://portal.potsdamer-buergerstiftung.org/assets/${image}`}
          alt={`Bild von ${title}`}
          width={600}
          height={400}
          quality={40}
          className="absolute h-full w-full object-cover"
        />
        {/* {localImage ? (
                    <NextImage src={`/img/${image}`} alt={`Bild von ${title}`} width={400} height={400} className="absolute h-full w-full object-cover" />
                ) : (<Image
                    src={image}
                    alt="test"
                    width={700}
                    height={400}
                    className="absolute h-full w-full object-cover"
                />)} */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 rounded-tl-lg rounded-br-lg bg-white p-4 shadow-md md:left-8 lg:left-auto lg:right-6">
          <p>
            {new Date(start).toLocaleDateString("de", {
              month: "short",
              timeZone: "Europe/Berlin",
            })}
          </p>
          <h1 className="font-serif text-4xl">
            {new Date(start).getUTCDate()}
          </h1>
          <p>
            {new Date(start).toLocaleDateString("de", {
              weekday: "short",
              timeZone: "Europe/Berlin",
            })}
          </p>
        </div>
      </div>
      <div className="col-span-5 flex flex-col items-start justify-between p-6 md:p-8 lg:col-span-3 lg:flex-row lg:items-center lg:space-x-10 lg:p-10">
        <div className="text-left">
          <p className="mb-2 text-md font-bold uppercase tracking-widest text-green-500">
            {new Date(start).toLocaleTimeString("de", {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "Europe/Berlin",
            })}
          </p>
          <h1 className="line-clamp-4 lg:line-clamp-2 font-serif text-2xl leading-tight md:text-3xl">
            {title}
          </h1>
          {summary && (
            <p
              className={clsx(
                "text-md mt-4 leading-relaxed",
                !expanded && "line-clamp-4 lg:line-clamp-2"
              )}
            >
              {summary}
            </p>
          )}
        </div>
      </div>
    </a>
  );
}
