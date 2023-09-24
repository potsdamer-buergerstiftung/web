import createMollieClient from '@mollie/api-client';
import { NextResponse } from 'next/server';

const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY });

export async function POST(request: Request) {
    const { amount, description, redirectUrl, method, duration, customerId } = await request.json();

    const formattedValue = amount.toFixed(2).replace(',', '.').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    let checkedDuration;

    if (duration === "ONE_TIME") {
        checkedDuration = "oneoff";
    } else {
        checkedDuration = "first";
    }

    const payment = await mollieClient.payments.create({
        amount: {
            currency: 'EUR',
            value: formattedValue,
        },
        description: `Spende für ${description}`,
        redirectUrl,
        method,
        customerId,
        sequenceType: checkedDuration,
    });

    return NextResponse.json(payment);
}