const bodyLabels = { head: "голова", torso: "корпус", leftArm: "левая рука", rightArm: "правая рука", leftLeg: "левая нога", rightLeg: "правая нога" };

function getDecayStageLabel(worldDecay) {
  if (worldDecay <= 20) return "Трещины";
  if (worldDecay <= 40) return "Гниение";
  if (worldDecay <= 60) return "Распад";
  if (worldDecay <= 80) return "Обвал";
  return "Бездна";
}

export default function Hud({ gameState }) {
  const injuries = Object.entries(gameState.hero.body).flatMap(([part, value]) => (value.injuries || []).map((injury) => `${bodyLabels[part]}: ${injury}`));
  return (
    <header className="hud">
      <strong>{gameState.hero.name}</strong>
      <span>HP {gameState.hero.hp}/{gameState.hero.maxHp}</span>
      <span>День {gameState.hero.day}</span>
      <span>Действия {gameState.hero.actionsLeft}/{gameState.hero.actionsMax}</span>
      <span>Усталость {gameState.hero.fatigue}</span>
      <span>След {gameState.hero.trace}</span>
      <span>Разложение мира {gameState.worldDecay}</span>
      <span>Sin {gameState.sin}</span>
      <span>Личное разложение {gameState.personalDecay}</span>
      <span>Стадия {getDecayStageLabel(gameState.worldDecay || 0)}</span>
      <span>Режим {gameState.mode}</span>
      <span>Травмы: {injuries.length ? injuries.join(", ") : "нет"}</span>
    </header>
  );
}
