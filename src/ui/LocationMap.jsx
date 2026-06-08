import { locationMaps } from "../data/locationMaps.js";

export default function LocationMap({ gameState }) {
  const map = locationMaps[gameState.hero.location];
  return (
    <section className="placeholder-panel">
      <h2>Режим интересного места</h2>
      <p>{map ? `Подготовлена внутренняя карта: ${map.name}.` : "Архитектура режима location создана; конкретная карта будет включена позже."}</p>
    </section>
  );
}
