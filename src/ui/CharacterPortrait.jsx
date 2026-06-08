const PLACEHOLDER_PORTRAIT = "/assets/characters/placeholders/portrait_placeholder.png";

export function getCharacterPortrait(character = {}) {
  const characterId = character.id || "lorien_elf";

  if ((character.hp || 0) < (character.maxHp || 1) * 0.3) return `/assets/characters/${characterId}_badly_wounded.png`;
  if (character.body?.leftArm?.status === "severe") return `/assets/characters/${characterId}_left_arm_wounded.png`;
  if (character.body?.rightArm?.status === "severe") return `/assets/characters/${characterId}_right_arm_wounded.png`;
  if (character.body?.head?.status === "severe") return `/assets/characters/${characterId}_head_wounded.png`;
  if (Object.values(character.body || {}).some((part) => part.status && part.status !== "ok")) return `/assets/characters/${characterId}_wounded.png`;

  return `/assets/characters/${characterId}_default.png`;
}

export default function CharacterPortrait({ character, size = "small", onClick }) {
  const image = (
    <img
      className={`portrait portrait-${size}`}
      src={getCharacterPortrait(character)}
      alt={character?.name || "Портрет персонажа"}
      onError={(event) => {
        if (event.currentTarget.src.endsWith(PLACEHOLDER_PORTRAIT)) return;
        event.currentTarget.src = PLACEHOLDER_PORTRAIT;
      }}
    />
  );

  if (!onClick) return image;

  return (
    <button className={`portrait-button portrait-button-${size}`} type="button" onClick={onClick} title="Открыть подробный портрет">
      {image}
      {size === "small" && <span className="portrait-hint">Нажмите для просмотра</span>}
    </button>
  );
}
