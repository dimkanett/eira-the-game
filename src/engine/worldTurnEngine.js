import { worldNodeById } from "../data/worldNodes.js";
import { cloneState } from "./gameState.js";
import { advanceTravelDay } from "./travelEngine.js";

export function advanceNpcPlayers(gameState) {
  const state = cloneState(gameState);
  state.npcPlayers = state.npcPlayers.map((npc) => {
    if (!npc.alive) return npc;
    if (Math.random() < 0.03) return { ...npc, alive: false };
    const node = worldNodeById[npc.location];
    const next = node?.connections?.[Math.floor(Math.random() * node.connections.length)];
    return next ? { ...npc, location: next } : npc;
  });
  return state;
}

export function nextDay(gameState) {
  if (gameState.travel?.active && !gameState.travel.eventResolved) {
    const state = cloneState(gameState);
    state.activeMessage = "Сначала нужно решить дорожное событие, прежде чем продолжить путь.";
    return state;
  }

  let state = advanceNpcPlayers(gameState);
  state.hero.day += 1;
  state.hero.actionsLeft = state.hero.actionsMax;

  if (state.travel?.active) return advanceTravelDay(state);

  state.activeMessage = `День ${state.hero.day}. NPC сделали скрытые ходы. Их маршруты неизвестны.`;
  state.journal.push(state.activeMessage);
  return state;
}
