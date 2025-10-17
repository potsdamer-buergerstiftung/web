import { createDirectus, readItems, rest } from "@directus/sdk";
import { Suspense } from "react";
import Event from "./Event";

async function getEvent(id: string) {
    const directus = createDirectus("https://portal.potsdamer-buergerstiftung.org").with(rest());
    const res = await directus.request(readItems("events", {
        fields: ["name", "description", "summary", "start", "end", "location", "image"],
        filter: {
            id: {
                _eq: id,
            },
        }
    }));

    return res;
}

export default async function PostPage(
    props: {
        params: Promise<{ id: string }>;
    }
) {
    const params = await props.params;
    const event = getEvent(params.id);

    return (
        <>
            <Suspense>
                {/* @ts-ignore-error */}
                <Event promise={event} />
            </Suspense>
        </>
    )
}
