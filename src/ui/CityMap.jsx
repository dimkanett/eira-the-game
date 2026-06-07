import { cityNodes } from "../data/cityNodes.js";

export default function CityMap({ gameState, onNodeClick }) {
  const city = cityNodes[gameState.currentCity];
  if (!city) return <div className="placeholder-panel">Городская карта пока не создана.</div>;

  return (
    <section className="map-card">
      <div className="map-title">{city.name}</div>
      <div className="map-viewport" aria-label={`Прокручиваемая карта города ${city.name}`}>
        <div className="map-canvas city-canvas" style={{ width: `${city.width}px`, height: `${city.height}px` }}>
          <img
            src={city.background}
            alt={city.name}
            className="map-image city-image"
            onError={(event) => {
              if (event.currentTarget.dataset.fallbackTried === "true") {
                event.currentTarget.classList.add("is-missing");
                return;
              }
              event.currentTarget.dataset.fallbackTried = "true";
              event.currentTarget.src = city.fallbackBackground;
            }}
          />
          <div className="map-fallback">Файл города не найден. Положите изображение в public/assets/cities/Silverglade.png или public/assets/locations/Silverglade.png.</div>
          <div className="nodes-layer">
            {city.nodes.map((node) => (
              <button
                key={node.id}
                className={`city-node ${gameState.hero.cityLocation === node.id ? "current" : ""}`}
                style={{ left: `${node.x}px`, top: `${node.y}px` }}
                onClick={() => onNodeClick(node.id)}
                title={node.description}
              >
                <span className="node-dot" />
                <span className="node-label">{node.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
