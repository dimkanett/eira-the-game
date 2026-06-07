import { companions } from "../data/companions.js";
import { cloneState } from "./gameState.js";

export function addCompanion(gameState, companionId) {
  const state = cloneState(gameState);
  if (companions[companionId] && !state.party.companions.includes(companionId)) state.party.companions.push(companionId);
  return state;
}

export function removeCompanion(gameState, companionId) {
  const state = cloneState(gameState);
  state.party.companions = state.party.companions.filter((id) => id !== companionId);
  return state;
}

export function changeCompanionTrust(gameState, companionId, value) {
  const state = cloneState(gameState);
  state.party.trust = { ...(state.party.trust || {}), [companionId]: (state.party.trust?.[companionId] || companions[companionId]?.trust || 0) + value };
  return state;
}

export function getPartyBonuses(gameState) {
  return gameState.party.companions.flatMap((id) => companions[id]?.bonuses || []);
}
