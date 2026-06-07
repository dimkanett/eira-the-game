import { loreFragments } from "../data/loreFragments.js";
import { loreCollections } from "../data/loreCollections.js";
import { cloneState } from "./gameState.js";

function updateCollections(state) {
  const discovered = new Set(state.lore.discoveredFragments);
  state.lore.discoveredCollections = Object.values(loreCollections)
    .filter((collection) => collection.fragmentIds.some((id) => discovered.has(id)))
    .map((collection) => collection.id);
}

export function discoverLoreFragment(gameState, fragmentId) {
  const state = cloneState(gameState);
  if (!loreFragments[fragmentId]) return state;
  if (!state.lore.discoveredFragments.includes(fragmentId)) {
    state.lore.discoveredFragments.push(fragmentId);
    state.lore.unreadFragments.push(fragmentId);
    state.journal.push(`Найден фрагмент лора: ${loreFragments[fragmentId].title}.`);
  }
  updateCollections(state);
  return state;
}

export function discoverRandomLoreFragment(gameState, filters = {}) {
  const known = new Set(gameState.lore.discoveredFragments);
  const candidate = Object.values(loreFragments).find((fragment) => {
    if (known.has(fragment.id)) return false;
    return Object.entries(filters).every(([key, value]) => fragment[key] === value);
  });
  return candidate ? discoverLoreFragment(gameState, candidate.id) : gameState;
}

export function getDiscoveredLoreFragments(gameState) {
  return gameState.lore.discoveredFragments.map((id) => loreFragments[id]).filter(Boolean);
}

export function getLoreCollectionProgress(gameState, collectionId) {
  const collection = loreCollections[collectionId];
  if (!collection) return { discovered: 0, total: 0, percent: 0 };
  const known = new Set(gameState.lore.discoveredFragments);
  const discovered = collection.fragmentIds.filter((id) => known.has(id)).length;
  return { discovered, total: collection.fragmentIds.length, percent: Math.round((discovered / collection.fragmentIds.length) * 100) };
}

export function markLoreFragmentAsRead(gameState, fragmentId) {
  const state = cloneState(gameState);
  state.lore.unreadFragments = state.lore.unreadFragments.filter((id) => id !== fragmentId);
  return state;
}
