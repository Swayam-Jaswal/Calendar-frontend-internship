export default function HeroArtwork({ monthLabel, year }) {
  return (
    <div className="hero">
      <div className="hero__sky" />
      <div className="hero__peak hero__peak--back" />
      <div className="hero__peak hero__peak--front" />
      <div className="hero__sun" />

      <div className="hero__badge">
        <span>{year}</span>
        <strong>{monthLabel}</strong>
      </div>
    </div>
  );
}
