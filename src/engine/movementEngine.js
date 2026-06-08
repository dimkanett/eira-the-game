import { worldNodeById } from "../data/worldNodes.js";
import { cloneState } from "./gameState.js";
import { startRandomEventForBiome } from "./eventEngine.js";
import { shouldAskCaptain, startSeaCaptainEvent } from "./seaTravelEngine.js";
import { revealArrivalNodeAndNeighbors, shouldStartTravelEvent, startTravelEvent } from "./travelEngine.js";

export function isNodeVisible(gameState, nodeId) {
  const current = worldNodeById[gameState.hero.location];
  return gameState.hero.location === nodeId || current?.connections.includes(nodeId) || gameState.world.visitedNodes.includes(nodeId) || gameState.world.knownNodes.includes(nodeId) || gameState.world.revealedByRumor.includes(nodeId);
}

export function isNodeDirectlyReachable(gameState, nodeId) {
  const current = worldNodeById[gameState.hero.location];
  return Boolean(current?.connections.includes(nodeId));
}

export function moveHeroToNode(gameState, nodeId, options = {}) {
  const target = worldNodeById[nodeId];
  const state = cloneState(gameState);
  if (!target) return { ...state, activeMessage: "Этой точки нет на карте." };
  if (state.travel?.active) return { ...state, activeMessage: "Ты уже в пути. Сначала заверши текущее путешествие." };
  if (state.hero.location === nodeId) return { ...state, activeMessage: `Ты уже находишься здесь: ${target.name}.` };
  if (state.world.revealedByRumor.includes(nodeId) && !isNodeDirectlyReachable(state, nodeId)) return { ...state, activeMessage: "Ты слышал об этом месте, но дороги туда пока не знаешь." };
  if (state.hero.actionsLeft <= 0 && !options.free) return { ...state, activeMessage: "На сегодня действий не осталось. Нужен следующий день." };
  if (!options.ignoreReachability && !isNodeDirectlyReachable(state, nodeId) && state.hero.location !== nodeId) return { ...state, activeMessage: "Отсюда нельзя пройти туда напрямую." };
  const fromNode = worldNodeById[state.hero.location];
  if (!options.skipSeaGate && shouldAskCaptain(fromNode, target)) return startSeaCaptainEvent(state, nodeId);

  if (!options.free && shouldStartTravelEvent(state, fromNode, target, options)) return startTravelEvent(state, state.hero.location, nodeId);

  state.hero.location = nodeId;
  state.hero.cityLocation = null;
  state.currentCity = null;
  state.mode = "world";
  if (!options.free) state.hero.actionsLeft = Math.max(0, state.hero.actionsLeft - 1);
  revealArrivalNodeAndNeighbors(state, nodeId);
  state.journal.push(`День ${state.hero.day}. Переход: ${target.name}.`);
  const npcHere = state.npcPlayers.some((npc) => npc.alive && npc.location === nodeId);
  const withEvent = startRandomEventForBiome(state, target.biome);
  if (npcHere) withEvent.activeMessage = "В этой точке находится NPC. Позже здесь будет диалог, союз, конфликт или проход мимо.";
  return withEvent;
}
