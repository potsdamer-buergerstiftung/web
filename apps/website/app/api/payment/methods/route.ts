import createMollieClient, { Locale } from '@mollie/api-client';
import { NextResponse } from 'next/server';

const mollieClient = createMollieClient({ apiKey: 'test_xfUphz3AmGdN2r8hpmg4yK5cBkQAwU' });

export async function GET(request: Request) {

    const methods = await mollieClient.methods.list({
        locale: Locale.de_DE,
    });

    return NextResponse.json(methods);
}