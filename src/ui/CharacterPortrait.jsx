export function getCharacterPortrait(character) {
  if (character.hp < character.maxHp * 0.3) return "/assets/characters/lorien_elf_badly_wounded.png";
  if (character.body?.leftArm?.status === "severe") return "/assets/characters/lorien_elf_left_arm_wounded.png";
  return "/assets/characters/lorien_elf_default.png";
}

export default function CharacterPortrait({ character }) {
  return <img className="portrait" src={getCharacterPortrait(character)} alt={character.name} onError={(event) => { event.currentTarget.src = "/assets/characters/placeholders/portrait_placeholder.png"; event.currentTarget.onerror = null; }} />;
}
