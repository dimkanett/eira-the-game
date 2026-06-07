export const cityNodes = {
  silverglade: {
    id: "silverglade",
    name: "Сильверглейд / Лунный Трон",
    background: "/assets/cities/Silverglade.png",
    fallbackBackground: "/assets/locations/Silverglade.png",
    width: 1200,
    height: 900,
    startNode: "silverglade_square",
    nodes: [
      { id: "silverglade_square", name: "Лунная площадь", x: 575, y: 485, type: "square", description: "Площадь, где сходятся слухи, стража и лунный свет." },
      { id: "silverglade_throne", name: "Лунный Трон", x: 600, y: 220, type: "throne", description: "Сердце власти Сильверглейда и будущей основной сюжетной ветки." },
      { id: "silverglade_temple", name: "Святилище Луны", x: 850, y: 335, type: "temple", description: "Тихое святилище, где усталость отступает под серебряными сводами." },
      { id: "silverglade_market", name: "Серебряный рынок", x: 360, y: 600, type: "market", description: "Рынок редких трав, тонкой работы, старых карт и вещей, которые продавцы называют почти не проклятыми." },
      { id: "silverglade_forge", name: "Кузница звёздного железа", x: 255, y: 410, type: "forge", description: "Здесь позже появятся ремонт, улучшение оружия и работа с редкими металлами." },
      { id: "silverglade_healer", name: "Дом лекаря", x: 785, y: 620, type: "healer", description: "Дом лекаря восстанавливает здоровье без траты дня." },
      { id: "silverglade_archives", name: "Архивы Серебряной памяти", x: 710, y: 430, type: "archives", description: "Полки с летописями, картами и фрагментами старого знания." },
      { id: "silverglade_songs", name: "Дом тихих песен", x: 450, y: 320, type: "songs", description: "Место отдыха, слухов и будущих встреч со спутниками." },
      { id: "silverglade_gates", name: "Ворота к лесным дорогам", x: 585, y: 790, type: "exit", description: "Выход обратно на глобальную карту." },
    ],
  },
};
