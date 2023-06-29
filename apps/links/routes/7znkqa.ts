// Drachenboot-Link-Spenden

export default eventHandler((event) => {
  return sendRedirect(event, "https://www.potsdam-crowd.de/drachenboot", 307);
});
