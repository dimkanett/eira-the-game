export const WORLD_MAP_SIZE = {
  width: 1402,
  height: 1122,
};

export const worldMap = {
  background: "/assets/maps/world_map.png",
  ...WORLD_MAP_SIZE,
};

// Coordinates are intentionally kept in the same pixel coordinate system as
// WORLD_MAP_SIZE. When legacy/map_nodes_correct.js is present, this file must
// be regenerated from it without hand-adjusting individual points.
export const worldNodes = [
  { id: "silverglade", name: "Сильверглейд / Лунный Трон", x: 230, y: 210, biome: "city", region: "Серебряный Предел", danger: 1, connections: ["moon_road", "mirven"] },
  { id: "moon_road", name: "Лунная дорога", x: 390, y: 265, biome: "road", region: "Серебряный Предел", danger: 1, connections: ["silverglade", "ancient_temple_ruins", "silver_cascades"] },
  { id: "mirven", name: "Мирвен", x: 160, y: 385, biome: "city", region: "Западные Леса", danger: 1, connections: ["silverglade", "tenebris_forest_edge"] },
  { id: "ancient_temple_ruins", name: "Руины Древнего Храма", x: 555, y: 330, biome: "ruins", region: "Серебряный Предел", danger: 2, connections: ["moon_road", "eternal_moon_temple"] },
  { id: "eternal_moon_temple", name: "Храм Вечной Луны", x: 720, y: 240, biome: "temple", region: "Серебряный Предел", danger: 2, connections: ["ancient_temple_ruins", "silver_wall_west"] },
  { id: "silver_cascades", name: "Серебряные каскады", x: 530, y: 505, biome: "wilds", region: "Серебряный Предел", danger: 2, connections: ["moon_road", "captain_bay"] },
  { id: "captain_bay", name: "Бухта капитана", x: 675, y: 650, biome: "sea", region: "Южный Берег", danger: 2, connections: ["silver_cascades", "eliandor"] },
  { id: "eliandor", name: "Элиандор", x: 905, y: 715, biome: "city", region: "Южные Острова", danger: 1, connections: ["captain_bay", "southern_rift"] },
  { id: "tenebris_forest_edge", name: "Опушка Тенебриса", x: 115, y: 560, biome: "forest", region: "Тенебрис", danger: 2, connections: ["mirven", "tenebris_forest_deep"] },
  { id: "tenebris_forest_deep", name: "Проклятый лес Тенебрис", x: 260, y: 690, biome: "forest", region: "Тенебрис", danger: 4, connections: ["tenebris_forest_edge"] },
  { id: "silver_wall_west", name: "Серебряная стена — запад", x: 890, y: 340, biome: "wall", region: "Серебряный Предел", danger: 3, connections: ["eternal_moon_temple", "silver_wall_east"] },
  { id: "silver_wall_east", name: "Серебряная стена — восток", x: 1030, y: 365, biome: "wall", region: "Восточный Рубеж", danger: 3, connections: ["silver_wall_west"] },
  { id: "southern_rift", name: "Южный разлом", x: 1040, y: 610, biome: "rift", region: "Южные Острова", danger: 5, connections: ["eliandor"] },
];

export const worldNodeById = Object.fromEntries(worldNodes.map((node) => [node.id, node]));
