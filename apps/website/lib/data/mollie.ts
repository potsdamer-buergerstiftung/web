import { createMollieClient } from "@mollie/api-client";

export const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY });
