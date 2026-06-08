export const locationMaps = {
  ancient_temple_ruins: {
    id: "ancient_temple_ruins",
    name: "Руины Древнего Храма",
    background: "/assets/locations/ruin_drevniy_hram.png",
    width: 1200,
    height: 900,
    startNode: "temple_entrance",
    nodes: [
      { id: "temple_entrance", name: "Вход в руины", x: 180, y: 720, type: "entrance", description: "Сломанные ступени уходят под корни древних деревьев." },
      { id: "temple_hall", name: "Главный зал", x: 560, y: 430, type: "explore", description: "Зал без крыши, где свет луны падает прямо на расколотый пол." },
      { id: "temple_altar", name: "Старый алтарь", x: 780, y: 240, type: "quest", description: "Алтарь покрыт символами, которые не похожи на современное письмо эльфов." },
    ],
  },
};
