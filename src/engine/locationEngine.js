import { locationMaps } from "../data/locationMaps.js";
import { cloneState } from "./gameState.js";

export function enterLocationMap(gameState, locationId) {
  const map = locationMaps[locationId];
  const state = cloneState(gameState);
  if (!map) return { ...state, activeMessage: "Для этого интересного места внутренняя карта появится позже." };
  state.mode = "location";
  state.hero.locationMapNode = map.startNode;
  state.activeMessage = `Внутренняя карта: ${map.name}. Это задел под будущие руины, храмы и подземелья.`;
  return state;
}

export function leaveLocationMap(gameState) {
  const state = cloneState(gameState);
  state.mode = "world";
  state.hero.locationMapNode = null;
  state.activeMessage = "Ты возвращаешься на глобальную карту.";
  return state;
}
