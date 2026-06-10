extends Node

var day: int = 1
var actions_max: int = 1
var actions_left: int = 1

var current_character_id: String = "emma"
var current_location_id: String = ""
var current_character: Dictionary = {}
var character_stats: Dictionary = {}

var hp: int = 10
var fatigue: int = 0
var trace: int = 0
var world_decay: int = 0
var sin: int = 0
var personal_decay: int = 0

var flags: Dictionary = {}
var journal: Array[String] = []
var inventory: Array[String] = []

var known_locations: Array[String] = []
var visited_locations: Array[String] = []
var revealed_locations: Array[String] = []

func initialize_from_data() -> void:
	var template := DataLoader.world_state
	day = int(template.get("day", 1))
	actions_max = int(template.get("actions_max", 1))
	actions_left = int(template.get("actions_left", actions_max))
	world_decay = int(template.get("world_decay", 0))
	sin = int(template.get("sin", 0))
	personal_decay = int(template.get("personal_decay", 0))
	current_character = DataLoader.get_character(current_character_id)
	if current_character.is_empty() and DataLoader.characters.size() > 0:
		current_character = DataLoader.characters[0]
		current_character_id = str(current_character.get("id", ""))
	character_stats = current_character.get("stats", {})
	hp = int(character_stats.get("hp", hp))
	actions_max = int(current_character.get("actions_max", actions_max))
	actions_left = int(current_character.get("actions_left", actions_left))
	inventory = []
	for item in current_character.get("inventory", []):
		inventory.append(str(item))
	var start_location := str(current_character.get("start_location_id", ""))
	if start_location == "" and DataLoader.locations.size() > 0:
		start_location = str(DataLoader.locations[0].get("id", ""))
	set_current_location(start_location)
	visit_location(start_location)
	_reveal_neighbors(start_location)
	add_journal_entry("Стартовый персонаж: %s. Стартовая локация: %s." % [current_character.get("name", current_character_id), start_location])
	print("Eira start: character=%s location=%s" % [current_character_id, current_location_id])
	SignalBus.state_changed.emit()

func set_current_location(location_id: String) -> void:
	current_location_id = location_id
	SignalBus.location_changed.emit(location_id)
	SignalBus.state_changed.emit()

func is_location_known(location_id: String) -> bool:
	return known_locations.has(location_id) or visited_locations.has(location_id) or revealed_locations.has(location_id)

func reveal_location(location_id: String) -> void:
	if location_id != "" and not known_locations.has(location_id):
		known_locations.append(location_id)
	SignalBus.state_changed.emit()

func visit_location(location_id: String) -> void:
	if location_id == "":
		return
	if not visited_locations.has(location_id):
		visited_locations.append(location_id)
	reveal_location(location_id)

func add_journal_entry(text: String) -> void:
	if text == "":
		return
	journal.append(text)
	SignalBus.journal_updated.emit()
	SignalBus.state_changed.emit()

func set_flag(flag_name: String, value: Variant = true) -> void:
	flags[flag_name] = value
	SignalBus.state_changed.emit()

func inc_flag(flag_name: String, amount: int = 1) -> void:
	flags[flag_name] = int(flags.get(flag_name, 0)) + amount
	SignalBus.state_changed.emit()

func get_stat(stat_name: String) -> int:
	return int(character_stats.get(stat_name, 0))

func _reveal_neighbors(location_id: String) -> void:
	var location := DataLoader.get_location(location_id)
	for neighbor in location.get("neighbors", []):
		reveal_location(str(neighbor))
