import { Directus } from "@directus/sdk";
import { Suspense } from "react";
import Event from "./Event";
import { wixClient } from "app/(website)/wix";
import { wixEventsV2 as wixEvents } from '@wix/events';

async function getEvent(id: string) {
    return (await wixClient.wixEventsV2.getEventBySlug(id, { fields: [wixEvents.RequestedFields.DETAILS, wixEvents.RequestedFields.TEXTS] })).event
}

export default function PostPage({
    params,
}: {
    params: { id: string };
}) {
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