import { localLocations } from "../data/localLocations.js";
import { worldNodeById } from "../data/worldNodes.js";
import { getEventText, isChoiceAvailable } from "../engine/eventEngine.js";
import { getTravelStatusMessage } from "../engine/travelEngine.js";

export default function EventPanel({ gameState, collapsed, onToggle, onChoice, onEnterCity, onEnterLocalLocation, onNextDay }) {
  const node = worldNodeById[gameState.hero.location];
  const travelMessage = getTravelStatusMessage(gameState);
  const canEnterCity = !gameState.travel?.active && gameState.mode === "world" && node?.biome === "city";
  const canEnterLocalLocation = !gameState.activeEvent && !gameState.travel?.active && gameState.mode === "world" && gameState.hero.location === "iron_bridge_village";
  const hasLocalMap = Boolean(localLocations[gameState.hero.location]);
  const hideNextDay = gameState.mode === "location" && hasLocalMap;
  const nextDayDisabled = gameState.mode === "city";

  if (gameState.mode === "location" && hasLocalMap && !gameState.activeEvent && !gameState.travel?.active) return null;
  const title = gameState.activeEvent?.title || (gameState.travel?.active ? "Путешествие" : node?.name) || "События";
  const message = gameState.activeMessage || travelMessage || "Выбери точку на карте.";

  return (
    <aside className={`event-panel ${collapsed ? "collapsed" : ""}`}>
      <button className="panel-toggle" onClick={onToggle}>{collapsed ? "Развернуть события" : "Свернуть события"}</button>
      {!collapsed && (
        <div className="panel-body">
          <h2>{title}</h2>
          {gameState.activeEvent ? <p>{getEventText(gameState, gameState.activeEvent)}</p> : <><p>{message}</p>{travelMessage && gameState.activeMessage && <p className="panel-hint">{travelMessage}</p>}</>}
          {gameState.activeEvent?.choices
            ?.filter((choice) => isChoiceAvailable(gameState, choice))
            .map((choice) => <button key={choice.id} onClick={() => onChoice(choice.id)}>{choice.label}</button>)}
          {gameState.travel?.active && !gameState.activeEvent && <p className="panel-hint">Нажми “Следующий день”, чтобы продолжить путь.</p>}
          {canEnterCity && <button onClick={onEnterCity}>Войти в город</button>}
          {canEnterLocalLocation && <button onClick={onEnterLocalLocation}>Осмотреть деревню</button>}
          {!hideNextDay && (nextDayDisabled ? (
            <p className="panel-hint">В городе день не листается. Покиньте город, чтобы продолжить путь.</p>
          ) : (
            <button onClick={onNextDay}>Следующий день</button>
          ))}
        </div>
      )}
    </aside>
  );
}
