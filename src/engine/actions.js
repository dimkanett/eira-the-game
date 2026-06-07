import { worldNodeById } from "../data/worldNodes.js";
import { moveHeroToNode } from "./movementEngine.js";
import { resolveEventChoice } from "./eventEngine.js";
import { resolveSeaTravelChoice } from "./seaTravelEngine.js";
import { enterCity, handleCityNode } from "./cityEngine.js";
import { nextDay } from "./worldTurnEngine.js";
import { markLoreFragmentAsRead } from "./loreEngine.js";
import { finishCombat, performAttack, endTurn } from "./combatEngine.js";

export const actions = {
  clickWorldNode: moveHeroToNode,
  resolveChoice(gameState, choiceId) {
    if (gameState.activeEvent?.id === "captain_in_bay") return resolveSeaTravelChoice(gameState, choiceId);
    return resolveEventChoice(gameState, choiceId);
  },
  enterCurrentCity(gameState) {
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
