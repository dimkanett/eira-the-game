import { injuryTypes } from "../data/injuries.js";
import { cloneState } from "./gameState.js";

export function applyInjury(gameState, targetId, injuryId) {
  const state = cloneState(gameState);
  const injury = injuryTypes[injuryId];
  const target = targetId === "hero" ? state.hero : null;
  if (!target || !injury) return state;
  const bodyPart = target.body[injury.bodyPart];
  bodyPart.injuries.push(injuryId);
  bodyPart.status = injury.severity;
  state.journal.push(`${target.name} получает травму: ${injury.name}.`);
  return state;
}

export function getBodyPartStatus(character, bodyPart) {
  return character.body?.[bodyPart]?.status || "unknown";
}

export function getStatWithInjuries(character, stat) {
  const injuryIds = Object.values(character.body || {}).flatMap((part) => part.injuries || []);
  const modifier = injuryIds.reduce((sum, id) => {
    const injury = injuryTypes[id];
    return sum + (injury?.effects || []).filter((effect) => effect.type === "stat_modifier" && effect.stat === stat).reduce((partSum, effect) => partSum + effect.value, 0);
  }, 0);
  return Math.max(0, (character.stats?.[stat] || 0) + modifier);
}

export function canCharacterAttack(character) {
  const left = getBodyPartStatus(character, "leftArm");
  const right = getBodyPartStatus(character, "rightArm");
  return !(left === "severe" && right === "severe");
}

export function canCharacterMove(character) {
  const left = getBodyPartStatus(character, "leftLeg");
  const right = getBodyPartStatus(character, "rightLeg");
  return !(left === "severe" && right === "severe");
}

export function getMovementCostModifier(character) {
  const legStatuses = [getBodyPartStatus(character, "leftLeg"), getBodyPartStatus(character, "rightLeg")];
  return legStatuses.filter((status) => status === "light" || status === "severe").length;
}
