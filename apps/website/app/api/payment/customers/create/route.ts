import createMollieClient, { Locale, SequenceType } from '@mollie/api-client';
import { NextResponse } from 'next/server';

const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY });

export async function POST(request: Request) {

    const { firstName, lastName, email, organization } = await request.json();

    const customer = await mollieClient.customers.create({
        name: `${firstName} ${lastName}`,
        email,
        locale: Locale.de_DE,
        metadata: {
            organization,
        }
    })

    return NextResponse.json(customer);
}