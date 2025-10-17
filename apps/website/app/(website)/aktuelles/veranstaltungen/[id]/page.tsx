import { Directus } from "@directus/sdk";
import { Suspense } from "react";
import Event from "./Event";

async function getEvent(id: string) {
    const directus = new Directus("https://portal.potsdamer-buergerstiftung.org");
    const res = await directus.items<any, any>("events").readByQuery({
        fields: ["name", "description", "summary", "start", "end", "location", "image"],
        filter: {
            id: {
                _eq: id,
            },
        }
    });

    return res.data![0];
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
