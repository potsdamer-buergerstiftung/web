import { createDirectus, rest, staticToken } from "@directus/sdk";
import { Schema } from "./types/directus";

const directus = createDirectus<Schema>("https://portal.potsdamer-buergerstiftung.org").with(rest()).with(staticToken(process.env.DIRECTUS_TOKEN || "")); 

export default directus;
