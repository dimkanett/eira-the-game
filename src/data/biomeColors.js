export const biomeColors = {
  city: "#f2c94c",
  road: "#9b5de5",
  forest: "#4ade80",
  plain: "#a3e635",
  mountain: "#a47551",
  sea: "#38bdf8",
  coast: "#22d3ee",
  port: "#0ea5e9",
  desert: "#f59e0b",
  swamp: "#64748b",
  rift: "#ef4444",
  ruins: "#adb5bd",
  temple: "#f8f9fa",
  wilds: "#95d5b2",
  wall: "#ced4da",
  default: "#94a3b8",
};

export function getBiomeColor(biome) {
  return biomeColors[biome] || biomeColors.default;
}
