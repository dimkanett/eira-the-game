export const events = {
  city: [
    { id: "city_square_rumors", title: "Городская площадь", biome: "city", text: "Шум, торг, слухи и строгие взгляды стражи смешиваются в один городской гул.", choices: [{ id: "gather_rumors", label: "Собрать слухи", check: { stat: "charisma", dc: 10 }, success: { text: "Ты узнаёшь о дальнем месте. Оно отмечено на карте, но путь к нему неизвестен.", effects: [{ type: "reveal_random_city" }] }, fail: { text: "Тебя принимают за чужака, и разговоры быстро стихают.", effects: [{ type: "reputation", target: "current_region", value: -1 }] } }] },
  ],
  road: [{ id: "road_old_tracks", title: "Старые следы", biome: "road", text: "На дороге видны следы чужого отряда.", choices: [{ id: "follow_tracks", label: "Осмотреть следы", check: { stat: "perception", dc: 11 }, success: { text: "Ты обходишь опасный участок и сам оставляешь меньше следов.", effects: [{ type: "trace", value: -1 }] }, fail: { text: "Ты теряешь время и оставляешь заметный след.", effects: [{ type: "fatigue", value: 1 }, { type: "trace", value: 1 }] } }] }],
  forest: [{ id: "forest_wolves", title: "Глаза в чаще", biome: "forest", text: "Между стволами вспыхивают волчьи глаза.", choices: [{ id: "avoid_wolves", label: "Тихо отступить", check: { stat: "agility", dc: 13 }, success: { text: "Ты исчезаешь в тени деревьев.", effects: [{ type: "trace", value: 1 }] }, fail: { text: "Волки бросаются следом. Бой пока включён как тестовая архитектура.", effects: [{ type: "hp", target: "hero", value: -3 }, { type: "start_combat", enemyGroupId: "wolves_01" }] } }] }],
  ruins: [{ id: "ruins_moon_script", title: "Лунные письмена", biome: "ruins", text: "На камнях проступают древние знаки.", choices: [{ id: "read_script", label: "Прочесть письмена", check: { stat: "intellect", dc: 12 }, success: { text: "Ты находишь фрагмент старого знания.", effects: [{ type: "add_lore", fragmentId: "ancient_temple_01" }] }, fail: { text: "Знаки ускользают, а холод камня вытягивает силы.", effects: [{ type: "fatigue", value: 1 }] } }] }],
  temple: [{ id: "temple_blessing", title: "Тихое святилище", biome: "temple", text: "Лунный свет ложится на ладони.", choices: [{ id: "pray", label: "Сосредоточиться", check: { stat: "will", dc: 10 }, success: { text: "Ты чувствуешь благословение и находишь запись о Лунном Троне.", effects: [{ type: "fatigue", value: -1 }, { type: "add_lore", fragmentId: "moon_throne_01" }] }, fail: { text: "Молитва не складывается в слова.", effects: [{ type: "trace", value: 1 }] } }] }],
  wilds: [{ id: "wilds_bad_weather", title: "Холодный дождь", biome: "wilds", text: "Серебряная вода становится ледяной стеной.", choices: [{ id: "push_forward", label: "Идти дальше", check: { stat: "will", dc: 12 }, success: { text: "Ты проходишь сквозь дождь без потерь.", effects: [] }, fail: { text: "Холод выматывает тебя.", effects: [{ type: "fatigue", value: 1 }, { type: "hp", target: "hero", value: -2 }] } }] }],
  wall: [{ id: "wall_patrol", title: "Патруль у стены", biome: "wall", text: "Патруль требует назвать цель пути.", choices: [{ id: "answer_patrol", label: "Говорить спокойно", check: { stat: "charisma", dc: 12 }, success: { text: "Тебя пропускают без лишних вопросов.", effects: [{ type: "reputation", target: "current_region", value: 1 }] }, fail: { text: "Патруль запоминает твоё лицо.", effects: [{ type: "trace", value: 1 }] } }] }],
  rift: [{ id: "rift_whisper", title: "Шёпот разлома", biome: "rift", text: "Воздух дрожит, будто мир вспоминает боль.", choices: [{ id: "listen", label: "Прислушаться", check: { stat: "will", dc: 15 }, success: { text: "Ты получаешь редкий фрагмент знания о разломах.", effects: [{ type: "add_lore", fragmentId: "southern_rift_01" }] }, fail: { text: "Шёпот ранит разум и тело.", effects: [{ type: "hp", target: "hero", value: -4 }, { type: "fatigue", value: 1 }] } }] }],
  sea: [],
  village: [
    {
      id: "village_closed_shutters",
      title: "Закрытые ставни",
      biome: "village",
      text: "Ставни закрываются раньше заката. Люди делают вид, что не слышат шаги за околицей.",
      choices: [
        {
          id: "ask_villagers",
          label: "Расспросить жителей",
          check: { stat: "charisma", dc: 10 },
          success: {
            text: "Один старик шепчет тебе о дороге, где ночью звенит железо.",
            effects: [{ type: "reveal_node", nodeId: "asterwald_road" }],
          },
          fail: {
            text: "Тебе не открывают. Здесь чужаков боятся больше, чем тьмы.",
            effects: [{ type: "trace", value: 1 }],
          },
        },
      ],
    },
  ],
  port: [
    {
      id: "port_black_sails",
      title: "Чёрные паруса",
      biome: "port",
      text: "В гавани спорят о корабле, который вошёл в туман и вернулся без команды.",
      choices: [
        {
          id: "listen_port_rumors",
          label: "Слушать портовые слухи",
          check: { stat: "perception", dc: 10 },
          success: {
            text: "Ты слышишь название бухты, которую моряки стараются не произносить.",
            effects: [{ type: "reveal_node", nodeId: "smugglers_cove" }],
          },
          fail: {
            text: "Слухи рассыпаются в пьяный смех.",
            effects: [{ type: "fatigue", value: 1 }],
          },
        },
      ],
    },
  ],
  underground_city: [
    {
      id: "underground_city_debt",
      title: "Долговая клятва",
      biome: "underground_city",
      text: "В подземном городе спорят тише, чем наверху молятся. Здесь каждое слово может стать долгом.",
      choices: [
        {
          id: "read_contract",
          label: "Прочесть старый договор",
          check: { stat: "intellect", dc: 11 },
          success: {
            text: "Ты замечаешь строку, написанную кровными чернилами.",
            effects: [{ type: "personal_decay", value: 1 }],
          },
          fail: {
            text: "Смысл ускользает, но подпись будто смотрит на тебя.",
            effects: [{ type: "trace", value: 1 }],
          },
        },
      ],
    },
  ],
  underground_gate: [
    {
      id: "underground_gate_watch",
      title: "Стража нижних ворот",
      biome: "underground_gate",
      text: "Стражи не спрашивают имени. Они смотрят, как ты держишь спину.",
      choices: [
        {
          id: "walk_confidently",
          label: "Идти уверенно",
          check: { stat: "will", dc: 11 },
          success: { text: "Тебя пропускают без слов.", effects: [] },
          fail: {
            text: "Один из стражей запоминает твою слабость.",
            effects: [{ type: "trace", value: 1 }],
          },
        },
      ],
    },
  ],
  frontier_town: [
    {
      id: "frontier_town_stare",
      title: "Взгляд Блэкторна",
      biome: "frontier_town",
      text: "На улицах смотрят не в лицо, а на руки. Здесь важно, как быстро ты достанешь клинок.",
      choices: [
        {
          id: "avoid_trouble",
          label: "Не искать конфликта",
          check: { stat: "will", dc: 10 },
          success: { text: "Ты проходишь мимо чужой драки и сохраняешь силы.", effects: [] },
          fail: {
            text: "Чужая драка всё равно задевает тебя краем.",
            effects: [{ type: "hp", target: "hero", value: -2 }],
          },
        },
      ],
    },
  ],
  mountain: [
    {
      id: "mountain_iron_wind",
      title: "Железный ветер",
      biome: "mountain",
      text: "Ветер в горах звучит так, будто кто-то точит клинок о камень.",
      choices: [
        {
          id: "push_through_wind",
          label: "Идти сквозь ветер",
          check: { stat: "will", dc: 12 },
          success: { text: "Ты проходишь перевал без потерь.", effects: [] },
          fail: { text: "Ветер выматывает тебя.", effects: [{ type: "fatigue", value: 1 }] },
        },
      ],
    },
  ],
  underground: [
    {
      id: "underground_echo",
      title: "Эхо глубин",
      biome: "underground",
      text: "В темноте шаги звучат дважды. Второе эхо не принадлежит тебе.",
      choices: [
        {
          id: "listen_echo",
          label: "Прислушаться",
          check: { stat: "perception", dc: 12 },
          success: { text: "Ты понимаешь, что эхо идёт из бокового прохода.", effects: [] },
          fail: { text: "Эхо будто входит тебе под кожу.", effects: [{ type: "personal_decay", value: 1 }] },
        },
      ],
    },
  ],
  intro: [
    {
      id: "iron_bridge_intro",
      title: "Первый шёпот у моста",
      biome: "village",
      text: "Над Железным мостом висит холодный туман. Река под ним течёт слишком тихо, будто боится разбудить то, что лежит на дне.",
      choices: [
        {
          id: "inspect_bridge",
          label: "Осмотреть мост",
          success: {
            text: "На старом железе ты находишь знак, похожий на трещину в круге.",
            effects: [
              { type: "world_decay", value: 1 },
              { type: "reveal_node", nodeId: "asterwald_road" },
            ],
          },
        },
        {
          id: "return_to_village",
          label: "Уйти в деревню",
          success: {
            text: "Люди закрывают ставни, когда ты проходишь мимо. Здесь уже знают, что ночами лучше не смотреть на реку.",
            effects: [{ type: "trace", value: 1 }],
          },
        },
      ],
    },
    {
      id: "silverglade_intro",
      title: "Красота под серебром",
      biome: "city",
      text: "Сильверглейд сияет холодным светом. Всё здесь слишком прекрасно, слишком тихо и слишком правильно.",
      choices: [
        {
          id: "go_to_platforms",
          label: "Пойти к древним платформам",
          success: {
            text: "Старые деревья скрипят, хотя ветра нет. Где-то высоко плачет статуя.",
            effects: [{ type: "reveal_node", nodeId: "moon_road" }],
          },
        },
        {
          id: "listen_to_young_elves",
          label: "Слушать разговоры молодых эльфов",
          success: {
            text: "Они говорят об Обновлении так, будто это праздник. Но один из них дрожит.",
            effects: [{ type: "personal_decay", value: 1 }],
          },
        },
      ],
    },
    {
      id: "hargan_intro",
      title: "Цена свободного порта",
      biome: "port",
      text: "Свободный порт Харган пахнет солью, дымом, пряностями и страхом. Здесь продают всё, что не смогли удержать другие.",
      choices: [
        {
          id: "ask_sailors",
          label: "Расспросить моряков о Разломах",
          success: {
            text: "Один моряк говорит, что видел остров, которого не было на карте. Второй сразу велит ему заткнуться.",
            effects: [{ type: "reveal_node", nodeId: "inner_sea_route" }],
          },
        },
        {
          id: "buy_dirty_truth",
          label: "Купить информацию у контрабандиста",
          success: {
            text: "Информация оказывается правдивой, но продавец слишком долго держит твою руку.",
            effects: [
              { type: "sin", value: 1 },
              { type: "reveal_node", nodeId: "smugglers_cove" },
            ],
          },
        },
      ],
    },
    {
      id: "golden_web_intro",
      title: "Долг под камнем",
      biome: "underground_city",
      text: "Золотая Паутина гудит молотами, счётными машинами и тихими клятвами. Здесь даже пепел заносят в долговые книги.",
      choices: [
        {
          id: "go_to_forges",
          label: "Пойти к кузням",
          success: {
            text: "В огне на мгновение появляется лицо, похожее на твоё, только старше и злее.",
            effects: [{ type: "reveal_node", nodeId: "iron_spine_pass" }],
          },
        },
        {
          id: "check_debt_records",
          label: "Проверить долговые записи",
          success: {
            text: "Одно имя в книге выцарапано так глубоко, будто писарь пытался убить бумагу.",
            effects: [
              { type: "personal_decay", value: 1 },
              { type: "reveal_node", nodeId: "deep_roads" },
            ],
          },
        },
      ],
    },
    {
      id: "shaeliri_intro",
      title: "Врата нижних домов",
      biome: "underground_gate",
      text: "Нижние Врата Ша’Элири открываются без скрипа. Тот, кто смазал петли, явно хотел, чтобы пленники не слышали, когда за ними приходят.",
      choices: [
        {
          id: "lie_to_guard",
          label: "Солгать стражнице о приказе дома",
          check: { stat: "charisma", dc: 10 },
          success: {
            text: "Она улыбается. Не потому что поверила. Потому что ложь была достаточно красивой.",
            effects: [
              { type: "sin", value: 1 },
              { type: "personal_decay", value: 1 },
            ],
          },
          fail: {
            text: "Она улыбается всё равно. Но теперь эта улыбка принадлежит не тебе.",
            effects: [
              { type: "trace", value: 1 },
              { type: "personal_decay", value: 1 },
            ],
          },
        },
        {
          id: "go_to_surface",
          label: "Идти к поверхности",
          success: {
            text: "Позади остаётся подземный смех. Впереди — сырой воздух и чужое небо.",
            effects: [{ type: "reveal_node", nodeId: "black_cavern_road" }],
          },
        },
      ],
    },
    {
      id: "blackthorn_intro",
      title: "Город чёрного терновника",
      biome: "frontier_town",
      text: "Блэкторн встречает тебя грязью, дымом и взглядом людей, которые давно решили: первыми выживают не праведные, а быстрые.",
      choices: [
        {
          id: "hide_weapon",
          label: "Спрятать оружие",
          success: {
            text: "На улице это считают слабостью. Но один старик у ворот едва заметно кивает.",
            effects: [{ type: "reputation", target: "Восточные Марки", value: 1 }],
          },
        },
        {
          id: "show_blade",
          label: "Держать клинок на виду",
          success: {
            text: "Люди отводят глаза. Это проще, чем уважение, но почти так же полезно.",
            effects: [
              { type: "sin", value: 1 },
              { type: "trace", value: 1 },
            ],
          },
        },
      ],
    },
  ],
};
