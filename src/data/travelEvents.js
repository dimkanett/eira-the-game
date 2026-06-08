export const travelEvents = [
  {
    id: "travel_fog_delay",
    title: "Туман на дороге",
    type: "travel",
    biomes: ["forest", "road", "plain"],
    text: "К полудню дорогу накрывает густой туман. Тропа теряется под ногами, а звуки становятся глухими и чужими.",
    choices: [
      { id: "wait", label: "Не рисковать и переждать", check: null, success: { text: "Ты теряешь время, но избегаешь опасности.", effects: [{ type: "fatigue", value: 1 }, { type: "travel_delay", days: 1 }] } },
      { id: "push_forward", label: "Идти дальше на слух", check: { stat: "perception", dc: 12 }, success: { text: "Ты находишь дорогу сквозь туман.", effects: [{ type: "fatigue", value: 1 }] }, fail: { text: "Ты сбиваешься с пути и теряешь почти весь день.", effects: [{ type: "fatigue", value: 2 }, { type: "travel_delay", days: 1 }] } },
    ],
  },
  {
    id: "travel_broken_crossing",
    title: "Сломанная переправа",
    type: "travel",
    biomes: ["river", "swamp", "plain", "road"],
    text: "Старая переправа просела: доски мокрые, верёвки перетёрты, а вода шумит слишком близко.",
    choices: [
      { id: "find_safe_path", label: "Искать безопасный обход", check: { stat: "perception", dc: 12 }, success: { text: "Ты находишь мелкое место ниже по течению.", effects: [{ type: "fatigue", value: 1 }] }, fail: { text: "Поиск обхода отнимает почти весь день.", effects: [{ type: "fatigue", value: 1 }, { type: "travel_delay", days: 1 }] } },
      { id: "cross_fast", label: "Перебраться сразу", check: { stat: "agility", dc: 13 }, success: { text: "Ты быстро проходишь опасный участок.", effects: [{ type: "trace", value: 1 }] }, fail: { text: "Нога срывается с мокрой доски, и переправа больно бьёт по рёбрам.", effects: [{ type: "hp", target: "hero", value: -2 }, { type: "fatigue", value: 1 }] } },
    ],
  },
  {
    id: "travel_bandit_traces",
    title: "Следы разбойников",
    type: "travel",
    biomes: ["road", "forest", "plain"],
    text: "На мягкой земле видны свежие следы. Кто-то недавно наблюдал за дорогой из укрытия.",
    choices: [
      { id: "go_around", label: "Обойти подозрительное место", check: { stat: "perception", dc: 11 }, success: { text: "Ты обходишь засаду по старой звериной тропе.", effects: [{ type: "fatigue", value: 1 }] }, fail: { text: "Обход путает следы, но отнимает много времени.", effects: [{ type: "trace", value: 1 }, { type: "travel_delay", days: 1 }] } },
      { id: "counter_ambush", label: "Самому устроить засаду", check: { stat: "agility", dc: 13 }, success: { text: "Ты замечаешь наблюдателя первым, и он исчезает без боя.", effects: [{ type: "trace", value: -1 }] }, fail: { text: "Кусты оказываются пустыми, а настоящий удар приходит сбоку.", effects: [{ type: "hp", target: "hero", value: -3 }, { type: "trace", value: 1 }] } },
    ],
  },
  {
    id: "travel_night_storm",
    title: "Ночная буря",
    type: "travel",
    biomes: ["mountain", "plain", "sea", "forest"],
    text: "Ночью небо раскалывается громом. Дождь бьёт в лицо, а дорога превращается в поток грязи и камней.",
    choices: [
      { id: "make_camp", label: "Разбить укрытый лагерь", check: { stat: "will", dc: 11 }, success: { text: "Укрытие держится до рассвета, хотя сон выходит тяжёлым.", effects: [{ type: "fatigue", value: 1 }, { type: "travel_delay", days: 1 }] }, fail: { text: "Ветер рвёт укрытие, и ночь выматывает тебя.", effects: [{ type: "fatigue", value: 2 }, { type: "travel_delay", days: 1 }] } },
      { id: "walk_through", label: "Продолжать путь", check: { stat: "will", dc: 14 }, success: { text: "Ты проходишь сквозь бурю и не теряешь дорогу.", effects: [{ type: "fatigue", value: 1 }] }, fail: { text: "Буря сбивает с ног и оставляет синяки.", effects: [{ type: "hp", target: "hero", value: -2 }, { type: "fatigue", value: 2 }] } },
    ],
  },
  {
    id: "travel_wounded_traveler",
    title: "Раненый путник",
    type: "travel",
    biomes: ["road", "plain", "forest"],
    text: "На обочине лежит раненый путник. Он просит воды и шепчет, что видел опасность впереди.",
    choices: [
      { id: "help", label: "Помочь путнику", check: { stat: "charisma", dc: 10 }, success: { text: "Путник благодарит тебя и делится слухом о далёком месте.", effects: [{ type: "reputation", target: "current_region", value: 1 }, { type: "reveal_random_city" }, { type: "travel_delay", days: 1 }] }, fail: { text: "Ты помогаешь, но не понимаешь его сбивчивые слова. День уходит на перевязки.", effects: [{ type: "fatigue", value: 1 }, { type: "travel_delay", days: 1 }] } },
      { id: "ignore", label: "Пройти мимо", check: null, success: { text: "Ты ускоряешь шаг, но чужой взгляд долго остаётся за спиной.", effects: [{ type: "trace", value: 1 }, { type: "reputation", target: "current_region", value: -1 }] } },
    ],
  },
  {
    id: "travel_beast_on_path",
    title: "Зверь на тропе",
    type: "travel",
    biomes: ["forest", "swamp", "mountain"],
    text: "На тропе стоит крупный зверь. Он не нападает сразу, но и уходить не собирается.",
    choices: [
      { id: "hold_ground", label: "Не отступать", check: { stat: "will", dc: 12 }, success: { text: "Зверь рычит, но уступает дорогу.", effects: [{ type: "trace", value: 1 }] }, fail: { text: "Зверь бросается вперёд и сбивает тебя с ног.", effects: [{ type: "hp", target: "hero", value: -3 }, { type: "fatigue", value: 1 }] } },
      { id: "dodge_away", label: "Обойти рывком", check: { stat: "agility", dc: 13 }, success: { text: "Ты обходишь зверя по камням и уходишь без раны.", effects: [{ type: "fatigue", value: 1 }] }, fail: { text: "Зверь успевает достать тебя лапой.", effects: [{ type: "hp", target: "hero", value: -3 }] } },
    ],
  },
];
