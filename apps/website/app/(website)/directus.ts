import { createDirectus, rest, staticToken } from "@directus/sdk";

const directus = createDirectus(process.env.NEXT_PUBLIC_PORTAL_URL || "https://portal.potsdamer-buergerstiftung.org")
  .with(rest())
  .with(staticToken(process.env.DIRECTUS_TOKEN || ""));

export default directus;
