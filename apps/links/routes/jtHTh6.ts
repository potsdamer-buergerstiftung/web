// Link für die Spenden-Seite der Bürgerstiftungs-Website

export default eventHandler((event) => {
  return sendRedirect(
    event,
    "https://www.potsdamer-buergerstiftung.org/mitstiften",
    307
  );
});
