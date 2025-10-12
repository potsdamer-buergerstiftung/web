import { createDirectus, rest, staticToken } from "@directus/sdk";

const directus = createDirectus("https://portal.potsdamer-buergerstiftung.org")
  .with(rest())
  .with(staticToken(process.env.DIRECTUS_TOKEN || ""));

export default directus;
