import { useState } from "react";

export function getCharacterPortrait(character = {}) {
  if (character.portrait) return character.portrait;

  const characterId = character.id || "lorien_elf";
  if ((character.hp || 0) < (character.maxHp || 1) * 0.3) return `/assets/characters/${characterId}_badly_wounded.png`;
  if (character.body?.leftArm?.status === "severe") return `/assets/characters/${characterId}_left_arm_wounded.png`;
  if (character.body?.rightArm?.status === "severe") return `/assets/characters/${characterId}_right_arm_wounded.png`;
  if (character.body?.head?.status === "severe") return `/assets/characters/${characterId}_head_wounded.png`;
  if (Object.values(character.body || {}).some((part) => part.status && part.status !== "ok")) return `/assets/characters/${characterId}_wounded.png`;

  return `/assets/characters/${characterId}_default.png`;
}

export default function CharacterPortrait({ character, size = "small", onClick }) {
  const [failed, setFailed] = useState(false);
  const className = `portrait portrait-${size}`;
  const name = character?.name || "Портрет персонажа";
  const image = failed ? (
    <div className={`${className} portrait-fallback`} aria-label={name}>{name}</div>
  ) : (
    <img className={className} src={getCharacterPortrait(character)} alt={name} onError={() => setFailed(true)} />
  );

  if (!onClick) return image;

  return (
    <button className={`portrait-button portrait-button-${size}`} type="button" onClick={onClick} title="Открыть подробный портрет">
      {image}
      {size === "small" && <span className="portrait-hint">Нажмите для просмотра</span>}
    </button>
  );
}
