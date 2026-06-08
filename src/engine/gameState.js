export const healthyBody = {
  head: { status: "ok", injuries: [] },
  torso: { status: "ok", injuries: [] },
  leftArm: { status: "ok", injuries: [] },
  rightArm: { status: "ok", injuries: [] },
  leftLeg: { status: "ok", injuries: [] },
  rightLeg: { status: "ok", injuries: [] },
};

export const initialGameState = {
  mode: "world",
  currentCity: null,
  worldDecay: 0,
  personalDecay: 0,
  sin: 0,
  hero: {
    id: "lorien_elf",
    name: "Эльф Лориэна",
    location: "silverglade",
    cityLocation: null,
    locationMapNode: null,
    day: 1,
    hp: 42,
    maxHp: 42,
    fatigue: 0,
    trace: 0,
    actionsMax: 1,
    actionsLeft: 1,
    stats: { strength: 2, agility: 4, defense: 2, perception: 5, charisma: 3, will: 4, intellect: 4 },
    body: healthyBody,
    equipment: { mainHand: "short_bow", offHand: null, armor: null, accessory: null },
    inventory: ["elven_cloak", "short_bow", "ration_1", "ration_2"],
  },
  party: { companions: [] },
  world: { knownNodes: ["silverglade", "moon_road", "mirven"], visitedNodes: ["silverglade"], revealedByRumor: [], threat: 1 },
  npcPlayers: [
    { id: "wandering_knight", name: "Странствующий рыцарь", location: "moon_road", alive: true },
    { id: "shadow_scout", name: "Теневой следопыт", location: "tenebris_forest_edge", alive: true },
  ],
  reputation: {},
  activeEvent: null,
  activeCombat: null,
  travel: { active: false, fromNodeId: null, toNodeId: null, daysRemaining: 0, eventResolved: false },
  activeMessage: "Ты стоишь у ворот Сильверглейда. Соседние дороги проступают из тумана войны.",
  lore: { discoveredFragments: [], discoveredCollections: [], unreadFragments: [] },
  journal: ["День 1. Путь начинается в Сильверглейде."],
};

export function cloneState(gameState) {
  return structuredClone(gameState);
}
