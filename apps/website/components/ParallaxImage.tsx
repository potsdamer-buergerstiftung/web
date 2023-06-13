"use client";

import Image from "@components/Image";
import { RefObject, useEffect, useRef, useState } from "react";

function getWindowDimensions() {
    if (typeof window === 'undefined') return { width: 0, height: 0 };
    
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

function useElementBounding(target: RefObject<HTMLElement>) {
    const [top, setTop] = useState(0);

    useEffect(() => {
        function handleUpdate() {
            let top = target.current?.getBoundingClientRect().top ?? 0;
            setTop(top);
        }

        window.addEventListener('resize', handleUpdate);
        window.addEventListener('scroll', handleUpdate);
        return () => window.removeEventListener('resize', handleUpdate);
    }, [target]);

    return top;
}

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState({ height: 0, width: 0 });

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}

export default function ParallaxImage() {

    const image = useRef<HTMLImageElement | null>(null);
    const top = useElementBounding(image);
    const { height } = useWindowDimensions();

    useEffect(() => {
        console.log(top);
    }, [top]);

    /* return (
        <Image src="b6431451-1fdc-45ac-ab79-c42c3a0b7627" quality="70" width="1600" ref={image}
            height="1300" className="w-full h-[25rem] object-cover" alt="Stand auf der Freundschaftsinsel" style={{ objectPosition: `50% ${(top / height * 40) + 20}%` }} />
    ); */

    return (<></>)
}