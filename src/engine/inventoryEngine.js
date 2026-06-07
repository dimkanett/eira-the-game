import { items } from "../data/items.js";
import { weapons } from "../data/weapons.js";
import { cloneState } from "./gameState.js";

export function getInventoryEntries(gameState) {
  return gameState.hero.inventory.map((id) => weapons[id] || items[id] || { id, name: id, type: "unknown" });
}

export function addItem(gameState, itemId) {
  const state = cloneState(gameState);
  state.hero.inventory.push(itemId);
  return state;
}

export function removeItem(gameState, itemId) {
  const state = cloneState(gameState);
  const index = state.hero.inventory.indexOf(itemId);
  if (index >= 0) state.hero.inventory.splice(index, 1);
  return state;
}
