export const localLocations = {
  iron_bridge_village: {
    id: "iron_bridge_village",
    name: "Деревня Железного моста",
    mapImage: "/assets/locations/iron_bridge_village_map.png",
    width: 1200,
    height: 800,
    nodes: [
      { id: "emma_mill", name: "Мельница / дом Эммы", x: 250, y: 520, eventId: "emma_mill_after_morning" },
      { id: "marta_tavern", name: "Трактир Марты", x: 430, y: 430, eventId: "emma_marta_delivery" },
      { id: "hagen_forge", name: "Кузница Хагена", x: 820, y: 360, eventId: "emma_hagen_delivery" },
      { id: "oren_temple", name: "Храм Орена", x: 690, y: 430, eventId: "emma_oren_delivery" },
      { id: "oswin_house", name: "Дом старосты Освина", x: 570, y: 310, eventId: "emma_oswin_delivery" },
      { id: "iron_bridge", name: "Железный мост", x: 910, y: 570, eventId: "emma_bridge_flour_walk" },
      { id: "river_bank", name: "Речной берег", x: 1010, y: 680, eventId: "emma_river_bank_morning" },
      { id: "leave_village", name: "Выйти к тракту", x: 1120, y: 420, eventId: "emma_leave_village_slice_01" },
    ],
  },
};

export const localLocationById = localLocations;
