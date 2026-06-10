import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "godot_export", "data");

async function optionalImport(relativePath, fallback = {}) {
  try {
    return await import(path.join(root, relativePath));
  } catch (error) {
    console.warn(`WARN: could not import ${relativePath}: ${error.message}`);
    return fallback;
  }
}

function toSnakeKey(key) {
  const aliases = {
    introEventId: "first_event_id",
    nextEventId: "next_event_id",
    itemId: "item_id",
    nodeId: "node_id",
    fragmentId: "fragment_id",
    eventId: "event_id",
    enemyGroupId: "enemy_group_id",
    locationId: "location_id",
    sourceType: "source_type",
    fragmentIds: "fragment_ids",
    startNode: "start_node",
    startLocationId: "start_location_id",
    fallbackBackground: "fallback_background",
    actionsLeft: "actions_left",
    actionsMax: "actions_max",
    maxHp: "max_hp",
    worldDecay: "world_decay",
    personalDecay: "personal_decay",
    selectedCharacterId: "selected_character_id",
    activeEvent: "active_event",
    activeCombat: "active_combat",
    activeMessage: "active_message",
    currentCity: "current_city",
    cityLocation: "city_location",
    locationMapNode: "location_map_node",
    knownNodes: "known_locations",
    visitedNodes: "visited_locations",
    revealedByRumor: "revealed_locations",
    fromNodeId: "from_node_id",
    toNodeId: "to_node_id",
    daysRemaining: "days_remaining",
    eventResolved: "event_resolved",
    active: "active",
    mainHand: "main_hand",
    offHand: "off_hand",
    leftArm: "left_arm",
    rightArm: "right_arm",
    leftLeg: "left_leg",
    rightLeg: "right_leg",
    bodyPart: "body_part",
    statusEffects: "status_effects",
    turnIndex: "turn_index",
    sourceMode: "source_mode",
    sourceLocation: "source_location",
    flagMin: "flag_min",
    notFlag: "not_flag",
    notItem: "not_item",
    textVariants: "text_variants",
  };
  if (aliases[key]) return aliases[key];
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/[-\s]+/g, "_")
    .toLowerCase();
}

function snakeify(value) {
  if (Array.isArray(value)) return value.map(snakeify);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [toSnakeKey(key), snakeify(item)]));
}

function writeJson(name, data) {
  fs.mkdirSync(outDir, { recursive: true });
  const filePath = path.join(outDir, name);
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  JSON.parse(fs.readFileSync(filePath, "utf8"));
  return filePath;
}

function normalizeBranch(branch) {
  if (!branch) return { text: null, effects: [], next_event_id: null };
  const result = snakeify(branch);
  return {
    text: result.text ?? null,
    effects: result.effects ?? [],
    next_event_id: result.next_event_id ?? null,
    location_message: result.location_message ?? undefined,
    ...Object.fromEntries(Object.entries(result).filter(([key]) => !["text", "effects", "next_event_id", "location_message"].includes(key))),
  };
}

function normalizeChoice(choice) {
  const known = new Set(["id", "label", "text", "condition", "conditions", "check", "success", "fail", "effects", "nextEventId"]);
  const raw = Object.fromEntries(Object.entries(choice).filter(([key]) => !known.has(key)));
  const normalized = {
    id: choice.id ?? null,
    text: choice.label ?? choice.text ?? null,
    condition: choice.condition ? snakeify(choice.condition) : choice.conditions ? snakeify(choice.conditions) : null,
    check: choice.check ? snakeify(choice.check) : null,
    success: normalizeBranch(choice.success),
    fail: choice.fail ? normalizeBranch(choice.fail) : null,
    effects: choice.effects ? snakeify(choice.effects) : [],
    next_event_id: choice.nextEventId ?? null,
  };
  if (Object.keys(raw).length) normalized.raw = snakeify(raw);
  return normalized;
}

function normalizeEvent(event, category) {
  const known = new Set(["id", "title", "biome", "type", "biomes", "background", "npc", "text", "textVariants", "choices"]);
  const raw = Object.fromEntries(Object.entries(event).filter(([key]) => !known.has(key)));
  const normalized = {
    id: event.id ?? null,
    category,
    location_id: event.locationId ?? null,
    title: event.title ?? null,
    biome: event.biome ?? null,
    biomes: event.biomes ?? [],
    type: event.type ?? null,
    background: event.background ?? null,
    npc: event.npc ? snakeify(event.npc) : null,
    text: event.text ?? null,
    text_variants: event.textVariants ? snakeify(event.textVariants) : [],
    choices: (event.choices ?? []).map(normalizeChoice),
  };
  if (Object.keys(raw).length) normalized.raw = snakeify(raw);
  return normalized;
}

function normalizeLocations(worldNodes) {
  return worldNodes.map((node) => ({
    id: node.id,
    name: node.name,
    type: node.biome ?? null,
    region: node.region ?? null,
    danger: node.danger ?? null,
    position: { x: node.x ?? null, y: node.y ?? null },
    neighbors: node.connections ?? [],
    first_event_id: node.introEventId ?? null,
    event_pool: { arrival: [], rest: [], repeat: [] },
    state: { visited: false, known: false, revealed_by_rumor: false, corruption: 0, destroyed: false },
  }));
}

