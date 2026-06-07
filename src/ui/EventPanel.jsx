import { worldNodeById } from "../data/worldNodes.js";

export default function EventPanel({ gameState, collapsed, onToggle, onChoice, onEnterCity, onNextDay }) {
  const node = worldNodeById[gameState.hero.location];
  const canEnterCity = gameState.mode === "world" && node?.biome === "city";
  const nextDayDisabled = gameState.mode === "city";

  return (
    <aside className={`event-panel ${collapsed ? "collapsed" : ""}`}>
      <button className="panel-toggle" onClick={onToggle}>{collapsed ? "Развернуть события" : "Свернуть события"}</button>
      {!collapsed && (
        <div className="panel-body">
          <h2>{gameState.activeEvent?.title || node?.name || "События"}</h2>
          {gameState.activeEvent ? <p>{gameState.activeEvent.text}</p> : <p>{gameState.activeMessage || "Выбери точку на карте."}</p>}
          {gameState.activeEvent?.choices?.map((choice) => <button key={choice.id} onClick={() => onChoice(choice.id)}>{choice.label}</button>)}
          {canEnterCity && <button onClick={onEnterCity}>Войти в город</button>}
          {nextDayDisabled ? (
            <p className="panel-hint">В городе день не листается. Покиньте город, чтобы продолжить путь.</p>
          ) : (
            <button onClick={onNextDay}>Следующий день</button>
          )}
        </div>
      )}
    </aside>
  );
}
