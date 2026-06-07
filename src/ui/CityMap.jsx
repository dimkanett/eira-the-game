import { cityNodes } from "../data/cityNodes.js";

export default function CityMap({ gameState, onNodeClick }) {
  const city = cityNodes[gameState.currentCity];
  if (!city) return <div className="placeholder-panel">Городская карта пока не создана.</div>;

  return (
    <section className="map-card">
      <div className="map-title">{city.name}</div>
      <div className="map-stage" style={{ aspectRatio: `${city.width} / ${city.height}` }}>
        <img src={city.background} alt={city.name} className="map-image" onError={(event) => { event.currentTarget.src = city.fallbackBackground; event.currentTarget.onerror = () => event.currentTarget.classList.add("is-missing"); }} />
        <div className="map-fallback">Файл города не найден. Положите изображение в public/assets/cities/Silverglade.png или public/assets/locations/Silverglade.png.</div>
        {city.nodes.map((node) => (
          <button
            key={node.id}
            className={`city-node ${gameState.hero.cityLocation === node.id ? "current" : ""}`}
            style={{ left: `${(node.x / city.width) * 100}%`, top: `${(node.y / city.height) * 100}%` }}
            onClick={() => onNodeClick(node.id)}
            title={node.description}
          >
            <span className="node-dot" />
            <span className="node-label">{node.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
