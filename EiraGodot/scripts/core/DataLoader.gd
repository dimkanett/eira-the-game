extends Node

var locations: Array = []
var events: Array = []
var characters: Array = []
var local_locations: Array = []
var cities: Array = []
var travel_events: Array = []
var items: Dictionary = {}
var weapons: Dictionary = {}
var injuries: Dictionary = {}
var lore_fragments: Array = []
var lore_collections: Array = []
var factions: Array = []
var quests: Array = []
var npcs: Array = []
var world_state: Dictionary = {}

var locations_by_id: Dictionary = {}
var events_by_id: Dictionary = {}
var characters_by_id: Dictionary = {}

func load_json(file_path: String) -> Variant:
	if not FileAccess.file_exists(file_path):
		push_error("JSON file not found: %s" % file_path)
		return null
	var file: FileAccess = FileAccess.open(file_path, FileAccess.READ)
	if file == null:
		push_error("Cannot open JSON file: %s" % file_path)
		return null
	var text: String = file.get_as_text()
	var parsed: Variant = JSON.parse_string(text)
	if parsed == null:
		push_error("Cannot parse JSON file: %s" % file_path)
	return parsed

func load_all() -> void:
	locations = _as_array(load_json("res://data/locations.json"))
	events = _as_array(load_json("res://data/events.json"))
	characters = _as_array(load_json("res://data/characters.json"))
	local_locations = _as_array(load_json("res://data/local_locations.json"))
	cities = _as_array(load_json("res://data/cities.json"))
	travel_events = _as_array(load_json("res://data/travel_events.json"))
	items = _as_dict(load_json("res://data/items.json"))
	weapons = _as_dict(load_json("res://data/weapons.json"))
	injuries = _as_dict(load_json("res://data/injuries.json"))
	lore_fragments = _as_array(load_json("res://data/lore_fragments.json"))
	lore_collections = _as_array(load_json("res://data/lore_collections.json"))
	factions = _as_array(load_json("res://data/factions.json"))
	quests = _as_array(load_json("res://data/quests.json"))
	npcs = _as_array(load_json("res://data/npcs.json"))
	world_state = _as_dict(load_json("res://data/world_state.json"))
	locations_by_id = _index_by_id(locations)
	events_by_id = _index_by_id(events)
	characters_by_id = _index_by_id(characters)
	print("Eira data loaded: locations=%d events=%d characters=%d" % [locations.size(), events.size(), characters.size()])
	SignalBus.data_loaded.emit()

func get_location(id: String) -> Dictionary:
	return locations_by_id.get(id, {})

func get_event(id: String) -> Dictionary:
	return events_by_id.get(id, {})

func get_character(id: String) -> Dictionary:
	return characters_by_id.get(id, {})

func _index_by_id(items_array: Array) -> Dictionary:
	var result: Dictionary = {}
	for item in items_array:
		if item is Dictionary and item.has("id"):
			result[item["id"]] = item
	return result

func _as_array(value: Variant) -> Array:
	return value if value is Array else []

func _as_dict(value: Variant) -> Dictionary:
	return value if value is Dictionary else {}
