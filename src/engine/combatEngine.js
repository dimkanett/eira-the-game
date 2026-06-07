import { healthyBody, cloneState } from "./gameState.js";

const enemyGroups = {
  wolves_01: [{ id: "wolf_1", side: "enemy", name: "Волк", hp: 12, maxHp: 12, body: healthyBody, stats: { strength: 2, agility: 3, defense: 1, perception: 3, charisma: 0, will: 2, intellect: 0 }, statusEffects: [] }],
};

export function startCombat(gameState, enemyGroupId) {
  const state = cloneState(gameState);
  state.mode = "combat";
  state.activeCombat = {
    id: `combat_${Date.now()}`,
    sourceMode: gameState.mode,
    sourceLocation: gameState.hero.location,
    round: 1,
    turnIndex: 0,
    log: [`Начинается бой: ${enemyGroupId}.`],
    participants: [
      { id: "hero", side: "player", name: state.hero.name, hp: state.hero.hp, maxHp: state.hero.maxHp, body: state.hero.body, equipment: state.hero.equipment, stats: state.hero.stats, statusEffects: [] },
      ...(enemyGroups[enemyGroupId] || enemyGroups.wolves_01),
    ],
  };
  return state;
}

export function getCurrentTurnParticipant(combatState) {
  return combatState?.participants?.[combatState.turnIndex] || null;
}

export function performAttack(gameState, attackerId, targetId, attackId = "basic") {
  const state = cloneState(gameState);
  const combat = state.activeCombat;
  if (!combat) return state;
  const target = combat.participants.find((participant) => participant.id === targetId);
  if (!target) return state;
  const damage = 3;
  target.hp = Math.max(0, target.hp - damage);
  combat.log.push(`${attackerId} использует ${attackId}: ${target.name} получает ${damage} урона.`);
  if (target.id === "hero") state.hero.hp = target.hp;
  return state;
}

export function endTurn(gameState) {
  const state = cloneState(gameState);
  const combat = state.activeCombat;
  if (!combat) return state;
  combat.turnIndex += 1;
  if (combat.turnIndex >= combat.participants.length) {
    combat.turnIndex = 0;
    combat.round += 1;
  }
  return state;
}

export function finishCombat(gameState, result = "escaped") {
  const state = cloneState(gameState);
  const sourceMode = state.activeCombat?.sourceMode || "world";
  state.mode = sourceMode;
  state.activeMessage = `Бой завершён: ${result}.`;
  state.activeCombat = null;
  return state;
}
