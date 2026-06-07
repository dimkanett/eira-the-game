import { getCurrentTurnParticipant } from "../engine/combatEngine.js";

export default function CombatPanel({ gameState, onFinish }) {
  const combat = gameState.activeCombat;
  if (!combat) return <section className="placeholder-panel"><h2>Боёвка</h2><p>Режим combat подготовлен, активного боя нет.</p></section>;
  const current = getCurrentTurnParticipant(combat);
  return (
    <section className="placeholder-panel combat-panel">
      <h2>Бой — раунд {combat.round}</h2>
      <p>Ходит: {current?.name}</p>
      <ul>{combat.participants.map((participant) => <li key={participant.id}>{participant.name}: {participant.hp}/{participant.maxHp}</li>)}</ul>
      <pre>{combat.log.join("\n")}</pre>
      <button onClick={() => onFinish("отложен прототипом")}>Завершить тестовый бой</button>
    </section>
  );
}
