import { createDirectus, rest } from "@directus/sdk";

const directus = createDirectus("https://portal.potsdamer-buergerstiftung.org").with(rest()); 

export default directus;
