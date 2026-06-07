import CharacterPortrait from "./CharacterPortrait.jsx";

const bodyLabels = {
  head: "Голова",
  torso: "Корпус",
  leftArm: "Левая рука",
  rightArm: "Правая рука",
  leftLeg: "Левая нога",
  rightLeg: "Правая нога",
};

const equipmentLabels = {
  mainHand: "Основная рука",
  offHand: "Вторая рука",
  armor: "Броня",
  accessory: "Аксессуар",
};

function getInjuryText(part) {
  if (!part?.injuries?.length) return "травм нет";
  return part.injuries.join(", ");
}

export default function CharacterModal({ character }) {
  return (
    <div className="character-modal-content">
      <CharacterPortrait character={character} size="large" />
      <div className="character-details">
        <section>
          <h3>Состояние</h3>
          <p><strong>Имя:</strong> {character.name}</p>
          <p><strong>HP:</strong> {character.hp}/{character.maxHp}</p>
          <p><strong>Усталость:</strong> {character.fatigue}</p>
          <p><strong>След:</strong> {character.trace}</p>
        </section>

        <section>
          <h3>Экипировка</h3>
          <dl className="details-grid">
            {Object.entries(character.equipment || {}).map(([slot, itemId]) => (
              <div key={slot}>
                <dt>{equipmentLabels[slot] || slot}</dt>
                <dd>{itemId || "пусто"}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h3>Части тела</h3>
          <dl className="details-grid body-status-grid">
            {Object.entries(character.body || {}).map(([partId, part]) => (
              <div key={partId} className={`body-status body-status-${part.status || "unknown"}`}>
                <dt>{bodyLabels[partId] || partId}</dt>
                <dd>Статус: {part.status || "unknown"}</dd>
                <dd>{getInjuryText(part)}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  );
}
