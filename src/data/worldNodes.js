export const WORLD_MAP_SIZE = {
  width: 1402,
  height: 1122,
};

export const worldMap = {
  background: "/assets/maps/world_map.png",
  ...WORLD_MAP_SIZE,
};

export const worldNodes = [
  {
    "id": "silverglade",
    "name": "Сильверглейд / Лунный Трон",
    "x": 266,
    "y": 166,
    "biome": "city",
    "region": "Серебряный Предел",
    "danger": 1,
    "connections": [
      "eternal_moon_temple",
      "old_forest",
      "eternal_mist_hills",
      "ancient_temple_ruins",
      "moon_road",
      "silver_tears_forest"
    ],
    "introEventId": "silverglade_intro"
  },
  {
    "id": "ancient_temple_ruins",
    "name": "Руины Древнего Храма",
    "x": 154,
    "y": 148,
    "biome": "forest",
    "region": "Серебряный Предел",
    "danger": 4,
    "connections": [
      "silver_tears_forest",
      "north_coast_1",
      "silverglade",
      "silver_cascades"
    ]
  },
  {
    "id": "silver_tears_forest",
    "name": "Лес Серебряных Слёз",
    "x": 138,
    "y": 205,
    "biome": "forest",
    "region": "Серебряный Предел",
    "danger": 3,
    "connections": [
      "ancient_temple_ruins",
      "silver_cascades",
      "silverglade",
      "eternal_moon_temple"
    ]
  },
  {
    "id": "silver_cascades",
    "name": "Серебряные Каскады",
    "x": 173,
    "y": 285,
    "biome": "forest",
    "region": "Серебряный Предел",
    "danger": 2,
    "connections": [
      "silver_tears_forest",
      "silver_wall_west",
      "eternal_moon_temple",
      "ancient_temple_ruins"
    ]
  },
  {
    "id": "eternal_mist_hills",
    "name": "Холмы Вечного Тумана",
    "x": 311,
    "y": 75,
    "biome": "forest",
    "region": "Серебряный Предел",
    "danger": 3,
    "connections": [
      "old_forest",
      "silverglade",
      "eliandor",
      "moon_meadow"
    ]
  },
  {
    "id": "old_forest",
    "name": "Старая лесная тропа",
    "x": 364,
    "y": 153,
    "biome": "forest",
    "region": "Серебряный Предел",
    "danger": 3,
    "connections": [
      "eliandor",
      "moon_meadow",
      "eternal_mist_hills",
      "silverglade",
      "renewal_grove"
    ]
  },
  {
    "id": "eliandor",
    "name": "Элиандор",
    "x": 406,
    "y": 151,
    "biome": "city",
    "region": "Серебряный Предел",
    "danger": 1,
    "connections": [
      "old_forest",
      "moon_meadow",
      "renewal_grove",
      "moon_road",
      "eternal_mist_hills"
    ]
  },
  {
    "id": "renewal_grove",
    "name": "Роща Обновления",
    "x": 489,
    "y": 107,
    "biome": "forest",
    "region": "Серебряный Предел",
    "danger": 2,
    "connections": [
      "eliandor",
      "whispering_trees_valley",
      "old_forest",
      "moon_meadow",
      "north_forest"
    ]
  },
  {
    "id": "north_forest",
    "name": "Северная чаща",
    "x": 604,
    "y": 204,
    "biome": "forest",
    "region": "Серебряный Предел",
    "danger": 3,
    "connections": [
      "tenebris_forest_deep",
      "tenebris_forest_edge",
      "whispering_trees_valley",
      "renewal_grove"
    ]
  },
  {
    "id": "moon_road",
    "name": "Тракт Вечной Луны",
    "x": 360,
    "y": 250,
    "biome": "road",
    "region": "Серебряный Предел",
    "danger": 2,
    "connections": [
      "moon_meadow",
      "eternal_moon_temple",
      "mirven",
      "seven_stars_glade",
      "eliandor",
      "silverglade"
    ]
  },
  {
    "id": "moon_meadow",
    "name": "Лунная Поляна",
    "x": 384,
    "y": 210,
    "biome": "forest",
    "region": "Серебряный Предел",
    "danger": 2,
    "connections": [
      "moon_road",
      "old_forest",
      "eliandor",
      "mirven",
      "renewal_grove",
      "eternal_mist_hills"
    ]
  },
  {
    "id": "eternal_moon_temple",
    "name": "Храм Вечной Луны",
    "x": 285,
    "y": 231,
    "biome": "forest",
    "region": "Серебряный Предел",
    "danger": 2,
    "connections": [
      "silverglade",
      "moon_road",
      "silver_cascades",
      "silver_tears_forest"
    ]
  },
  {
    "id": "whispering_trees_valley",
    "name": "Долина Шепчущих Деревьев",
    "x": 492,
    "y": 219,
    "biome": "forest",
    "region": "Серебряный Предел",
    "danger": 3,
    "connections": [
      "mirven",
      "tenebris_forest_deep",
      "renewal_grove",
      "north_forest"
    ]
  },
  {
    "id": "tenebris_forest_edge",
    "name": "Край Леса Тенебрис",
    "x": 598,
    "y": 307,
    "biome": "forest",
    "region": "Серебряный Предел",
    "danger": 4,
    "connections": [
      "tenebris_forest_deep",
      "silverka_ford",
      "north_forest",
      "rivenholl"
    ]
  },
  {
    "id": "tenebris_forest_deep",
    "name": "Проклятый Лес Тенебрис",
    "x": 578,
    "y": 255,
    "biome": "forest",
    "region": "Серебряный Предел",
    "danger": 6,
    "connections": [
      "tenebris_forest_edge",
      "north_forest",
      "whispering_trees_valley",
      "silverka_ford"
    ]
  },
  {
    "id": "mirven",
    "name": "Мирвэн",
    "x": 443,
    "y": 290,
    "biome": "city",
    "region": "Серебряный Предел",
    "danger": 1,
    "connections": [
      "seven_stars_glade",
      "silver_wall_east",
      "whispering_trees_valley",
      "moon_road",
      "moon_meadow"
    ]
  },
  {
    "id": "seven_stars_glade",
    "name": "Поляна Семи Звёзд",
    "x": 404,
    "y": 340,
    "biome": "forest",
    "region": "Серебряный Предел",
    "danger": 3,
    "connections": [
      "mirven",
      "silver_wall_east",
      "moon_road",
      "south_forest_path"
    ]
  },
  {
    "id": "silver_wall_west",
    "name": "Серебряная Стена: запад",
    "x": 190,
    "y": 376,
    "biome": "forest",
    "region": "Серебряный Предел",
    "danger": 3,
    "connections": [
      "silver_cascades"
    ]
  },
  {
    "id": "silver_wall_east",
    "name": "Серебряная Стена: восток",
    "x": 474,
    "y": 367,
    "biome": "forest",
    "region": "Серебряный Предел",
    "danger": 3,
    "connections": [
      "vaitfordj",
      "seven_stars_glade",
      "crow_hills",
      "mirven",
      "silverka_ford",
      "south_forest_path"
    ]
  },
  {
    "id": "silverka_ford",
    "name": "Брод через Серебрянку",
    "x": 576,
    "y": 384,
    "biome": "road",
    "region": "Венценосные земли",
    "danger": 2,
    "connections": [
      "crow_hills",
      "tenebris_forest_edge",
      "silver_wall_east",
      "rivenholl",
      "tenebris_forest_deep"
    ]
  },
  {
    "id": "crow_hills",
    "name": "Холмы Ворона",
    "x": 522,
    "y": 427,
    "biome": "plain",
    "region": "Венценосные земли",
    "danger": 3,
    "connections": [
      "vaitfordj",
      "silverka_ford",
      "silver_wall_east",
      "three_names_castle",
      "west_a_sterwald_road"
    ]
  },
  {
    "id": "south_forest_path",
    "name": "Южная лесная тропа",
    "x": 380,
    "y": 441,
    "biome": "forest",
    "region": "Серебряный Предел",
    "danger": 3,
    "connections": [
      "red_wine_village",
      "vaitfordj",
      "seven_stars_glade",
      "silver_wall_east"
    ]
  },
  {
    "id": "north_coast_1",
    "name": "Северный берег",
    "x": 95,
    "y": 90,
    "biome": "sea",
    "region": "Внутреннее море",
    "danger": 2,
    "connections": [
      "ancient_temple_ruins",
      "west_cliffs_1"
    ]
  },
  {
    "id": "west_cliffs_1",
    "name": "Западные утёсы",
    "x": 55,
    "y": 230,
    "biome": "sea",
    "region": "Внутреннее море",
    "danger": 3,
    "connections": [
      "north_coast_1",
      "inner_sea_north"
    ]
  },
  {
    "id": "rivenholl",
    "name": "Ривенхолл",
    "x": 682,
    "y": 379,
    "biome": "city",
    "region": "Венценосные земли",
    "danger": 2,
    "connections": [
      "north_a_sterwald_road",
      "silverka_ford",
      "tenebris_forest_edge",
      "west_a_sterwald_road",
      "asterwald"
    ]
  },
  {
    "id": "vaitfordj",
    "name": "Вайтфордж",
    "x": 455,
    "y": 439,
    "biome": "city",
    "region": "Венценосные земли",
    "danger": 2,
    "connections": [
      "crow_hills",
      "silver_wall_east",
      "south_forest_path",
      "three_names_castle",
      "red_wine_village"
    ]
  },
  {
    "id": "red_wine_village",
    "name": "Деревня Красного Вина",
    "x": 386,
    "y": 507,
    "biome": "plain",
    "region": "Венценосные земли",
    "danger": 2,
    "connections": [
      "south_forest_path",
      "three_names_castle",
      "vaitfordj",
      "forgotten_oaths_forest"
    ]
  },
  {
    "id": "three_names_castle",
    "name": "Замок Трёх Имён",
    "x": 480,
    "y": 521,
    "biome": "plain",
    "region": "Венценосные земли",
    "danger": 3,
    "connections": [
      "vaitfordj",
      "red_wine_village",
      "crow_hills",
      "forgotten_oaths_forest",
      "lanvill"
    ]
  },
  {
    "id": "forgotten_oaths_forest",
    "name": "Лес Забытых Клятв",
    "x": 384,
    "y": 608,
    "biome": "forest",
    "region": "Венценосные земли",
    "danger": 4,
    "connections": [
      "coast_fort",
      "red_wine_village",
      "three_names_castle"
    ]
  },
  {
    "id": "lanvill",
    "name": "Ланвилл",
    "x": 558,
    "y": 640,
    "biome": "city",
    "region": "Венценосные земли",
    "danger": 2,
    "connections": [
      "south_a_sterwald_road",
      "four_winds_crossroad",
      "eshwood",
      "west_a_sterwald_road",
      "three_names_castle"
    ]
  },
  {
    "id": "four_winds_crossroad",
    "name": "Перекрёсток Четырёх Ветров",
    "x": 561,
    "y": 726,
    "biome": "road",
    "region": "Венценосные земли",
    "danger": 3,
    "connections": [
      "lanvill",
      "eshwood",
      "whispering_blood_lake",
      "black_bog_north",
      "south_a_sterwald_road"
    ]
  },
  {
    "id": "eshwood",
    "name": "Эшвуд",
    "x": 648,
    "y": 681,
    "biome": "plain",
    "region": "Венценосные земли",
    "danger": 3,
    "connections": [
      "golden_river_bank",
      "secret_valley",
      "south_a_sterwald_road",
      "four_winds_crossroad",
      "lanvill"
    ]
  },
  {
    "id": "golden_river_bank",
    "name": "Берег Золотой Реки",
    "x": 680,
    "y": 636,
    "biome": "plain",
    "region": "Венценосные земли",
    "danger": 2,
    "connections": [
      "eshwood",
      "secret_valley"
    ]
  },
  {
    "id": "asterwald",
    "name": "Астервальд",
    "x": 696,
    "y": 538,
    "biome": "city",
    "region": "Венценосные земли",
    "danger": 1,
    "connections": [
      "east_a_sterwald_road",
      "west_a_sterwald_road",
      "south_a_sterwald_road",
      "golden_ford",
      "north_a_sterwald_road",
      "rivenholl"
    ]
  },
  {
    "id": "secret_valley",
    "name": "Секретная Долина",
    "x": 740,
    "y": 681,
    "biome": "plain",
    "region": "Венценосные земли",
    "danger": 3,
    "connections": [
      "golden_ford",
      "golden_river_bank",
      "burning_hearth_village",
      "eshwood",
      "razlomgrad",
      "valdek"
    ]
  },
  {
    "id": "golden_ford",
    "name": "Золотой Брод",
    "x": 775,
    "y": 637,
    "biome": "road",
    "region": "Венценосные земли",
    "danger": 2,
    "connections": [
      "secret_valley",
      "blakthorn",
      "east_a_sterwald_road",
      "quiet_ashes",
      "burning_hearth_village",
      "asterwald",
      "roshefort"
    ]
  },
  {
    "id": "roshefort",
    "name": "Рошефорт",
    "x": 836,
    "y": 520,
    "biome": "city",
    "region": "Венценосные земли",
    "danger": 2,
    "connections": [
      "weeping_widows_hill",
      "east_a_sterwald_road",
      "quiet_ashes",
      "gray_stone_village",
      "golden_ford",
      "north_a_sterwald_road"
    ]
  },
  {
    "id": "gray_stone_village",
    "name": "Деревня Серых Камней",
    "x": 880,
    "y": 443,
    "biome": "plain",
    "region": "Венценосные земли",
    "danger": 3,
    "connections": [
      "weeping_widows_hill",
      "red_rill_source",
      "roshefort",
      "iron_bridge_village",
      "north_a_sterwald_road"
    ]
  },
  {
    "id": "weeping_widows_hill",
    "name": "Холм Плачущих Вдов",
    "x": 897,
    "y": 512,
    "biome": "plain",
    "region": "Венценосные земли",
    "danger": 4,
    "connections": [
      "roshefort",
      "gray_stone_village",
      "quiet_ashes",
      "east_a_sterwald_road"
    ]
  },
  {
    "id": "quiet_ashes",
    "name": "Тихий Пепел",
    "x": 867,
    "y": 600,
    "biome": "plain",
    "region": "Венценосные земли",
    "danger": 4,
    "connections": [
      "blakthorn",
      "roshefort",
      "weeping_widows_hill",
      "golden_ford",
      "raider_camp"
    ]
  },
  {
    "id": "blakthorn",
    "name": "Блэкторн",
    "x": 861,
    "y": 656,
    "biome": "plain",
    "region": "Венценосные земли",
    "danger": 4,
    "connections": [
      "quiet_ashes",
      "warm_river_bank",
      "golden_ford",
      "black_tent"
    ]
  },
  {
    "id": "valdek",
    "name": "Вальдек",
    "x": 820,
    "y": 785,
    "biome": "city",
    "region": "Венценосные земли",
    "danger": 2,
    "connections": [
      "burning_hearth_village",
      "warm_river_bank",
      "razlomgrad",
      "heart_rift",
      "secret_valley"
    ]
  },
  {
    "id": "burning_hearth_village",
    "name": "Деревня Пылающего Очага",
    "x": 784,
    "y": 752,
    "biome": "plain",
    "region": "Венценосные земли",
    "danger": 4,
    "connections": [
      "valdek",
      "razlomgrad",
      "secret_valley",
      "golden_ford"
    ]
  },
  {
    "id": "warm_river_bank",
    "name": "Берег Реки Тёплой",
    "x": 866,
    "y": 725,
    "biome": "plain",
    "region": "Венценосные земли",
    "danger": 3,
    "connections": [
      "blakthorn",
      "valdek"
    ]
  },
  {
    "id": "west_a_sterwald_road",
    "name": "Западный тракт Астервальда",
    "x": 614,
    "y": 520,
    "biome": "road",
    "region": "Венценосные земли",
    "danger": 2,
    "connections": [
      "south_a_sterwald_road",
      "asterwald",
      "crow_hills",
      "lanvill",
      "rivenholl"
    ]
  },
  {
    "id": "north_a_sterwald_road",
    "name": "Северный тракт Астервальда",
    "x": 736,
    "y": 413,
    "biome": "road",
    "region": "Венценосные земли",
    "danger": 2,
    "connections": [
      "rivenholl",
      "asterwald",
      "east_a_sterwald_road",
      "roshefort",
      "gray_stone_village"
    ]
  },
  {
    "id": "east_a_sterwald_road",
    "name": "Восточный тракт Астервальда",
    "x": 767,
    "y": 548,
    "biome": "road",
    "region": "Венценосные земли",
    "danger": 2,
    "connections": [
      "asterwald",
      "roshefort",
      "golden_ford",
      "weeping_widows_hill",
      "north_a_sterwald_road"
    ]
  },
  {
    "id": "south_a_sterwald_road",
    "name": "Южный тракт Астервальда",
    "x": 596,
    "y": 601,
    "biome": "road",
    "region": "Венценосные земли",
    "danger": 2,
    "connections": [
      "lanvill",
      "west_a_sterwald_road",
      "eshwood",
      "asterwald",
      "four_winds_crossroad"
    ]
  },
  {
    "id": "mountain_gate",
    "name": "Врата Подгорья",
    "x": 872,
    "y": 279,
    "biome": "mountain",
    "region": "Кхардунские подгорные царства",
    "danger": 4,
    "connections": [
      "iron_bridge_village",
      "khar_west_pass",
      "steel_hall",
      "dead_hooves_pass",
      "khar_gholm"
    ]
  },
  {
    "id": "iron_bridge_village",
    "name": "Деревня Железного моста",
    "x": 610,
    "y": 560,
    "biome": "village",
    "region": "Венценосные Земли",
    "danger": 2,
    "connections": [
      "asterwald_road",
      "blackthorn"
    ],
    "introEventId": "iron_bridge_intro"
  },
  {
    "id": "dead_hooves_pass",
    "name": "Перевал Мёртвых Копыт",
    "x": 776,
    "y": 185,
    "biome": "mountain",
    "region": "Кхардунские подгорные царства",
    "danger": 5,
    "connections": [
      "thunder_echo_hills",
      "mountain_gate"
    ]
  },
  {
    "id": "thunder_echo_hills",
    "name": "Холмы Громовых Эхо",
    "x": 757,
    "y": 108,
    "biome": "mountain",
    "region": "Кхардунские подгорные царства",
    "danger": 4,
    "connections": [
      "dead_hooves_pass"
    ]
  },
  {
    "id": "khar_gholm",
    "name": "Кхар-Гхолм",
    "x": 954,
    "y": 159,
    "biome": "city",
    "region": "Кхардунские подгорные царства",
    "danger": 2,
    "connections": [
      "khar_west_pass",
      "kharadun_beard",
      "steel_hall",
      "mountain_gate",
      "iron_root"
    ]
  },
  {
    "id": "kharadun_beard",
    "name": "Борода Кхардуна",
    "x": 1026,
    "y": 205,
    "biome": "mountain",
    "region": "Кхардунские подгорные царства",
    "danger": 4,
    "connections": [
      "iron_root",
      "khar_gholm",
      "steel_hall",
      "khar_west_pass"
    ]
  },
  {
    "id": "steel_hall",
    "name": "Сталь-Холл",
    "x": 976,
    "y": 279,
    "biome": "mountain",
    "region": "Кхардунские подгорные царства",
    "danger": 3,
    "connections": [
      "dark_smith",
      "deep_forge",
      "kharadun_beard",
      "mountain_gate",
      "khar_gholm"
    ]
  },
  {
    "id": "dark_smith",
    "name": "Тёмный Коваль",
    "x": 1008,
    "y": 304,
    "biome": "mountain",
    "region": "Кхардунские подгорные царства",
    "danger": 4,
    "connections": [
      "steel_hall",
      "deep_forge",
      "khar_east_pass"
    ]
  },
  {
    "id": "deep_forge",
    "name": "Глубокая Кузня",
    "x": 996,
    "y": 347,
    "biome": "mountain",
    "region": "Кхардунские подгорные царства",
    "danger": 5,
    "connections": [
      "dark_smith",
      "red_rill_source",
      "steel_hall"
    ]
  },
  {
    "id": "iron_root",
    "name": "Железный Корень",
    "x": 1087,
    "y": 222,
    "biome": "mountain",
    "region": "Кхардунские подгорные царства",
    "danger": 4,
    "connections": [
      "bloody_granite_west",
      "khar_east_pass",
      "kharadun_beard",
      "khar_gholm"
    ]
  },
  {
    "id": "bloody_granite_west",
    "name": "Кровавый Гранит: запад",
    "x": 1120,
    "y": 255,
    "biome": "mountain",
    "region": "Кхардунские подгорные царства",
    "danger": 6,
    "connections": [
      "iron_root",
      "khar_east_pass",
      "golden_web"
    ]
  },
  {
    "id": "bloody_granite_east",
    "name": "Кровавый Гранит: восток",
    "x": 1320,
    "y": 180,
    "biome": "mountain",
    "region": "Кхардунские подгорные царства",
    "danger": 6,
    "connections": [
      "golden_web"
    ]
  },
  {
    "id": "golden_web",
    "name": "Золотая Паутина",
    "x": 980,
    "y": 360,
    "biome": "underground_city",
    "region": "Кхардунские Подгорные Царства",
    "danger": 2,
    "connections": [
      "iron_spine_pass",
      "deep_roads"
    ],
    "introEventId": "golden_web_intro"
  },
  {
    "id": "stone_shelter",
    "name": "Каменный Приют",
    "x": 1248,
    "y": 360,
    "biome": "mountain",
    "region": "Кхардунские подгорные царства",
    "danger": 3,
    "connections": [
      "golden_web"
    ]
  },
  {
    "id": "khar_west_pass",
    "name": "Западный горный ход",
    "x": 935,
    "y": 240,
    "biome": "mountain",
    "region": "Кхардунские подгорные царства",
    "danger": 4,
    "connections": [
      "mountain_gate",
      "khar_gholm",
      "kharadun_beard"
    ]
  },
  {
    "id": "khar_east_pass",
    "name": "Восточный горный ход",
    "x": 1081,
    "y": 284,
    "biome": "mountain",
    "region": "Кхардунские подгорные царства",
    "danger": 5,
    "connections": [
      "bloody_granite_west",
      "iron_root",
      "dark_smith"
    ]
  },
  {
    "id": "red_rill_source",
    "name": "Исток Кровавого Ручья",
    "x": 944,
    "y": 393,
    "biome": "mountain",
    "region": "Кхардунские подгорные царства",
    "danger": 5,
    "connections": [
      "deep_forge",
      "gray_stone_village",
      "iron_bridge_village"
    ]
  },
  {
    "id": "veysmar",
    "name": "Вейсмар",
    "x": 1033,
    "y": 560,
    "biome": "city",
    "region": "Восточные Марки",
    "danger": 3,
    "connections": [
      "east_dry_steppe_1",
      "raider_camp",
      "east_salt_road",
      "east_dry_steppe_2",
      "east_pass"
    ]
  },
  {
    "id": "east_pass",
    "name": "Кровавый перевал",
    "x": 1172,
    "y": 535,
    "biome": "desert",
    "region": "Восточные Марки",
    "danger": 5,
    "connections": [
      "east_dry_steppe_2",
      "east_dry_steppe_1",
      "veysmar",
      "blood_sand"
    ]
  },
  {
    "id": "hargan",
    "name": "Свободный Порт Харган",
    "x": 1348,
    "y": 459,
    "biome": "city",
    "region": "Восточные Марки",
    "danger": 3,
    "connections": [
      "blood_sand"
    ]
  },
  {
    "id": "blood_sand",
    "name": "Кровавый Песок",
    "x": 1329,
    "y": 532,
    "biome": "desert",
    "region": "Восточные Марки",
    "danger": 6,
    "connections": [
      "hargan",
      "east_pass"
    ]
  },
  {
    "id": "raider_camp",
    "name": "Лагерь Разорителей",
    "x": 964,
    "y": 623,
    "biome": "desert",
    "region": "Восточные Марки",
    "danger": 6,
    "connections": [
      "black_tent",
      "veysmar",
      "quiet_ashes"
    ]
  },
  {
    "id": "black_tent",
    "name": "Чёрный Шатёр",
    "x": 948,
    "y": 697,
    "biome": "desert",
    "region": "Восточные Марки",
    "danger": 5,
    "connections": [
      "broken_oaths_village",
      "raider_camp",
      "blakthorn",
      "east_salt_road"
    ]
  },
  {
    "id": "broken_oaths_village",
    "name": "Деревня Сломанных Клятв",
    "x": 974,
    "y": 743,
    "biome": "desert",
    "region": "Восточные Марки",
    "danger": 5,
    "connections": [
      "black_tent",
      "dust_pit",
      "east_salt_road"
    ]
  },
  {
    "id": "dust_pit",
    "name": "Пыльная Яма",
    "x": 1068,
    "y": 746,
    "biome": "desert",
    "region": "Восточные Марки",
    "danger": 5,
    "connections": [
      "east_salt_road",
      "broken_oaths_village",
      "bandit_stan",
      "cursed_village"
    ]
  },
  {
    "id": "bandit_stan",
    "name": "Стан Разбойников",
    "x": 1162,
    "y": 688,
    "biome": "desert",
    "region": "Восточные Марки",
    "danger": 6,
    "connections": [
      "cursed_village",
      "east_dry_steppe_2",
      "east_salt_road",
      "dust_pit"
    ]
  },
  {
    "id": "cursed_village",
    "name": "Деревня Проклятых",
    "x": 1201,
    "y": 761,
    "biome": "desert",
    "region": "Восточные Марки",
    "danger": 6,
    "connections": [
      "bandit_stan",
      "gallows_hills",
      "dust_pit",
      "forgotten_oasis"
    ]
  },
  {
    "id": "gallows_hills",
    "name": "Холмы Висельников",
    "x": 1210,
    "y": 845,
    "biome": "desert",
    "region": "Восточные Марки",
    "danger": 5,
    "connections": [
      "cursed_village",
      "forgotten_oasis"
    ]
  },
  {
    "id": "forgotten_oasis",
    "name": "Оазис Забытых",
    "x": 1328,
    "y": 841,
    "biome": "desert",
    "region": "Восточные Марки",
    "danger": 3,
    "connections": [
      "gallows_hills",
      "cursed_village"
    ]
  },
  {
    "id": "east_dry_steppe_1",
    "name": "Сухая степь",
    "x": 1091,
    "y": 503,
    "biome": "desert",
    "region": "Восточные Марки",
    "danger": 4,
    "connections": [
      "veysmar",
      "east_pass",
      "east_dry_steppe_2"
    ]
  },
  {
    "id": "east_dry_steppe_2",
    "name": "Пыльные холмы",
    "x": 1168,
    "y": 601,
    "biome": "desert",
    "region": "Восточные Марки",
    "danger": 4,
    "connections": [
      "east_pass",
      "bandit_stan",
      "east_dry_steppe_1",
      "veysmar"
    ]
  },
  {
    "id": "east_salt_road",
    "name": "Соляной тракт",
    "x": 1064,
    "y": 695,
    "biome": "road",
    "region": "Восточные Марки",
    "danger": 4,
    "connections": [
      "dust_pit",
      "bandit_stan",
      "broken_oaths_village",
      "black_tent",
      "veysmar"
    ]
  },
  {
    "id": "riftlands_edge",
    "name": "Край Разломных земель",
    "x": 1103,
    "y": 896,
    "biome": "rift",
    "region": "Разломный край",
    "danger": 7,
    "connections": [
      "dead_voices_bog"
    ]
  },
  {
    "id": "swamp_edge",
    "name": "Край Чёрных Болот",
    "x": 240,
    "y": 947,
    "biome": "swamp",
    "region": "Чёрные Болота",
    "danger": 5,
    "connections": [
      "blood_mires",
      "black_bog_west"
    ]
  },
  {
    "id": "misty_backwater",
    "name": "Туманная Заводь",
    "x": 389,
    "y": 889,
    "biome": "swamp",
    "region": "Чёрные Болота",
    "danger": 5,
    "connections": [
      "blood_mires",
      "nameless_temple",
      "black_bog_north",
      "black_bog_west",
      "black_bog_south"
    ]
  },
  {
    "id": "blood_mires",
    "name": "Кровавые Трясины",
    "x": 339,
    "y": 933,
    "biome": "swamp",
    "region": "Чёрные Болота",
    "danger": 6,
    "connections": [
      "misty_backwater",
      "black_bog_west",
      "nameless_temple",
      "swamp_edge"
    ]
  },
  {
    "id": "nameless_temple",
    "name": "Храм Безымянного",
    "x": 432,
    "y": 959,
    "biome": "swamp",
    "region": "Чёрные Болота",
    "danger": 6,
    "connections": [
      "black_bog_south",
      "misty_backwater",
      "blood_mires",
      "black_bog_west",
      "cursed_thicket"
    ]
  },
  {
    "id": "cursed_thicket",
    "name": "Проклятая Чаща",
    "x": 543,
    "y": 957,
    "biome": "swamp",
    "region": "Чёрные Болота",
    "danger": 6,
    "connections": [
      "black_bog_south",
      "nameless_temple",
      "whispering_blood_lake"
    ]
  },
  {
    "id": "whispering_blood_lake",
    "name": "Озеро Шепчущей Крови",
    "x": 591,
    "y": 837,
    "biome": "swamp",
    "region": "Чёрные Болота",
    "danger": 7,
    "connections": [
      "four_winds_crossroad",
      "flesh_island",
      "black_bog_north",
      "cursed_thicket"
    ]
  },
  {
    "id": "flesh_island",
    "name": "Остров Плоти",
    "x": 661,
    "y": 931,
    "biome": "swamp",
    "region": "Чёрные Болота",
    "danger": 7,
    "connections": [
      "whispering_blood_lake"
    ]
  },
  {
    "id": "razlomgrad",
    "name": "Разломград",
    "x": 740,
    "y": 805,
    "biome": "city",
    "region": "Великий Южный Разлом",
    "danger": 7,
    "connections": [
      "burning_hearth_village",
      "valdek",
      "heart_rift",
      "secret_valley",
      "shadow_rift"
    ]
  },
  {
    "id": "heart_rift",
    "name": "Разлом Сердца",
    "x": 772,
    "y": 886,
    "biome": "rift",
    "region": "Великий Южный Разлом",
    "danger": 9,
    "connections": [
      "shadow_rift",
      "razlomgrad",
      "valdek",
      "bloody_rift"
    ]
  },
  {
    "id": "shadow_rift",
    "name": "Теневой Разлом",
    "x": 784,
    "y": 943,
    "biome": "rift",
    "region": "Великий Южный Разлом",
    "danger": 9,
    "connections": [
      "heart_rift",
      "bloody_rift",
      "razlomgrad",
      "ancient_rift_ruins"
    ]
  },
  {
    "id": "bloody_rift",
    "name": "Кровавый Разлом",
    "x": 778,
    "y": 1007,
    "biome": "rift",
    "region": "Великий Южный Разлом",
    "danger": 9,
    "connections": [
      "shadow_rift",
      "rift_edge",
      "heart_rift"
    ]
  },
  {
    "id": "ancient_rift_ruins",
    "name": "Руины Древнего Разлома",
    "x": 939,
    "y": 928,
    "biome": "rift",
    "region": "Великий Южный Разлом",
    "danger": 8,
    "connections": [
      "bloody_factories",
      "shadow_rift"
    ]
  },
  {
    "id": "dead_voices_bog",
    "name": "Топь Мёртвых Голосов",
    "x": 1053,
    "y": 968,
    "biome": "swamp",
    "region": "Чёрные Болота",
    "danger": 7,
    "connections": [
      "bloody_factories",
      "riftlands_edge"
    ]
  },
  {
    "id": "bloody_factories",
    "name": "Кровавые Заводы",
    "x": 977,
    "y": 982,
    "biome": "rift",
    "region": "Великий Южный Разлом",
    "danger": 8,
    "connections": [
      "ancient_rift_ruins",
      "dead_voices_bog"
    ]
  },
  {
    "id": "rift_edge",
    "name": "Край Разлома",
    "x": 856,
    "y": 1066,
    "biome": "rift",
    "region": "Разломный край",
    "danger": 8,
    "connections": [
      "bloody_rift"
    ]
  },
  {
    "id": "black_bog_north",
    "name": "Северные топи",
    "x": 476,
    "y": 804,
    "biome": "swamp",
    "region": "Чёрные Болота",
    "danger": 5,
    "connections": [
      "four_winds_crossroad",
      "whispering_blood_lake",
      "misty_backwater"
    ]
  },
  {
    "id": "black_bog_west",
    "name": "Западные топи",
    "x": 333,
    "y": 1001,
    "biome": "swamp",
    "region": "Чёрные Болота",
    "danger": 5,
    "connections": [
      "blood_mires",
      "swamp_edge",
      "nameless_temple",
      "misty_backwater",
      "black_bog_south"
    ]
  },
  {
    "id": "black_bog_south",
    "name": "Южные топи",
    "x": 468,
    "y": 1017,
    "biome": "swamp",
    "region": "Чёрные Болота",
    "danger": 6,
    "connections": [
      "nameless_temple",
      "cursed_thicket",
      "black_bog_west",
      "misty_backwater"
    ]
  },
  {
    "id": "coast_fort",
    "name": "Крепость Грейстоун",
    "x": 324,
    "y": 568,
    "biome": "city",
    "region": "Внутреннее море",
    "danger": 2,
    "connections": [
      "forgotten_oaths_forest"
    ]
  },
  {
    "id": "inner_sea_north",
    "name": "Северный морской путь",
    "x": 58,
    "y": 396,
    "biome": "sea",
    "region": "Внутреннее море",
    "danger": 3,
    "connections": [
      "skull_reef",
      "west_cliffs_1"
    ]
  },
  {
    "id": "skull_reef",
    "name": "Черепной Риф",
    "x": 98,
    "y": 541,
    "biome": "sea",
    "region": "Внутреннее море",
    "danger": 6,
    "connections": [
      "anchor_island",
      "inner_sea_north"
    ]
  },
  {
    "id": "anchor_island",
    "name": "Остров Якорей",
    "x": 118,
    "y": 678,
    "biome": "sea",
    "region": "Внутреннее море",
    "danger": 3,
    "connections": [
      "pirate_bay",
      "storm_island",
      "skull_reef"
    ]
  },
  {
    "id": "storm_island",
    "name": "Остров Бури",
    "x": 231,
    "y": 739,
    "biome": "sea",
    "region": "Внутреннее море",
    "danger": 5,
    "connections": [
      "southwest_sea_lane",
      "archipelago_crossing",
      "anchor_island",
      "pirate_bay",
      "coast_south_landing"
    ]
  },
  {
    "id": "pirate_bay",
    "name": "Пиратская Бухта",
    "x": 90,
    "y": 793,
    "biome": "sea",
    "region": "Вольные Архипелаги",
    "danger": 6,
    "connections": [
      "anchor_island",
      "archipelago_crossing",
      "storm_island",
      "tar_key"
    ]
  },
  {
    "id": "tar_key",
    "name": "Смоляной Кей",
    "x": 138,
    "y": 939,
    "biome": "sea",
    "region": "Вольные Архипелаги",
    "danger": 4,
    "connections": [
      "rotten_rocks",
      "archipelago_crossing",
      "pirate_bay"
    ]
  },
  {
    "id": "rotten_rocks",
    "name": "Гнилые Скалы",
    "x": 91,
    "y": 1023,
    "biome": "sea",
    "region": "Вольные Архипелаги",
    "danger": 5,
    "connections": [
      "tar_key"
    ]
  },
  {
    "id": "archipelago_crossing",
    "name": "Архипелаговый переход",
    "x": 212,
    "y": 834,
    "biome": "sea",
    "region": "Вольные Архипелаги",
    "danger": 4,
    "connections": [
      "storm_island",
      "southwest_sea_lane",
      "tar_key",
      "pirate_bay",
      "coast_south_landing"
    ]
  },
  {
    "id": "southwest_sea_lane",
    "name": "Юго-западный морской путь",
    "x": 299,
    "y": 774,
    "biome": "sea",
    "region": "Вольные Архипелаги",
    "danger": 4,
    "connections": [
      "storm_island",
      "coast_south_landing",
      "archipelago_crossing"
    ]
  },
  {
    "id": "coast_south_landing",
    "name": "Южная пристань",
    "x": 386,
    "y": 794,
    "biome": "sea",
    "region": "Внутреннее море",
    "danger": 3,
    "connections": [
      "southwest_sea_lane",
      "storm_island",
      "archipelago_crossing"
    ]
  },
  {
    id: "free_port_hargan",
    name: "Свободный порт Харган",
    x: 910,
    y: 820,
    biome: "port",
    region: "Вольные Архипелаги",
    danger: 3,
    connections: ["inner_sea_route", "smugglers_cove"],
    introEventId: "hargan_intro",
  },
  {
    id: "shaeliri_lower_gate",
    name: "Нижние Врата Ша’Элири",
    x: 820,
    y: 520,
    biome: "underground_gate",
    region: "Подземные Домены Ша’Элири",
    danger: 4,
    connections: ["deep_roads", "black_cavern_road"],
    introEventId: "shaeliri_intro",
  },
  {
    id: "blackthorn",
    name: "Блэкторн",
    x: 690,
    y: 650,
    biome: "frontier_town",
    region: "Восточные Марки",
    danger: 4,
    connections: ["iron_bridge_village", "eastern_marks_road"],
    introEventId: "blackthorn_intro",
  },
  {
    id: "asterwald_road",
    name: "Астервальдский тракт",
    x: 560,
    y: 500,
    biome: "road",
    region: "Венценосные Земли",
    danger: 2,
    connections: ["iron_bridge_village", "silver_wall_east"],
    introEventId: "road_intro",
  },
  {
    id: "inner_sea_route",
    name: "Путь Внутреннего моря",
    x: 850,
    y: 760,
    biome: "sea",
    region: "Внутреннее море",
    danger: 3,
    connections: ["free_port_hargan"],
    introEventId: "inner_sea_intro",
  },
  {
    id: "smugglers_cove",
    name: "Бухта контрабандистов",
    x: 980,
    y: 890,
    biome: "port",
    region: "Вольные Архипелаги",
    danger: 4,
    connections: ["free_port_hargan"],
    introEventId: "smugglers_cove_intro",
  },
  {
    id: "iron_spine_pass",
    name: "Перевал Железного Хребта",
    x: 910,
    y: 420,
    biome: "mountain",
    region: "Кхардунские Подгорные Царства",
    danger: 3,
    connections: ["golden_web"],
    introEventId: "iron_spine_intro",
  },
  {
    id: "deep_roads",
    name: "Глубинные Пути",
    x: 900,
    y: 470,
    biome: "underground",
    region: "Подземный мир",
    danger: 4,
    connections: ["golden_web", "shaeliri_lower_gate"],
    introEventId: "deep_roads_intro",
  },
  {
    id: "black_cavern_road",
    name: "Чёрная каверновая дорога",
    x: 780,
    y: 560,
    biome: "underground",
    region: "Подземные Домены Ша’Элири",
    danger: 5,
    connections: ["shaeliri_lower_gate"],
    introEventId: "black_cavern_intro",
  },
  {
    id: "eastern_marks_road",
    name: "Дорога Восточных Марок",
    x: 760,
    y: 690,
    biome: "road",
    region: "Восточные Марки",
    danger: 4,
    connections: ["blackthorn"],
    introEventId: "eastern_marks_road_intro",
  },
];

export const worldNodeById = Object.fromEntries(
  worldNodes.map((node) => [node.id, node])
);
