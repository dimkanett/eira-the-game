import { events } from "../data/events.js";
import { travelEvents } from "../data/travelEvents.js";
import { worldNodes, worldNodeById } from "../data/worldNodes.js";
import { cloneState } from "./gameState.js";
import { startCombat } from "./combatEngine.js";
import { discoverLoreFragment, discoverRandomLoreFragment } from "./loreEngine.js";

export function rollCheck(character, check) {
  if (!check) return { roll: 0, total: 0, success: true };
  const roll = Math.floor(Math.random() * 20) + 1;
  const total = roll + (character.stats?.[check.stat] || 0);
  return { roll, total, success: total >= check.dc };
}

function clampValue(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function allEvents() {
  return [...Object.values(events).flat(), ...travelEvents];
}

function findEvent(eventId) {
  return allEvents().find((item) => item.id === eventId);
}

export function isChoiceAvailable(gameState, choice) {
  const condition = choice?.condition;
  if (!condition) return true;
  if (condition.item && !gameState.hero.inventory.includes(condition.item)) return false;
  if (condition.flag && !gameState.flags?.[condition.flag]) return false;
  return true;
}

export function startEvent(gameState, eventId) {
  const state = cloneState(gameState);
  const event = findEvent(eventId);
  state.activeEvent = event || null;
  if (event) state.activeMessage = null;
  return state;
}

export function startRandomEventForBiome(gameState, biome) {
  const biomeEvents = events[biome] || [];
  if (!biomeEvents.length) {
    const state = cloneState(gameState);
    state.activeEvent = null;
    state.activeMessage = "Здесь пока тихо. Позже появятся новые события биома.";
    return state;
  }
  const event = biomeEvents[Math.floor(Math.random() * biomeEvents.length)];
  return startEvent(gameState, event.id);
}

export function resolveEventChoice(gameState, choiceId) {
  const event = gameState.activeEvent;
  const choice = event?.choices?.find((item) => item.id === choiceId);
  if (!event || !choice) return gameState;
  if (!isChoiceAvailable(gameState, choice)) return { ...gameState, activeMessage: "Этот вариант пока недоступен." };
  const checkResult = rollCheck(gameState.hero, choice.check);
  const branch = checkResult.success ? choice.success : choice.fail || choice.success;
  const effects = branch.effects || [];
  const nextEventId = branch.nextEventId || effects.find((effect) => effect.type === "start_event")?.eventId;
  let state = applyEffects(gameState, effects);
  if (event.type === "travel" && state.travel?.active) state.travel.eventResolved = true;
  state.activeEvent = null;
  state.activeMessage = `${branch.text}${choice.check ? ` (d20: ${checkResult.roll}, итог: ${checkResult.total}, DC ${choice.check.dc})` : ""}`;
  state.journal.push(`${event.title}: ${state.activeMessage}`);
  if (nextEventId) return startEvent(state, nextEventId);
  return state;
}

export function applyEffects(gameState, effects = []) {
  let state = cloneState(gameState);
  state.flags ||= {};
  for (const effect of effects) {
    if (effect.type === "hp" && effect.target === "hero") state.hero.hp = Math.min(state.hero.maxHp, Math.max(0, state.hero.hp + effect.value));
    if (effect.type === "fatigue") state.hero.fatigue = Math.max(0, state.hero.fatigue + effect.value);
    if (effect.type === "trace") state.hero.trace = Math.max(0, state.hero.trace + effect.value);
    if (effect.type === "world_decay") state.worldDecay = clampValue((state.worldDecay || 0) + effect.value, 0, 100);
    if (effect.type === "sin") state.sin = clampValue((state.sin || 0) + effect.value, 0, 100);
    if (effect.type === "personal_decay") state.personalDecay = clampValue((state.personalDecay || 0) + effect.value, 0, 100);
    if (effect.type === "add_item" && !state.hero.inventory.includes(effect.itemId)) state.hero.inventory.push(effect.itemId);
    if (effect.type === "set_flag") state.flags[effect.flag] = effect.value ?? true;
    if (effect.type === "journal_entry") state.journal.push(effect.text);
    if (effect.type === "reveal_clue") state.flags[effect.clueId] = true;
    if (effect.type === "reveal_npc_clue") state.flags[effect.npcId] = true;
    if (effect.type === "start_event") {
      const nextEvent = findEvent(effect.eventId);
      if (nextEvent) {
        state.activeEvent = nextEvent;
        state.activeMessage = null;
      }
    }
    if (effect.type === "reputation") {
      const region = effect.target === "current_region" ? worldNodeById[state.hero.location]?.region || "unknown" : effect.target;
      state.reputation[region] = (state.reputation[region] || 0) + effect.value;
    }
    if (effect.type === "reveal_random_city") {
      const known = new Set([...state.world.knownNodes, ...state.world.revealedByRumor]);
      const city = worldNodes.find((node) => node.biome === "city" && !known.has(node.id));
      if (city) state.world.revealedByRumor.push(city.id);
    }
    if (effect.type === "reveal_node" && !state.world.revealedByRumor.includes(effect.nodeId) && !state.world.knownNodes.includes(effect.nodeId)) state.world.revealedByRumor.push(effect.nodeId);
    if (effect.type === "add_lore") state = discoverLoreFragment(state, effect.fragmentId);
    if (effect.type === "add_random_lore") state = discoverRandomLoreFragment(state, effect.filters || {});
    if (effect.type === "start_combat") state = startCombat(state, effect.enemyGroupId);
    if (effect.type === "travel_delay" && state.travel?.active) {
      state.travel.daysRemaining += effect.days || 0;
      state.journal.push(`Путешествие задержалось на ${effect.days || 0} дн.`);
    }
    if (effect.type === "complete_travel" && state.travel?.active) {
      const destinationId = state.travel.toNodeId;
      state.hero.location = destinationId;
      state.hero.cityLocation = null;
      state.currentCity = null;
      if (!state.world.visitedNodes.includes(destinationId)) state.world.visitedNodes.push(destinationId);
      for (const nextId of worldNodeById[destinationId]?.connections || []) {
        if (!state.world.knownNodes.includes(nextId)) state.world.knownNodes.push(nextId);
      }
      state.travel = { active: false, fromNodeId: null, toNodeId: null, daysRemaining: 0, eventResolved: false };
    }
    if (effect.type === "cancel_travel" && state.travel?.active) {
      state.hero.location = state.travel.fromNodeId;
      state.travel = { active: false, fromNodeId: null, toNodeId: null, daysRemaining: 0, eventResolved: false };
    }
  }
  return state;
}
