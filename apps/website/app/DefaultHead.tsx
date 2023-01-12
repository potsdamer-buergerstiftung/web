interface DefaultHeadProps {
  title: string;
}

export default function DefaultHead({ title }: DefaultHeadProps) {
  return (
    <>
      <meta
        name="description"
        content="Wir vernetzen Gleichgesinnte, versammeln engagierte Menschen, bieten Unterstützung als Plattform für Ehrenamt und möchten es den Menschen in Potsdam leichter machen, das Gemeinwohl zu stärken, Gemeinschaftsgefühl zu erleben, ein herzliches Miteinander und eine starke Zukunft für Potsdam zu stiften."
      />
    </>
  );
}
