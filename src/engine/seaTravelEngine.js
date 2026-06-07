import { worldNodeById } from "../data/worldNodes.js";
import { cloneState } from "./gameState.js";
import { rollCheck } from "./eventEngine.js";

export function startSeaCaptainEvent(gameState, targetNodeId) {
  const state = cloneState(gameState);
  const target = worldNodeById[targetNodeId];
  state.activeEvent = {
    id: "captain_in_bay",
    title: "Капитан в бухте",
    text: `Капитан смотрит на волны у точки «${target?.name || targetNodeId}» и требует убедить его рискнуть переходом.`,
    choices: [
      { id: `sea_charisma_${targetNodeId}`, label: "Убедить капитана", check: { stat: "charisma", dc: 11 }, success: { text: "Капитан кивает. Корабль выходит в море.", effects: [{ type: "sea_travel_success", nodeId: targetNodeId }] }, fail: { text: "Капитан отказывает. Герой остаётся на берегу.", effects: [] } },
      { id: `sea_will_${targetNodeId}`, label: "Показать решимость", check: { stat: "will", dc: 12 }, success: { text: "Твоя решимость убеждает команду.", effects: [{ type: "sea_travel_success", nodeId: targetNodeId }] }, fail: { text: "Команда не хочет идти за тобой в опасные воды.", effects: [] } },
    ],
  };
  state.activeMessage = null;
  return state;
}

export function resolveSeaTravelChoice(gameState, choiceId) {
  const choice = gameState.activeEvent?.choices?.find((item) => item.id === choiceId);
  if (!choice) return gameState;
  const check = rollCheck(gameState.hero, choice.check);
  const state = cloneState(gameState);
  state.activeEvent = null;
  if (!check.success) {
    state.activeMessage = `${choice.fail.text} (d20: ${check.roll}, итог: ${check.total}, DC ${choice.check.dc})`;
    state.journal.push(state.activeMessage);
    return state;
  }
  const nodeId = choice.success.effects[0].nodeId;
  state.hero.location = nodeId;
  state.hero.actionsLeft = Math.max(0, state.hero.actionsLeft - 1);
  if (!state.world.visitedNodes.includes(nodeId)) state.world.visitedNodes.push(nodeId);
  for (const nextId of worldNodeById[nodeId]?.connections || []) if (!state.world.knownNodes.includes(nextId)) state.world.knownNodes.push(nextId);
  state.activeMessage = `${choice.success.text} Ты прибываешь в «${worldNodeById[nodeId]?.name}». (d20: ${check.roll}, итог: ${check.total}, DC ${choice.check.dc})`;
  state.journal.push(state.activeMessage);
  return state;
}
