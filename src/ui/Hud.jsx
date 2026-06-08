import { getWorldDecayStageLabel } from "../engine/decayEngine.js";

const bodyLabels = { head: "голова", torso: "корпус", leftArm: "левая рука", rightArm: "правая рука", leftLeg: "левая нога", rightLeg: "правая нога" };

export default function Hud({ gameState }) {
  const injuries = Object.entries(gameState.hero.body).flatMap(([part, value]) => (value.injuries || []).map((injury) => `${bodyLabels[part]}: ${injury}`));
  const decayStage = getWorldDecayStageLabel(gameState.worldDecay || 0);

  return (
    <header className="hud">
      <strong>{gameState.hero.name}</strong>
      <span>HP {gameState.hero.hp}/{gameState.hero.maxHp}</span>
      <span>День: {gameState.hero.day}</span>
      <span>Разложение мира: {gameState.worldDecay || 0}/100 ({decayStage})</span>
      <span>Личное разложение: {gameState.personalDecay || 0}/100</span>
      <span>Sin: {gameState.sin || 0}/100</span>
      <span>Действия {gameState.hero.actionsLeft}/{gameState.hero.actionsMax}</span>
      <span>Усталость {gameState.hero.fatigue}</span>
      <span>След {gameState.hero.trace}</span>
      <span>Режим {gameState.mode}</span>
      <span>Травмы: {injuries.length ? injuries.join(", ") : "нет"}</span>
    </header>
  );
}
