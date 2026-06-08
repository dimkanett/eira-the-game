const NODES = [
  {
    "id": "silverglade",
    "name": "Сильверглейд / Лунный Трон",
    "x": 266,
    "y": 166,
    "biome": "city",
    "region": "Серебряный Предел",
    "danger": 1,
    "connections": [
      "ancient_temple_ruins",
      "eternal_moon_temple",
      "moon_road",
      "silver_tears_forest"
    ]
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
      "eternal_mist_hills",
      "silverglade"
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
      "silver_cascades",
      "silverglade",
      "west_cliffs_1"
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
      "silver_wall_west"
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
      "ancient_temple_ruins",
      "north_coast_1",
      "old_forest"
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
      "eternal_mist_hills"
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
      "renewal_grove"
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
      "renewal_grove",
      "tenebris_forest_edge"
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
      "mirven",
      "moon_meadow",
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
      "mirven",
      "moon_road",
      "whispering_trees_valley"
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
      "silverglade"
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
      "moon_meadow",
      "tenebris_forest_edge"
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
      "north_forest",
      "tenebris_forest_deep",
      "whispering_trees_valley"
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
      "tenebris_forest_edge"
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
      "moon_meadow",
      "moon_road",
      "seven_stars_glade",
      "silverka_ford",
      "vaitfordj"
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
      "silver_wall_east"
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
      "silver_cascades",
      "silver_wall_east",
      "south_forest_path"
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
      "seven_stars_glade",
      "silver_wall_west"
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
      "mirven",
      "rivenholl"
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
      "silverka_ford",
      "vaitfordj"
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
      "silver_wall_west",
      "vaitfordj"
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
      "eternal_mist_hills",
      "inner_sea_north"
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
      "inner_sea_north",
      "silver_tears_forest",
      "skull_reef"
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
      "gray_stone_village",
      "mountain_gate",
      "north_a_sterwald_road",
      "silverka_ford"
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
      "mirven",
      "red_wine_village",
      "south_forest_path",
      "west_a_sterwald_road"
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
      "coast_fort",
      "three_names_castle",
      "vaitfordj"
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
      "lanvill",
      "red_wine_village"
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
      "black_bog_west",
      "eshwood",
      "lanvill"
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
      "coast_south_landing",
      "forgotten_oaths_forest",
      "four_winds_crossroad",
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
      "eshwood",
      "lanvill"
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
      "forgotten_oaths_forest",
      "four_winds_crossroad",
      "south_a_sterwald_road",
      "valdek"
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
      "asterwald",
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
      "golden_river_bank",
      "north_a_sterwald_road",
      "south_a_sterwald_road",
      "west_a_sterwald_road"
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
      "golden_river_bank",
      "south_a_sterwald_road"
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
    "connections": []
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
      "east_a_sterwald_road",
      "quiet_ashes",
      "valdek",
      "veysmar",
      "weeping_widows_hill"
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
      "red_rill_source",
      "rivenholl",
      "weeping_widows_hill"
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
      "gray_stone_village",
      "roshefort"
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
      "roshefort"
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
      "valdek"
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
      "blakthorn",
      "burning_hearth_village",
      "eshwood",
      "roshefort",
      "warm_river_bank"
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
      "warm_river_bank"
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
      "burning_hearth_village",
      "riftlands_edge",
      "swamp_edge",
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
      "asterwald",
      "vaitfordj"
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
      "asterwald",
      "rivenholl"
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
      "roshefort"
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
      "asterwald",
      "eshwood",
      "secret_valley"
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
      "red_rill_source",
      "rivenholl"
    ]
  },
  {
    "id": "iron_bridge_village",
    "name": "Деревня Железного Моста",
    "x": 862,
    "y": 337,
    "biome": "mountain",
    "region": "Кхардунские подгорные царства",
    "danger": 3,
    "connections": [
      "khar_west_pass",
      "mountain_gate"
    ]
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
      "khar_west_pass",
      "thunder_echo_hills"
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
      "dead_hooves_pass",
      "khar_gholm"
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
      "iron_root",
      "khar_west_pass",
      "kharadun_beard",
      "thunder_echo_hills"
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
      "khar_gholm",
      "steel_hall"
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
      "deep_forge",
      "kharadun_beard"
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
    "connections": []
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
      "khar_east_pass",
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
      "bloody_granite_east",
      "iron_root"
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
      "bloody_granite_west"
    ]
  },
  {
    "id": "golden_web",
    "name": "Золотая Паутина",
    "x": 1207,
    "y": 281,
    "biome": "mountain",
    "region": "Кхардунские подгорные царства",
    "danger": 5,
    "connections": [
      "khar_east_pass",
      "stone_shelter"
    ]
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
      "golden_web",
      "hargan"
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
      "dead_hooves_pass",
      "iron_bridge_village",
      "khar_gholm"
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
      "deep_forge",
      "east_pass",
      "golden_web"
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
      "east_pass",
      "gray_stone_village",
      "mountain_gate"
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
      "east_pass",
      "raider_camp",
      "roshefort"
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
      "hargan",
      "khar_east_pass",
      "red_rill_source",
      "veysmar"
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
      "blood_sand",
      "east_pass",
      "stone_shelter"
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
      "east_dry_steppe_2",
      "hargan"
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
      "veysmar"
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
      "raider_camp"
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
      "dust_pit"
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
      "broken_oaths_village",
      "cursed_village",
      "east_salt_road"
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
    "connections": []
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
      "dust_pit",
      "gallows_hills"
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
      "gallows_hills"
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
      "east_dry_steppe_2",
      "veysmar"
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
      "blood_sand",
      "east_dry_steppe_1"
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
      "riftlands_edge"
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
      "east_salt_road",
      "rift_edge",
      "warm_river_bank"
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
      "black_bog_north",
      "misty_backwater",
      "warm_river_bank"
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
      "black_bog_west",
      "blood_mires",
      "swamp_edge"
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
      "nameless_temple"
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
      "blood_mires",
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
      "cursed_thicket",
      "flesh_island"
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
      "razlomgrad",
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
      "ancient_rift_ruins",
      "black_bog_north",
      "flesh_island",
      "heart_rift"
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
      "razlomgrad",
      "shadow_rift"
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
      "bloody_rift",
      "heart_rift"
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
      "shadow_rift"
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
      "dead_voices_bog",
      "razlomgrad"
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
      "ancient_rift_ruins",
      "bloody_factories"
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
      "dead_voices_bog",
      "rift_edge"
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
      "bloody_factories",
      "riftlands_edge"
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
      "razlomgrad",
      "swamp_edge"
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
      "coast_south_landing",
      "forgotten_oaths_forest",
      "misty_backwater"
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
    "connections": []
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
      "anchor_island",
      "inner_sea_north",
      "red_wine_village",
      "storm_island"
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
      "anchor_island",
      "coast_fort",
      "north_coast_1",
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
      "inner_sea_north",
      "pirate_bay",
      "storm_island",
      "west_cliffs_1"
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
      "coast_fort",
      "inner_sea_north",
      "pirate_bay",
      "storm_island"
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
      "anchor_island",
      "coast_fort",
      "pirate_bay",
      "skull_reef"
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
      "skull_reef",
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
      "pirate_bay",
      "rotten_rocks"
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
      "archipelago_crossing",
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
      "rotten_rocks",
      "southwest_sea_lane"
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
      "archipelago_crossing",
      "coast_south_landing"
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
      "black_bog_west",
      "lanvill",
      "southwest_sea_lane"
    ]
  }
];
