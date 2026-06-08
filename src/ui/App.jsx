import { useMemo, useState } from "react";
import { initialGameState } from "../engine/gameState.js";
import { actions } from "../engine/actions.js";
import { playableCharacters } from "../data/characters.js";
import WorldMap from "./WorldMap.jsx";
import CityMap from "./CityMap.jsx";
import LocationMap from "./LocationMap.jsx";
import Hud from "./Hud.jsx";
import EventPanel from "./EventPanel.jsx";
import Modal from "./Modal.jsx";
import Journal from "./Journal.jsx";
import Inventory from "./Inventory.jsx";
import Reputation from "./Reputation.jsx";
import LoreBook from "./LoreBook.jsx";
import CombatPanel from "./CombatPanel.jsx";
import CharacterPortrait from "./CharacterPortrait.jsx";
import CharacterModal from "./CharacterModal.jsx";
import CharacterSelect from "./CharacterSelect.jsx";
import NodeEditor from "../tools/NodeEditor.jsx";
import { worldNodes } from "../data/worldNodes.js";

if (import.meta.env.DEV) console.log("worldNodes loaded:", worldNodes.length);

export default function App() {
  const isNodeEditor = new URLSearchParams(window.location.search).get("tool") === "node-editor";

  return isNodeEditor ? <NodeEditor /> : <GameApp />;
}

function GameApp() {
  const [gameState, setGameState] = useState(initialGameState);
  const [panelCollapsed, setPanelCollapsed] = useState(false);
  const [modal, setModal] = useState(null);
  const unreadLoreCount = useMemo(() => gameState.lore.unreadFragments.length, [gameState.lore.unreadFragments.length]);
  const runAction = (action, ...args) => setGameState((state) => action(state, ...args));

  if (gameState.mode === "character_select") {
    return <CharacterSelect characters={playableCharacters} onSelect={(id) => runAction(actions.selectCharacter, id)} />;
  }

  return (
    <div className="app-shell">
      <Hud gameState={gameState} />
      <main className="main-layout">
        <section className="left-rail">
          <CharacterPortrait character={gameState.hero} size="small" onClick={() => setModal("character")} />
          <button onClick={() => setModal("journal")}>Журнал</button>
          <button onClick={() => setModal("inventory")}>Инвентарь</button>
          <button onClick={() => setModal("reputation")}>Репутация</button>
          <button onClick={() => setModal("lore")}>Книга лора {unreadLoreCount > 0 ? `(${unreadLoreCount})` : ""}</button>
        </section>

        <section className="play-area">
          {gameState.mode === "world" && <WorldMap gameState={gameState} onNodeClick={(nodeId) => runAction(actions.clickWorldNode, nodeId)} />}
          {gameState.mode === "city" && <CityMap gameState={gameState} onNodeClick={(nodeId) => runAction(actions.clickCityNode, nodeId)} />}
          {gameState.mode === "location" && <LocationMap gameState={gameState} />}
          {gameState.mode === "combat" && <CombatPanel gameState={gameState} onFinish={(result) => runAction(actions.combatFinish, result)} />}
        </section>
      </main>

      <EventPanel
        gameState={gameState}
        collapsed={panelCollapsed}
        onToggle={() => setPanelCollapsed((value) => !value)}
        onChoice={(choiceId) => runAction(actions.resolveChoice, choiceId)}
        onEnterCity={() => runAction(actions.enterCurrentCity)}
        onNextDay={() => runAction(actions.nextDay)}
      />

      {modal === "character" && <Modal title={gameState.hero.name} onClose={() => setModal(null)}><CharacterModal character={gameState.hero} /></Modal>}
      {modal === "journal" && <Modal title="Журнал" onClose={() => setModal(null)}><Journal entries={gameState.journal} /></Modal>}
      {modal === "inventory" && <Modal title="Инвентарь" onClose={() => setModal(null)}><Inventory gameState={gameState} /></Modal>}
      {modal === "reputation" && <Modal title="Репутация" onClose={() => setModal(null)}><Reputation reputation={gameState.reputation} /></Modal>}
      {modal === "lore" && <Modal title="Книга лора" onClose={() => setModal(null)}><LoreBook gameState={gameState} onRead={(fragmentId) => runAction(actions.markLoreRead, fragmentId)} /></Modal>}
    </div>
  );
}
