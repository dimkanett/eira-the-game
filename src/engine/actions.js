import { playableCharacterById } from "../data/characters.js";
import { worldNodeById } from "../data/worldNodes.js";
import { moveHeroToNode } from "./movementEngine.js";
import { resolveEventChoice, startEvent } from "./eventEngine.js";
import { resolveSeaTravelChoice } from "./seaTravelEngine.js";
import { enterCity, handleCityNode } from "./cityEngine.js";
import { nextDay } from "./worldTurnEngine.js";
import { markLoreFragmentAsRead } from "./loreEngine.js";
import { finishCombat, performAttack, endTurn } from "./combatEngine.js";
import { createInitialStateForCharacter } from "./gameState.js";

export const actions = {
  selectCharacter(gameState, characterId) {
    const character = playableCharacterById[characterId];
    if (!character) return { ...gameState, activeMessage: "Персонаж не найден." };

    let state = createInitialStateForCharacter(character);
    const node = worldNodeById[character.startLocationId];

    for (const nextId of node?.connections || []) {
      if (!state.world.knownNodes.includes(nextId)) state.world.knownNodes.push(nextId);
    }

    if (character.id === "emma") {
      state = {
        ...state,
        mode: "story",
        activeEvent: null,
        activeMessage: null,
      };
      return startEvent(state, "emma_mill_morning");
    }

    if (node?.introEventId) {
      state = startEvent(state, node.introEventId);
    }

    return state;
  },
  enterLocalLocation(gameState) {
    return { ...gameState, mode: "location", activeMessage: null };
  },
  leaveLocalLocation(gameState) {
    return { ...gameState, mode: "world", activeEvent: null, activeMessage: "Ты возвращаешься к карте мира." };
  },
  clickLocalNode(gameState, localNode) {
    if (!localNode?.eventId) return { ...gameState, activeMessage: "Здесь пока ничего не происходит." };
    const state = startEvent(gameState, localNode.eventId);
    if (!state.activeEvent) return { ...state, activeMessage: "Это событие ещё не добавлено." };
    return state;
  },
  clickWorldNode: moveHeroToNode,
  resolveChoice(gameState, choiceId) {
    if (gameState.activeEvent?.id === "captain_in_bay") return resolveSeaTravelChoice(gameState, choiceId);
    return resolveEventChoice(gameState, choiceId);
  },
  enterCurrentCity(gameState) {
    if (gameState.travel?.active) return { ...gameState, activeMessage: "Ты уже в пути. Сначала заверши текущее путешествие." };
    const node = worldNodeById[gameState.hero.location];
    if (node?.biome !== "city") return { ...gameState, activeMessage: "Здесь нет городских ворот." };
    return enterCity(gameState, node.id);
  },
  clickCityNode: handleCityNode,
  nextDay,
  markLoreRead: markLoreFragmentAsRead,
  combatAttack: performAttack,
  combatEndTurn: endTurn,
  combatFinish: finishCombat,
};
