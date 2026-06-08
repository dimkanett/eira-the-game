export const bodyParts = ["head", "torso", "leftArm", "rightArm", "leftLeg", "rightLeg"];

export const injuryTypes = {
  light_left_arm_cut: { id: "light_left_arm_cut", name: "Лёгкий порез левой руки", bodyPart: "leftArm", severity: "light", effects: [{ type: "stat_modifier", stat: "strength", value: -1 }, { type: "attack_modifier", value: -1 }] },
  sprained_right_leg: { id: "sprained_right_leg", name: "Растяжение правой ноги", bodyPart: "rightLeg", severity: "light", effects: [{ type: "movement_modifier", value: 1 }] },
  heavy_torso_wound: { id: "heavy_torso_wound", name: "Тяжёлая рана корпуса", bodyPart: "torso", severity: "severe", effects: [{ type: "stat_modifier", stat: "defense", value: -2 }] },
};
