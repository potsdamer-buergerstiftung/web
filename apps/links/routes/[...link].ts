import { Directus } from "@directus/sdk";

const api = new Directus<any>("https://portal.potsdamer-buergerstiftung.org");

export default eventHandler(async (event) => {
  const id = event.context.params.link;
  if (!id) {
    return "No Link specified";
  }
  const link = await api.items("public_links").readOne(id);
  return sendRedirect(event, link.destination, 307);
});