function normalizeCharacters(playableCharacters) {
  return playableCharacters.map((character) => ({
    id: character.id,
    name: character.name,
    race: character.race ?? null,
    origin: character.origin ?? null,
    portrait: character.portrait ?? null,
    short_description: character.shortDescription ?? null,
    start_location_id: character.startLocationId ?? null,
    stats: {
      hp: character.start?.hp ?? null,
      max_hp: character.start?.maxHp ?? null,
      mana: character.start?.mana ?? 0,
      ...snakeify(character.stats ?? {}),
      sin: character.start?.sin ?? 0,
    },
    fatigue: character.start?.fatigue ?? null,
    trace: character.start?.trace ?? null,
    actions_max: character.start?.actionsMax ?? null,
    actions_left: character.start?.actionsLeft ?? null,
    inventory: character.start?.inventory ?? [],
    equipment: snakeify(character.start?.equipment ?? {}),
    flags: snakeify(character.start?.flags ?? {}),
  }));
}

function normalizeLocalLocations(localLocations, locationMaps) {
  const combined = { ...(locationMaps ?? {}), ...(localLocations ?? {}) };
  return Object.values(combined).map((location) => ({
    id: location.id,
    name: location.name,
    background: location.mapImage ?? location.background ?? null,
    fallback_background: location.fallbackBackground ?? null,
    width: location.width ?? null,
    height: location.height ?? null,
    start_node: location.startNode ?? null,
    nodes: (location.nodes ?? []).map((node) => ({
      id: node.id,
      name: node.name,
      type: node.type ?? null,
      position: { x: node.x ?? null, y: node.y ?? null },
      event_id: node.eventId ?? null,
      action: node.action ?? null,
      description: node.description ?? null,
      conditions: node.condition ? [snakeify(node.condition)] : node.conditions ? snakeify(node.conditions) : [],
    })),
  }));
}

function normalizeCities(cityNodes) {
  return Object.values(cityNodes ?? {}).map((city) => ({
    id: city.id,
    name: city.name,
    background: city.background ?? null,
    fallback_background: city.fallbackBackground ?? null,
    width: city.width ?? null,
    height: city.height ?? null,
    start_node: city.startNode ?? null,
    nodes: (city.nodes ?? []).map((node) => ({
      id: node.id,
      name: node.name,
      type: node.type ?? null,
      position: { x: node.x ?? null, y: node.y ?? null },
      event_id: node.eventId ?? null,
      action: node.action ?? null,
      description: node.description ?? null,
      conditions: node.condition ? [snakeify(node.condition)] : node.conditions ? snakeify(node.conditions) : [],
    })),
  }));
}

function normalizeWorldState(initialGameState) {
  return {
    day: initialGameState.hero?.day ?? 1,
    actions_max: initialGameState.hero?.actionsMax ?? 1,
    actions_left: initialGameState.hero?.actionsLeft ?? 1,
    world_decay: initialGameState.worldDecay ?? 0,
    sin: initialGameState.sin ?? 0,
    personal_decay: initialGameState.personalDecay ?? 0,
    flags: snakeify(initialGameState.flags ?? {}),
    journal: initialGameState.journal ?? [],
    known_locations: initialGameState.world?.knownNodes ?? [],
    visited_locations: initialGameState.world?.visitedNodes ?? [],
    revealed_locations: initialGameState.world?.revealedByRumor ?? [],
    reputation: snakeify(initialGameState.reputation ?? {}),
    active_event_id: initialGameState.activeEvent?.id ?? null,
    current_location_id: initialGameState.hero?.location ?? null,
    current_city_id: initialGameState.currentCity ?? null,
    current_mode: initialGameState.mode ?? "world",
    selected_character_id: initialGameState.selectedCharacterId ?? null,
    world: snakeify(initialGameState.world ?? {}),
    travel: snakeify(initialGameState.travel ?? {}),
    lore: snakeify(initialGameState.lore ?? {}),
  };
}

function collectNextEventIdsFromBranch(branch, refs = []) {
  if (!branch) return refs;
  if (branch.next_event_id) refs.push(branch.next_event_id);
  for (const effect of branch.effects ?? []) {
    if (effect.type === "start_event" && effect.event_id) refs.push(effect.event_id);
  }
  return refs;
}

function collectEffects(event) {
  const effects = [];
  for (const choice of event.choices ?? []) {
    effects.push(...(choice.effects ?? []));
    effects.push(...(choice.success?.effects ?? []));
    effects.push(...(choice.fail?.effects ?? []));
  }
  return effects;
}

