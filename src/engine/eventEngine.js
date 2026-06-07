import { events } from "../data/events.js";
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

function allEvents() {
  return Object.values(events).flat();
}

export function startEvent(gameState, eventId) {
  const state = cloneState(gameState);
  const event = allEvents().find((item) => item.id === eventId);
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
  const checkResult = rollCheck(gameState.hero, choice.check);
  const branch = checkResult.success ? choice.success : choice.fail;
  let state = applyEffects(gameState, branch.effects || []);
  state.activeEvent = null;
  state.activeMessage = `${branch.text}${choice.check ? ` (d20: ${checkResult.roll}, итог: ${checkResult.total}, DC ${choice.check.dc})` : ""}`;
  state.journal.push(`${event.title}: ${state.activeMessage}`);
  return state;
}

export function applyEffects(gameState, effects = []) {
  let state = cloneState(gameState);
  for (const effect of effects) {
    if (effect.type === "hp" && effect.target === "hero") state.hero.hp = Math.min(state.hero.maxHp, Math.max(0, state.hero.hp + effect.value));
    if (effect.type === "fatigue") state.hero.fatigue = Math.max(0, state.hero.fatigue + effect.value);
    if (effect.type === "trace") state.hero.trace = Math.max(0, state.hero.trace + effect.value);
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
  }
  return state;
}
