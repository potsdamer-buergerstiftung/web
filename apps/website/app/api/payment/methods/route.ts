import createMollieClient, { Locale, SequenceType } from '@mollie/api-client';
import { NextResponse } from 'next/server';

const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY });

export async function POST(request: Request) {

    const { duration } = await request.json();

    const methods = await mollieClient.methods.list({
        locale: Locale.de_DE,
        sequenceType: duration === "ONE_TIME" ? SequenceType.oneoff : SequenceType.first,
    });

    console.log(methods)

    return NextResponse.json(methods);
}