function validateExports({ locations, events, items, worldNodes, eventsSource }) {
  const warnings = [];
  const locationIds = new Set(locations.map((item) => item.id));
  const eventIds = new Set(events.map((item) => item.id));
  const itemIds = new Set(Object.keys(items ?? {}));

  const brokenNeighbors = [];
  for (const location of locations) {
    for (const neighbor of location.neighbors) {
      if (!locationIds.has(neighbor)) brokenNeighbors.push({ location_id: location.id, neighbor });
    }
    if (location.first_event_id && !eventIds.has(location.first_event_id)) {
      warnings.push({ type: "broken_first_event_id", location_id: location.id, event_id: location.first_event_id });
    }
  }

  const brokenNextEvents = [];
  const brokenItemEffects = [];
  for (const event of events) {
    for (const choice of event.choices ?? []) {
      for (const eventId of [choice.next_event_id, ...collectNextEventIdsFromBranch(choice.success), ...collectNextEventIdsFromBranch(choice.fail)].filter(Boolean)) {
        if (!eventIds.has(eventId)) brokenNextEvents.push({ event_id: event.id, next_event_id: eventId });
      }
    }
    for (const effect of collectEffects(event)) {
      if (effect.item_id && itemIds.size && !itemIds.has(effect.item_id)) brokenItemEffects.push({ event_id: event.id, item_id: effect.item_id });
    }
  }

  const expectedEventCount = Object.values(eventsSource).flat().length;
  return {
    json_valid: true,
    locations_count: locations.length,
    source_world_nodes_count: worldNodes.length,
    events_count: events.length,
    source_events_count: expectedEventCount,
    locations_count_matches: locations.length === worldNodes.length,
    events_count_matches: events.length === expectedEventCount,
    broken_neighbors: brokenNeighbors,
    broken_event_refs: brokenNextEvents,
    broken_item_refs: brokenItemEffects,
    warnings,
  };
}

const [worldNodesModule, eventsModule, travelEventsModule, charactersModule, localLocationsModule, locationMapsModule, cityNodesModule, itemsModule, weaponsModule, injuriesModule, loreFragmentsModule, loreCollectionsModule, reputationModule, gameStateModule] = await Promise.all([
  optionalImport("src/data/worldNodes.js"),
  optionalImport("src/data/events.js"),
  optionalImport("src/data/travelEvents.js"),
  optionalImport("src/data/characters.js"),
  optionalImport("src/data/localLocations.js"),
  optionalImport("src/data/locationMaps.js"),
  optionalImport("src/data/cityNodes.js"),
  optionalImport("src/data/items.js"),
  optionalImport("src/data/weapons.js"),
  optionalImport("src/data/injuries.js"),
  optionalImport("src/data/loreFragments.js"),
  optionalImport("src/data/loreCollections.js"),
  optionalImport("src/data/reputation.js"),
  optionalImport("src/engine/gameState.js"),
]);

const worldNodes = worldNodesModule.worldNodes ?? [];
const eventsSource = eventsModule.events ?? {};
const travelEvents = travelEventsModule.travelEvents ?? [];
const playableCharacters = charactersModule.playableCharacters ?? [];
const locations = normalizeLocations(worldNodes);
const events = Object.entries(eventsSource).flatMap(([category, list]) => (list ?? []).map((event) => normalizeEvent(event, category)));
const travelEventsJson = travelEvents.map((event) => normalizeEvent(event, "travel"));
const characters = normalizeCharacters(playableCharacters);
const localLocations = normalizeLocalLocations(localLocationsModule.localLocations ?? {}, locationMapsModule.locationMaps ?? {});
const cities = normalizeCities(cityNodesModule.cityNodes ?? {});
const items = snakeify(itemsModule.items ?? {});
const weapons = snakeify(weaponsModule.weapons ?? {});
const injuries = { body_parts: injuriesModule.bodyParts ?? [], injury_types: snakeify(injuriesModule.injuryTypes ?? {}) };
const loreFragments = Object.values(loreFragmentsModule.loreFragments ?? {}).map(snakeify);
const loreCollections = Object.values(loreCollectionsModule.loreCollections ?? {}).map(snakeify);
const factions = Object.values(reputationModule.reputationFactions ?? {}).map(snakeify);
const worldState = normalizeWorldState(gameStateModule.initialGameState ?? {});
const quests = [];
const npcs = [];

const outputs = {
  "locations.json": locations,
  "local_locations.json": localLocations,
  "cities.json": cities,
  "events.json": events,
  "travel_events.json": travelEventsJson,
  "characters.json": characters,
  "items.json": items,
  "weapons.json": weapons,
  "injuries.json": injuries,
  "lore_fragments.json": loreFragments,
  "lore_collections.json": loreCollections,
  "factions.json": factions,
  "world_state.json": worldState,
  "quests.json": quests,
  "npcs.json": npcs,
};

const written = Object.fromEntries(Object.entries(outputs).map(([name, data]) => [name, writeJson(name, data)]));
const validation = validateExports({ locations, events, items: itemsModule.items ?? {}, worldNodes, eventsSource });


console.log(JSON.stringify({ written: Object.keys(written), validation }, null, 2));
