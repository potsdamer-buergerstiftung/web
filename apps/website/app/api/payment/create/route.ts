import createMollieClient from '@mollie/api-client';
import { NextResponse } from 'next/server';

const mollieClient = createMollieClient({ apiKey: 'test_xfUphz3AmGdN2r8hpmg4yK5cBkQAwU' });

export async function POST(request: Request) {
    const { amount, description, redirectUrl, method } = await request.json();

    const formattedValue = amount.toFixed(2).replace(',', '.').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    console.log(formattedValue);

    const payment = await mollieClient.payments.create({
        amount: {
            currency: 'EUR',
            value: formattedValue,
        },
        description: `Spende für ${description}`,
        redirectUrl,
        method,
    });

    return NextResponse.json(payment);
}