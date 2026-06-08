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
  story: [
    {
      id: "emma_iron_bridge_village_hub",
      title: "Деревня Железного моста",
      biome: "village",
      text: "Деревня живёт почти обычной жизнью. У кузницы звенит молот, у колодца спорят женщины, за домами кричат гуси. Только старый мост за рекой будто ждёт, когда на него снова посмотрят.",
      choices: [
        {
          id: "hub_go_to_bridge",
          label: "Вернуться к мосту",
          success: {
            text: "Эмма снова идёт к старому железному мосту.",
            effects: [],
            nextEventId: "emma_intro_bridge_whisper",
          },
        },
        {
          id: "hub_talk_to_elder",
          label: "Поговорить со старостой Бренном",
          success: {
            text: "Эмма идёт к дому старосты.",
            effects: [],
            nextEventId: "emma_elder_brenn_talk",
          },
        },
        {
          id: "hub_find_timo",
          label: "Найти мальчика Тимо",
          success: {
            text: "Эмма находит Тимо за домом прачки.",
            effects: [],
            nextEventId: "emma_timo_testimony",
          },
        },
        {
          id: "hub_visit_olma",
          label: "Зайти к кузнецу Ольме",
          success: {
            text: "Эмма идёт к кузнице.",
            effects: [],
            nextEventId: "emma_olma_black_iron",
          },
        },
        {
          id: "hub_go_under_bridge",
          label: "Спуститься под мост",
          success: {
            text: "Эмма спускается к старым опорам моста.",
            effects: [],
            nextEventId: "emma_bridge_storehouse",
          },
        },
        {
          id: "hub_leave_village",
          label: "Покинуть деревню",
          success: {
            text: "Эмма оставляет деревню за спиной. Старый мост тихо звенит на ветру, почти как обычный.",
            effects: [
              { type: "reveal_node", nodeId: "asterwald_road" },
              { type: "reveal_node", nodeId: "blackthorn" },
            ],
          },
        },
      ],
    },
    {
      id: "emma_intro_bridge_whisper",
      title: "Первый шёпот у моста",
      biome: "village",
      text: "Утро начинается почти обычно. Мельница скрипит, у кузницы спорят о цене угля, кто-то ругает гусей у колодца. Только мост молчит. Обычно старое железо звенит на ветру. Сегодня — нет. Когда Эмма проходит мимо реки, под настилом тихо стучит одинокий звук. Раз. Пауза. Раз. Пауза. Будто кто-то снизу проверяет, слышат ли его наверху.",
      choices: [
        {
          id: "inspect_bridge",
          label: "Осмотреть мост",
          check: { stat: "perception", dc: 9 },
          success: {
            text: "Эмма замечает между заклёпками тонкую чёрную линию. Не трещину — скорее знак, слишком ровный для случайной ржавчины.",
            effects: [
              { type: "reveal_node", nodeId: "asterwald_road" },
              { type: "set_flag", flag: "emma_saw_black_line" },
              { type: "journal_entry", text: "Эмма заметила странную чёрную линию на железе моста." },
            ],
            nextEventId: "emma_iron_bridge_village_hub",
          },
          fail: {
            text: "На первый взгляд мост выглядит старым, но обычным. Только звук снизу повторяется ещё раз — тише, будто с насмешкой.",
            effects: [{ type: "trace", value: 1 }],
            nextEventId: "emma_iron_bridge_village_hub",
          },
        },
        {
          id: "ask_villagers",
          label: "Расспросить жителей",
          check: { stat: "charisma", dc: 10 },
          success: {
            text: "Люди отвечают неохотно, но одна прачка крестится и говорит, что ночью мост “позвал” мальчика Тимо.",
            effects: [
              { type: "set_flag", flag: "emma_heard_about_timo" },
              { type: "journal_entry", text: "Жители говорят, что ночью мост звал мальчика Тимо." },
            ],
            nextEventId: "emma_iron_bridge_village_hub",
          },
          fail: {
            text: "Разговоры обрываются. В деревне не любят тех, кто вытаскивает страх на свет.",
            effects: [{ type: "reputation", target: "current_region", value: -1 }],
            nextEventId: "emma_iron_bridge_village_hub",
          },
        },
        {
          id: "go_to_elder",
          label: "Пойти к старосте",
          success: {
            text: "Староста Бренн встречает Эмму у порога и сразу понимает, зачем она пришла. Это видно по тому, как он не смотрит в сторону моста.",
            effects: [],
            nextEventId: "emma_elder_brenn_talk",
          },
        },
        {
          id: "ignore_and_leave",
          label: "Не вмешиваться и уйти к тракту",
          success: {
            text: "Эмма уходит от моста. За спиной железо тихо звенит. Не громко. Не угрожающе. Почти обиженно.",
            effects: [
              { type: "world_decay", value: 1 },
              { type: "reveal_node", nodeId: "asterwald_road" },
              { type: "set_flag", flag: "iron_bridge_unresolved" },
              { type: "journal_entry", text: "Эмма решила не вмешиваться в странность у Железного моста." },
            ],
          },
        },
      ],
    },
    {
      id: "emma_elder_brenn_talk",
      title: "Разговор со старостой",
      biome: "village",
      text: "В доме старосты пахнет сухими травами, старой бумагой и печным дымом. Бренн закрывает дверь раньше, чем Эмма успевает сесть. — Не надо будить деревню раньше времени, — говорит он. — Мост старый. Старые вещи иногда звучат. На столе перед ним лежит связка ключей. Один ключ потемнел так, будто его держали в огне.",
      choices: [
        {
          id: "press_elder_truth",
          label: "Потребовать правду",
          check: { stat: "will", dc: 11 },
          success: {
            text: "Бренн долго молчит. Потом снимает с кольца чёрный ключ и кладёт на стол. “Под мостом есть старая кладовая. Её не открывали с тех пор, как исчез Радан.”",
            effects: [
              { type: "add_item", itemId: "black_bridge_key" },
              { type: "set_flag", flag: "emma_has_bridge_key" },
              { type: "journal_entry", text: "Староста дал Эмме ключ от старой кладовой под мостом." },
            ],
            nextEventId: "emma_iron_bridge_village_hub",
          },
          fail: {
            text: "Бренн становится жёстче. “Правда иногда убивает быстрее беды. Иди домой, Эмма.”",
            effects: [
              { type: "trace", value: 1 },
              { type: "set_flag", flag: "brenn_refused_key" },
            ],
            nextEventId: "emma_iron_bridge_village_hub",
          },
        },
        {
          id: "speak_calmly",
          label: "Говорить спокойно",
          check: { stat: "charisma", dc: 10 },
          success: {
            text: "Бренн устало прикрывает глаза. “Я не хочу второй пропажи. Если полезешь туда — не одна.” Он разрешает поговорить с Тимо и Ольмой.",
            effects: [
              { type: "reveal_npc_clue", npcId: "npc_timo" },
              { type: "reveal_npc_clue", npcId: "npc_olma" },
              { type: "journal_entry", text: "Бренн советует поговорить с Тимо и кузнецом Ольмой." },
            ],
            nextEventId: "emma_iron_bridge_village_hub",
          },
          fail: {
            text: "Староста отвечает вежливо, но пусто. Он умеет закрывать разговоры лучше, чем двери.",
            effects: [{ type: "reputation", target: "current_region", value: -1 }],
            nextEventId: "emma_iron_bridge_village_hub",
          },
        },
        {
          id: "steal_key",
          label: "Попробовать украсть ключ",
          check: { stat: "agility", dc: 13 },
          success: {
            text: "Ключ исчезает в рукаве Эммы. Бренн ничего не замечает — или делает вид, что не замечает.",
            effects: [
              { type: "add_item", itemId: "black_bridge_key" },
              { type: "sin", value: 1 },
              { type: "set_flag", flag: "emma_stole_bridge_key" },
              { type: "journal_entry", text: "Эмма украла чёрный ключ у старосты." },
            ],
            nextEventId: "emma_iron_bridge_village_hub",
          },
          fail: {
            text: "Бренн перехватывает её взгляд и накрывает ключ ладонью. “Не начинай путь с этого.”",
            effects: [
              { type: "sin", value: 1 },
              { type: "reputation", target: "current_region", value: -1 },
            ],
            nextEventId: "emma_iron_bridge_village_hub",
          },
        },
        {
          id: "leave_elder",
          label: "Уйти",
          success: {
            text: "Бренн не останавливает Эмму. Только говорит ей в спину: “Если мост позовёт тебя по имени — не отвечай.”",
            effects: [{ type: "journal_entry", text: "Бренн предупредил: если мост позовёт по имени, нельзя отвечать." }],
            nextEventId: "emma_iron_bridge_village_hub",
          },
        },
      ],
    },
    {
      id: "emma_timo_testimony",
      title: "Мальчик, который слышал имя",
      biome: "village",
      text: "Тимо сидит на перевёрнутом ведре за домом прачки и ковыряет палкой землю. Увидев Эмму, он сразу говорит: — Я не врал. Потом тише: — Оно знало моё имя.",
      choices: [
        {
          id: "comfort_timo",
          label: "Успокоить Тимо",
          check: { stat: "charisma", dc: 9 },
          success: {
            text: "Тимо достаёт из кармана маленькую железную монету. На ней нет лица, только круг с трещиной. “Я нашёл её под мостом. После этого оно и заговорило.”",
            effects: [
              { type: "add_item", itemId: "cracked_iron_coin" },
              { type: "set_flag", flag: "emma_has_iron_coin" },
              { type: "journal_entry", text: "Тимо отдал Эмме железную монету с трещиной в круге." },
            ],
            nextEventId: "emma_iron_bridge_village_hub",
          },
          fail: {
            text: "Тимо сжимает кулак и мотает головой. Страх сильнее доверия.",
            effects: [{ type: "trace", value: 1 }],
            nextEventId: "emma_iron_bridge_village_hub",
          },
        },
        {
          id: "scare_timo",
          label: "Припугнуть его",
          check: { stat: "will", dc: 10 },
          success: {
            text: "Тимо быстро рассказывает, где именно стоял ночью. Но после этого он больше не смотрит Эмме в глаза.",
            effects: [
              { type: "reveal_clue", clueId: "bridge_north_support" },
              { type: "sin", value: 1 },
              { type: "journal_entry", text: "Тимо рассказал о северной опоре моста." },
            ],
            nextEventId: "emma_iron_bridge_village_hub",
          },
          fail: {
            text: "Мальчик убегает. Где-то в доме прачка начинает кричать на Эмму.",
            effects: [
              { type: "sin", value: 1 },
              { type: "reputation", target: "current_region", value: -1 },
            ],
            nextEventId: "emma_iron_bridge_village_hub",
          },
        },
        {
          id: "ask_what_voice_said",
          label: "Спросить, что сказал голос",
          success: {
            text: "Тимо шепчет: “Он сказал, что мост помнит всех, кто уходил и обещал вернуться.”",
            effects: [
              { type: "set_flag", flag: "voice_remembers_promises" },
              { type: "journal_entry", text: "Голос под мостом говорил о тех, кто обещал вернуться." },
            ],
            nextEventId: "emma_iron_bridge_village_hub",
          },
        },
        {
          id: "leave_timo_alone",
          label: "Оставить мальчика в покое",
          success: {
            text: "Тимо облегчённо выдыхает. Иногда милосердие — это не вопрос, а молчание.",
            effects: [{ type: "reputation", target: "current_region", value: 1 }],
            nextEventId: "emma_iron_bridge_village_hub",
          },
        },
      ],
    },
    {
      id: "emma_olma_black_iron",
      title: "Кузнец и чёрное железо",
      biome: "village",
      text: "Кузница Ольмы жаркая, шумная и почти успокаивающая. Здесь железо ведёт себя честно: краснеет, гнётся, остывает. Почти всё железо. На верстаке лежит заклёпка с моста. Она не ржавая. Она чёрная внутри, будто металл что-то впитал. Ольма кивает на неё: — Если скажешь, что это проклятие, я тебя выгоню. Если скажешь, что это плохое железо, тоже выгоню. Это что-то третье.",
      choices: [
        {
          id: "ask_for_tools",
          label: "Попросить инструменты",
          check: { stat: "charisma", dc: 10 },
          success: {
            text: "Ольма даёт Эмме крюк, короткую верёвку и старую рукавицу. “Если полезешь под мост, хотя бы не делай это голыми руками.”",
            effects: [
              { type: "add_item", itemId: "hook_and_rope" },
              { type: "set_flag", flag: "emma_has_rope" },
              { type: "journal_entry", text: "Ольма дала Эмме крюк и верёвку." },
            ],
            nextEventId: "emma_iron_bridge_village_hub",
          },
          fail: {
            text: "Ольма качает головой. “Нет. Сначала пойми, куда лезешь.”",
            effects: [],
            nextEventId: "emma_iron_bridge_village_hub",
          },
        },
        {
          id: "study_black_iron",
          label: "Осмотреть чёрную заклёпку",
          check: { stat: "intellect", dc: 11 },
          success: {
            text: "Эмма замечает: чёрный цвет не лежит на металле. Он повторяет форму знака, похожего на трещину в круге.",
            effects: [
              { type: "set_flag", flag: "emma_understands_black_iron_pattern" },
              { type: "journal_entry", text: "Чёрное железо повторяет знак трещины в круге." },
            ],
            nextEventId: "emma_iron_bridge_village_hub",
          },
          fail: {
            text: "Чем дольше Эмма смотрит на заклёпку, тем сильнее кажется, что внутри металла что-то медленно поворачивается.",
            effects: [{ type: "personal_decay", value: 1 }],
            nextEventId: "emma_iron_bridge_village_hub",
          },
        },
        {
          id: "tell_olma_about_coin",
          label: "Показать железную монету",
          condition: { item: "cracked_iron_coin" },
          success: {
            text: "Ольма перестаёт улыбаться. “Это не деревенская работа. И не королевская.” Она заворачивает монету в ткань, но ткань сразу темнеет.",
            effects: [
              { type: "reveal_node", nodeId: "asterwald_road" },
              { type: "journal_entry", text: "Ольма не смогла определить происхождение железной монеты." },
            ],
            nextEventId: "emma_iron_bridge_village_hub",
          },
        },
        {
          id: "leave_forge",
          label: "Уйти",
          success: {
            text: "За спиной снова звенит молот. На этот раз его звук кажется слишком похожим на стук под мостом.",
            effects: [],
            nextEventId: "emma_iron_bridge_village_hub",
          },
        },
      ],
    },
    {
      id: "emma_bridge_storehouse",
      title: "Старая кладовая под мостом",
      biome: "village",
      text: "Под мостом холоднее, чем должно быть. Река течёт рядом, но её почти не слышно. Между каменными опорами видна низкая железная дверь, наполовину скрытая корнями и илом. На двери нет замка в обычном месте. Только круглая выемка, похожая на след от монеты.",
      choices: [
        {
          id: "open_with_key",
          label: "Открыть дверь чёрным ключом",
          condition: { item: "black_bridge_key" },
          success: {
            text: "Ключ входит не в замок, а в узкую щель между заклёпками. Дверь открывается без скрипа. Внутри пахнет сухим железом и старой водой.",
            effects: [],
            nextEventId: "emma_storehouse_inside",
          },
        },
        {
          id: "use_iron_coin",
          label: "Вставить железную монету в выемку",
          condition: { item: "cracked_iron_coin" },
          success: {
            text: "Монета ложится в круг идеально. Чёрная трещина на ней на мгновение становится глубже. Дверь открывается, но Эмма чувствует, будто кто-то запомнил её руку.",
            effects: [{ type: "personal_decay", value: 1 }],
            nextEventId: "emma_storehouse_inside",
          },
        },
        {
          id: "force_door",
          label: "Попытаться открыть силой",
          check: { stat: "strength", dc: 13 },
          success: {
            text: "Железо сопротивляется, но сдаётся. Дверь открывается рывком, и изнутри вырывается сухой холод.",
            effects: [{ type: "fatigue", value: 1 }],
            nextEventId: "emma_storehouse_inside",
          },
          fail: {
            text: "Дверь не двигается. Зато мост над головой тихо отвечает одним ударом.",
            effects: [
              { type: "fatigue", value: 1 },
              { type: "trace", value: 1 },
            ],
            nextEventId: "emma_iron_bridge_village_hub",
          },
        },
        {
          id: "step_back",
          label: "Отступить",
          success: {
            text: "Эмма отходит от двери. Иногда здравый смысл звучит как трусость, но живые часто путают эти вещи.",
            effects: [{ type: "reveal_node", nodeId: "asterwald_road" }],
            nextEventId: "emma_iron_bridge_village_hub",
          },
        },
      ],
    },
    {
      id: "emma_storehouse_inside",
      title: "Внутри кладовой",
      biome: "village",
      text: "Кладовая оказывается меньше, чем казалась снаружи. Каменные стены сухие, хотя за ними река. На полу лежат старые инструменты, связка сгнивших верёвок и деревянная табличка с выцветшим именем: РАДАН. Под табличкой кто-то недавно процарапал свежую строку: “Я вернулся, но не целиком.” В дальней стене видна узкая трещина. Из неё тянет воздухом, пахнущим дождём и золой.",
      choices: [
        {
          id: "take_radan_tag",
          label: "Взять табличку с именем",
          success: {
            text: "Дерево тёплое, будто его держали в руках совсем недавно. Снаружи кто-то проходит по мосту, но шагов не слышно.",
            effects: [
              { type: "add_item", itemId: "radan_nameplate" },
              { type: "journal_entry", text: "Эмма нашла табличку с именем Радан." },
            ],
            nextEventId: "emma_iron_bridge_village_hub",
          },
        },
        {
          id: "inspect_crack",
          label: "Осмотреть трещину в стене",
          check: { stat: "will", dc: 12 },
          success: {
            text: "Эмма смотрит в трещину и видит не проход, а отражение моста в дождливую ночь. Кто-то стоит на середине и ждёт.",
            effects: [
              { type: "reveal_node", nodeId: "blackthorn" },
              { type: "journal_entry", text: "В трещине под мостом Эмма увидела дорогу к востоку." },
            ],
            nextEventId: "emma_iron_bridge_village_hub",
          },
          fail: {
            text: "На мгновение Эмме кажется, что трещина смотрит в ответ. Она отступает, чувствуя вкус ржавчины на языке.",
            effects: [{ type: "personal_decay", value: 1 }],
            nextEventId: "emma_iron_bridge_village_hub",
          },
        },
        {
          id: "cover_crack",
          label: "Завалить трещину камнями",
          check: { stat: "strength", dc: 10 },
          success: {
            text: "Камни ложатся неровно, но холод становится слабее. Это не решение. Но, возможно, отсрочка.",
            effects: [
              { type: "world_decay", value: -1 },
              { type: "fatigue", value: 1 },
              { type: "set_flag", flag: "emma_delayed_bridge_rift" },
              { type: "journal_entry", text: "Эмма временно закрыла трещину под мостом." },
            ],
            nextEventId: "emma_iron_bridge_village_hub",
          },
          fail: {
            text: "Камень выскальзывает из рук и падает в темноту. Звука удара нет.",
            effects: [
              { type: "world_decay", value: 1 },
              { type: "fatigue", value: 1 },
            ],
            nextEventId: "emma_iron_bridge_village_hub",
          },
        },
        {
          id: "leave_storehouse",
          label: "Выйти наружу",
          success: {
            text: "Снаружи день кажется обычным. Кто-то зовёт кур, на дороге ругается возчик, а старый мост снова тихо звенит на ветру. Почти как раньше.",
            effects: [
              { type: "reveal_node", nodeId: "asterwald_road" },
              { type: "reveal_node", nodeId: "blackthorn" },
              { type: "journal_entry", text: "Эмма вышла из кладовой под Железным мостом." },
            ],
            nextEventId: "emma_iron_bridge_village_hub",
          },
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
