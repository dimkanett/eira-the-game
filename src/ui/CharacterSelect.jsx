import { useState } from "react";
import { worldNodeById } from "../data/worldNodes.js";

const statLabels = {
  strength: "Сила",
  agility: "Ловкость",
  defense: "Защита",
  perception: "Восприятие",
  charisma: "Харизма",
  will: "Воля",
  intellect: "Интеллект",
};

function CharacterPortrait({ character }) {
  const [failed, setFailed] = useState(false);

  if (failed || !character.portrait) {
    return <div className="character-card-portrait character-card-portrait-fallback">{character.name}</div>;
  }

  return (
    <img
      src={character.portrait}
      alt={character.name}
      className="character-card-portrait"
      onError={() => setFailed(true)}
    />
  );
}

export default function CharacterSelect({ characters, onSelect }) {
  return (
    <main className="character-select-screen">
      <section className="character-select-header">
        <h1>Выбор героя</h1>
        <p>Выбери, с чьей боли начнётся путь по Эйре.</p>
      </section>

      <section className="character-grid">
        {characters.map((character) => {
          const startNode = worldNodeById[character.startLocationId];

          return (
            <article key={character.id} className="character-card">
              <CharacterPortrait character={character} />
              <div className="character-card-body">
                <h2>{character.name}</h2>
                <div className="character-race">{character.race}</div>
                <p>{character.shortDescription}</p>
                <div className="character-start">Старт: {startNode?.name || character.startLocationId}</div>
                <dl className="character-stats">
                  {Object.entries(character.stats).map(([stat, value]) => (
                    <div key={stat}>
                      <dt>{statLabels[stat] || stat}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
                <button onClick={() => onSelect(character.id)}>Выбрать</button>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
