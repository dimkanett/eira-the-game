import { cloneState } from "./gameState.js";

export function clamp(value, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

export function getWorldDecayStage(worldDecay = 0) {
  if (worldDecay <= 20) return "cracks";
  if (worldDecay <= 40) return "rot";
  if (worldDecay <= 60) return "collapse";
  if (worldDecay <= 80) return "fall";
  return "abyss";
}

export const worldDecayStageLabels = {
  cracks: "Трещины",
  rot: "Гниение",
  collapse: "Крушение",
  fall: "Падение",
  abyss: "Бездна",
};

export function getWorldDecayStageLabel(worldDecayOrStage = 0) {
  const stage = typeof worldDecayOrStage === "string" ? worldDecayOrStage : getWorldDecayStage(worldDecayOrStage);
  return worldDecayStageLabels[stage] || stage;
}

export function calculateDailyWorldDecayChange(gameState) {
  let change = 1;
  if ((gameState.sin || 0) >= 5) change += 1;
  if ((gameState.personalDecay || 0) >= 50) change += 1;
  return change;
}

export function processWorldDecayTurn(gameState) {
  const state = cloneState(gameState);
  const previousDecay = state.worldDecay || 0;
  const change = calculateDailyWorldDecayChange(state);
  state.worldDecay = clamp(previousDecay + change);
  const stage = getWorldDecayStage(state.worldDecay);
  const stageLabel = getWorldDecayStageLabel(stage);
  const message = `Разложение мира: ${state.worldDecay}/100 (${stageLabel}, ${change >= 0 ? "+" : ""}${change}).`;
  state.journal.push(message);
  return { state, change, stage, stageLabel, message };
}

export function adjustDecayValues(gameState, changes = {}, options = {}) {
  const state = cloneState(gameState);
  if (typeof changes.worldDecay === "number") state.worldDecay = clamp((state.worldDecay || 0) + changes.worldDecay);
  if (typeof changes.personalDecay === "number") state.personalDecay = clamp((state.personalDecay || 0) + changes.personalDecay);
  if (typeof changes.sin === "number") state.sin = clamp((state.sin || 0) + changes.sin);
  if (options.writeMessage === false) return state;
  const stageLabel = getWorldDecayStageLabel(state.worldDecay);
  const prefix = options.dev ? "Dev: " : "";
  state.activeMessage = `${prefix}Разложение мира ${state.worldDecay}/100 (${stageLabel}), личное разложение ${state.personalDecay}/100, Sin ${state.sin}/100.`;
  state.journal.push(state.activeMessage);
  return state;
}
