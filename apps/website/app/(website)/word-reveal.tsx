"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface WordRevealProps {
  text: string;
  className?: string;
}

export default function WordReveal({
  text,
  className,
}: WordRevealProps) {
  const ref = useRef<HTMLParagraphElement | null>(null);

  useGSAP(
    () => {
      if (!ref.current) {
        return;
      }

      const words = gsap.utils.toArray<HTMLSpanElement>(
        "[data-home-word]",
        ref.current,
      );

      if (!words.length) {
        return;
      }

      gsap.set(words, {
        opacity: 0.12,
        y: 18,
      });

      gsap.to(words, {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 72%",
          end: "bottom 42%",
          scrub: 0.9,
        },
      });
    },
    { scope: ref },
  );

  return (
    <p
      ref={ref}
      className={cn("flex flex-wrap gap-x-[0.32em] gap-y-[0.48em]", className)}
    >
      {text.split(" ").map((word, index) => (
        <span key={`${word}-${index}`} data-home-word className="inline-block">
          {word}
        </span>
      ))}
    </p>
  );
}
