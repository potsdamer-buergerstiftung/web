import { randomBytes } from "node:crypto";
import { createChallenge, verifyFieldsHash, verifySolution, verifyServerSignature } from 'altcha-lib'

export const dynamic = "force-dynamic";

export const ALTCHA_HMAC_KEY = process.env.ALTCHA_HMAC_KEY || randomBytes(16).toString('hex')

export async function GET() {
  try {
    const challenge = await createChallenge({
      hmacKey: ALTCHA_HMAC_KEY,
      maxNumber: 50_000
    })

    return Response.json(challenge, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error: any) {
    return Response.error()
  }
}

