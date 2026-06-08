import { locationMaps } from "../data/locationMaps.js";

const ironBridgeActions = [
  { id: "bridge", label: "Старый мост", eventId: "emma_intro_bridge_whisper" },
  { id: "elder", label: "Дом старосты Бренна", eventId: "emma_elder_brenn_talk" },
  { id: "timo", label: "Найти Тимо", eventId: "emma_timo_testimony" },
  { id: "olma", label: "Кузница Ольмы", eventId: "emma_olma_black_iron" },
  { id: "under_bridge", label: "Спуск под мост", eventId: "emma_bridge_storehouse" },
];

export default function LocationMap({ gameState, onTriggerEvent, onLeave }) {
  const map = locationMaps[gameState.hero.location];

  if (gameState.hero.location === "iron_bridge_village") {
    return (
      <section className="placeholder-panel local-location-panel">
        <h2>Деревня Железного моста</h2>
        <p>Мельница скрипит, у кузницы звенит молот, а старый мост за рекой будто ждёт нового взгляда.</p>
        <div className="local-actions">
          {ironBridgeActions.map((action) => (
            <button key={action.id} type="button" onClick={() => onTriggerEvent(action.eventId)}>{action.label}</button>
          ))}
          <button type="button" onClick={onLeave}>Покинуть деревню</button>
        </div>
      </section>
    );
  }

  return (
    <section className="placeholder-panel">
      <h2>Режим интересного места</h2>
      <p>{map ? `Подготовлена внутренняя карта: ${map.name}.` : "Архитектура режима location создана; конкретная карта будет включена позже."}</p>
      <button type="button" onClick={onLeave}>Вернуться к карте мира</button>
    </section>
  );
}
