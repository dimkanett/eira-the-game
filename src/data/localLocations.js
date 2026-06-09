export const localLocations = {
  iron_bridge_village: {
    id: "iron_bridge_village",
    name: "Деревня Железного моста",
    mapImage: "/assets/locations/iron_bridge_village_map.png",
    width: 1200,
    height: 800,
    nodes: [
      { id: "emma_home", name: "Дом Эммы", x: 250, y: 520, eventId: "emma_morning_home" },
      { id: "village_well", name: "Колодец", x: 410, y: 470, eventId: "emma_well_morning" },
      { id: "village_market", name: "Рыночная площадь", x: 560, y: 390, eventId: "emma_market_morning" },
      { id: "old_gods_statue", name: "Старая статуя Витаэль", x: 690, y: 430, eventId: "emma_old_statue" },
      { id: "olma_forge", name: "Кузница Ольмы", x: 820, y: 360, eventId: "emma_olma_first_talk" },
      { id: "timo_yard", name: "Двор прачки", x: 470, y: 610, eventId: "emma_timo_first_meeting" },
      { id: "iron_bridge", name: "Железный мост", x: 910, y: 570, eventId: "emma_bridge_normal_day" },
      { id: "river_path", name: "Тропа к реке", x: 1010, y: 680, eventId: "emma_river_path" },
      { id: "forest_edge", name: "Край ольшанника", x: 1040, y: 220, eventId: "emma_forest_edge_search" },
      { id: "leave_village", name: "Выйти к тракту", x: 1120, y: 420, eventId: "emma_leave_village" },
    ],
  },
};

export const localLocationById = localLocations;
