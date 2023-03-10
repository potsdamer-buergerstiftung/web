const imageLoader = ({ src, width, quality }) => {
  return `https://portal.potsdamer-buergerstiftung.org/assets/${src}?width=${width}&q=${
    quality || 40
  }&format=webp`;
};

export default imageLoader;
