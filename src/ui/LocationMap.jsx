import { useState } from "react";
import { localLocations } from "../data/localLocations.js";

export default function LocationMap({ gameState, onNodeClick, onLeave }) {
  const [missingImage, setMissingImage] = useState(false);
  const location = localLocations[gameState.hero.location];

  if (!location) {
    return (
      <section className="local-map-card">
        <h2>Локальная карта недоступна</h2>
        <p>Для этой точки пока нет внутренней карты.</p>
        <button type="button" onClick={onLeave}>Вернуться к глобальной карте</button>
      </section>
    );
  }

  return (
    <section className="local-map-card">
      <header className="local-map-header">
        <h2>{location.name}</h2>
        <button type="button" onClick={onLeave}>Глобальная карта</button>
      </header>

      <div className="local-map-viewport">
        <div className="local-map-canvas" style={{ width: `${location.width}px`, height: `${location.height}px` }}>
          {!missingImage && (
            <img
              src={location.mapImage}
              alt={location.name}
              className="local-map-image"
              onError={() => setMissingImage(true)}
            />
          )}
          <div className="local-map-fallback">Локальная карта деревни пока не загружена.</div>

          {location.nodes.map((node) => (
            <button
              key={node.id}
              className="local-map-node"
              style={{ left: `${node.x}px`, top: `${node.y}px` }}
              onClick={() => onNodeClick(node)}
              title={node.name}
              type="button"
            >
              <span className="local-node-dot" />
              <span className="local-node-label">{node.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
