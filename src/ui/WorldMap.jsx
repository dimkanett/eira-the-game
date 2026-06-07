import { worldMap, worldNodes, worldNodeById } from "../data/worldNodes.js";
import { isNodeDirectlyReachable, isNodeVisible } from "../engine/movementEngine.js";

export default function WorldMap({ gameState, onNodeClick }) {
  const current = worldNodeById[gameState.hero.location];
  const visibleNodes = worldNodes.filter((node) => isNodeVisible(gameState, node.id));
  const visibleIds = new Set(visibleNodes.map((node) => node.id));

  return (
    <section className="map-card">
      <div className="map-title">Глобальная карта</div>
      <div className="map-stage" style={{ aspectRatio: `${worldMap.width} / ${worldMap.height}` }}>
        <img src={worldMap.background} alt="Карта мира" className="map-image" onError={(event) => event.currentTarget.classList.add("is-missing")} />
        <div className="map-fallback">Файл карты мира не найден. Положите изображение в public/assets/maps/world_map.png.</div>
        <svg viewBox={`0 0 ${worldMap.width} ${worldMap.height}`} className="map-overlay" aria-hidden="true">
          {(current?.connections || []).map((targetId) => {
            const target = worldNodeById[targetId];
            if (!target || !visibleIds.has(targetId)) return null;
            return <line key={targetId} x1={current.x} y1={current.y} x2={target.x} y2={target.y} className="path-line" />;
          })}
        </svg>
        {visibleNodes.map((node) => {
          const isCurrent = node.id === gameState.hero.location;
          const reachable = isNodeDirectlyReachable(gameState, node.id);
          const rumored = gameState.world.revealedByRumor.includes(node.id) && !gameState.world.knownNodes.includes(node.id);
          return (
            <button
              key={node.id}
              className={`map-node ${isCurrent ? "current" : ""} ${reachable ? "reachable" : ""} ${rumored ? "rumored" : ""}`}
              style={{ left: `${(node.x / worldMap.width) * 100}%`, top: `${(node.y / worldMap.height) * 100}%` }}
              onClick={() => onNodeClick(node.id)}
              title={`${node.name}${rumored ? " — слух" : ""}`}
            >
              <span className="node-dot" />
              <span className="node-label">{node.name}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
