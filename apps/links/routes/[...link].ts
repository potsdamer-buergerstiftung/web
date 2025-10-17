import { createDirectus, readItems, rest, staticToken } from "@directus/sdk";

const directus = createDirectus("https://portal.potsdamer-buergerstiftung.org").with(rest()).with(staticToken(process.env.DIRECTUS_TOKEN || ""));

export default eventHandler(async (event) => {
  const id = event.context.params.link;
  
  if (!id) {
    return "No Link specified";
  }

  const link = await directus.request(readItems("public_links", {
    filter: {
      id: {
        _eq: id,
      },
    },
  }));

  return sendRedirect(event, link[0]?.destination || "", 307);
});
