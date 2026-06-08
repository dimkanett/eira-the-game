import { travelEvents } from "../data/travelEvents.js";
import { worldNodeById } from "../data/worldNodes.js";
import { cloneState } from "./gameState.js";
import { startRandomEventForBiome } from "./eventEngine.js";

const BASE_TRAVEL_EVENT_CHANCE = 0.2;
const MIN_TRAVEL_EVENT_CHANCE = 0.05;
const MAX_TRAVEL_EVENT_CHANCE = 0.55;
const DANGEROUS_TRAVEL_BIOMES = new Set(["forest", "swamp", "desert", "mountain", "rift"]);

export function getTravelEventChance(gameState, fromNode, toNode) {
  let chance = BASE_TRAVEL_EVENT_CHANCE;
  chance += (toNode?.danger || 0) * 0.03;
  chance += (fromNode?.danger || 0) * 0.02;
  if (DANGEROUS_TRAVEL_BIOMES.has(toNode?.biome)) chance += 0.05;
  if (gameState.hero.fatigue >= 3) chance += 0.05;
  if (gameState.hero.trace >= 3) chance += 0.05;
  if (toNode?.biome === "road") chance -= 0.05;
  return Math.max(MIN_TRAVEL_EVENT_CHANCE, Math.min(MAX_TRAVEL_EVENT_CHANCE, chance));
}

export function shouldStartTravelEvent(gameState, fromNode, toNode, options = {}) {
  if (options.disableTravelEvents) return false;
  if (!getTravelEventsForBiome(toNode?.biome).length) return false;
  if (options.forceTravelEvent) return true;
  return Math.random() < getTravelEventChance(gameState, fromNode, toNode);
}

export function getTravelEventsForBiome(biome) {
  return travelEvents.filter((event) => !event.biomes?.length || event.biomes.includes(biome));
}

export function getRandomTravelEventForBiome(biome) {
  const candidates = getTravelEventsForBiome(biome);
  if (!candidates.length) return null;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

export function startTravelEvent(gameState, fromNodeId, toNodeId) {
  const state = cloneState(gameState);
  const fromNode = worldNodeById[fromNodeId];
  const toNode = worldNodeById[toNodeId];
  const event = getRandomTravelEventForBiome(toNode?.biome);

  state.travel = {
    active: true,
    fromNodeId,
    toNodeId,
    daysRemaining: 1,
    eventResolved: !event,
  };
  state.hero.actionsLeft = Math.max(0, state.hero.actionsLeft - 1);
  state.activeEvent = event;
  state.activeMessage = event ? null : `Ты в пути: ${fromNode?.name || fromNodeId} → ${toNode?.name || toNodeId}. Путь займёт ещё 1 день.`;
  state.journal.push(`День ${state.hero.day}. Герой отправился из ${fromNode?.name || fromNodeId} в ${toNode?.name || toNodeId}.`);
  if (event) state.journal.push(`По дороге случилось: ${event.title}.`);
  return state;
}

export function revealArrivalNodeAndNeighbors(state, nodeId) {
  if (!state.world.visitedNodes.includes(nodeId)) state.world.visitedNodes.push(nodeId);
  for (const nextId of worldNodeById[nodeId]?.connections || []) {
    if (!state.world.knownNodes.includes(nextId)) state.world.knownNodes.push(nextId);
  }
}

export function completeTravel(gameState) {
  const state = cloneState(gameState);
  if (!state.travel?.active) return state;
  const toNodeId = state.travel.toNodeId;
  const toNode = worldNodeById[toNodeId];
  state.hero.location = toNodeId;
  state.hero.cityLocation = null;
  state.currentCity = null;
  state.mode = "world";
  revealArrivalNodeAndNeighbors(state, toNodeId);
  state.journal.push(`День ${state.hero.day}. Герой прибыл в ${toNode?.name || toNodeId}.`);
  state.travel = { active: false, fromNodeId: null, toNodeId: null, daysRemaining: 0, eventResolved: false };
  const withEvent = startRandomEventForBiome(state, toNode?.biome);
  const npcHere = withEvent.npcPlayers.some((npc) => npc.alive && npc.location === toNodeId);
  if (npcHere) withEvent.activeMessage = "В этой точке находится NPC. Позже здесь будет диалог, союз, конфликт или проход мимо.";
  return withEvent;
}

export function cancelTravel(gameState) {
  const state = cloneState(gameState);
  if (!state.travel?.active) return state;
  const fromNode = worldNodeById[state.travel.fromNodeId];
  state.hero.location = state.travel.fromNodeId;
  state.travel = { active: false, fromNodeId: null, toNodeId: null, daysRemaining: 0, eventResolved: false };
  state.activeEvent = null;
  state.activeMessage = `Путешествие отменено. Ты возвращаешься в ${fromNode?.name || "исходную точку"}.`;
  state.journal.push(state.activeMessage);
  return state;
}

export function advanceTravelDay(gameState) {
  const state = cloneState(gameState);
  if (!state.travel?.active) return state;

  const fromNode = worldNodeById[state.travel.fromNodeId];
  const toNode = worldNodeById[state.travel.toNodeId];

  if (!state.travel.eventResolved) {
    state.activeMessage = "Сначала нужно решить дорожное событие, прежде чем продолжить путь.";
    return state;
  }

  state.travel.daysRemaining -= 1;
  if (state.travel.daysRemaining > 0) {
    state.activeMessage = `Ты в пути: ${fromNode?.name || state.travel.fromNodeId} → ${toNode?.name || state.travel.toNodeId}. Путь займёт ещё ${state.travel.daysRemaining} дн.`;
    state.journal.push(`День ${state.hero.day}. Путь продолжается: ${state.travel.daysRemaining} дн. до прибытия.`);
    return state;
  }

  return completeTravel(state);
}

export function getTravelStatusMessage(gameState) {
  if (!gameState.travel?.active) return null;
  const fromNode = worldNodeById[gameState.travel.fromNodeId];
  const toNode = worldNodeById[gameState.travel.toNodeId];
  return `Ты в пути: ${fromNode?.name || gameState.travel.fromNodeId} → ${toNode?.name || gameState.travel.toNodeId}. Путь займёт ещё ${gameState.travel.daysRemaining} дн.`;
}
