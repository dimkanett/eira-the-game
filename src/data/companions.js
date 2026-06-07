const healthyBody = {
  head: { status: "ok", injuries: [] }, torso: { status: "ok", injuries: [] }, leftArm: { status: "ok", injuries: [] }, rightArm: { status: "ok", injuries: [] }, leftLeg: { status: "ok", injuries: [] }, rightLeg: { status: "ok", injuries: [] },
};

export const companions = {
  elven_scout: { id: "elven_scout", name: "Эльфийская следопытка", trust: 0, hp: 28, maxHp: 28, stats: { strength: 2, agility: 5, defense: 2, perception: 5, charisma: 2, will: 3, intellect: 3 }, body: healthyBody, bonuses: [{ type: "stat_modifier", stat: "perception", value: 1 }], combatRole: "ranged_support" },
};
