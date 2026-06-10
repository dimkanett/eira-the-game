extends Node

@onready var world_map = $WorldMap
@onready var event_dialog = $EventDialog
@onready var player_hud = $PlayerHUD
@onready var journal_panel = $JournalPanel

var active_event: Dictionary = {}
var moving_to_location_id: String = ""

func _ready() -> void:
	DataLoader.load_all()
	start_game()

func start_game() -> void:
	GameState.initialize_from_data()
	world_map.setup(self)
	event_dialog.setup(self)
	player_hud.setup()
	journal_panel.setup()
	world_map.rebuild()
	player_hud.refresh()
	print("Eira Godot ready: locations=%d events=%d characters=%d start_character=%s start_location=%s" % [DataLoader.locations.size(), DataLoader.events.size(), DataLoader.characters.size(), GameState.current_character_id, GameState.current_location_id])

func request_move_to(location_id: String) -> void:
	if moving_to_location_id != "":
		return
	if not _is_neighbor(GameState.current_location_id, location_id):
		print("Ignored non-reachable click: ", location_id)
		return
	if GameState.actions_left <= 0:
		GameState.add_journal_entry("На сегодня действий не осталось.")
		return
	moving_to_location_id = location_id
	world_map.move_player_to(location_id)

func arrive_at_location(location_id: String) -> void:
	moving_to_location_id = ""
	GameState.actions_left = max(0, GameState.actions_left - 1)
	GameState.set_current_location(location_id)
	GameState.visit_location(location_id)
	_reveal_neighbors(location_id)
	world_map.rebuild()
	player_hud.refresh()
	start_location_event(location_id)

func start_location_event(location_id: String) -> void:
	var location: Dictionary = DataLoader.get_location(location_id)
	var event_id: String = str(location.get("first_event_id", ""))
	if event_id != "" and not DataLoader.get_event(event_id).is_empty():
		start_event(event_id)
		return
	var fallback: Dictionary = {
		"id": "fallback_%s" % location_id,
		"title": location.get("name", location_id),
		"text": "Вы прибыли в %s. Здесь пока нет отдельного события." % location.get("name", location_id),
		"choices": [{ "id": "continue", "text": "Продолжить", "success": { "text": "", "effects": [], "next_event_id": null } }]
	}
	show_event_data(fallback)

func start_event(event_id: String) -> void:
	var event_data: Dictionary = DataLoader.get_event(event_id)
	if event_data.is_empty():
		print("Missing event, using fallback: ", event_id)
		show_event_data({"id": event_id, "title": "Событие не найдено", "text": "Событие %s пока отсутствует." % event_id, "choices": []})
		return
	show_event_data(event_data)

func show_event_data(event_data: Dictionary) -> void:
	active_event = event_data
	event_dialog.show_event(event_data)
	SignalBus.event_started.emit(str(event_data.get("id", "")))

func close_event() -> void:
	active_event = {}
	event_dialog.hide_dialog()
	SignalBus.event_closed.emit()
	SignalBus.state_changed.emit()

func resolve_choice(choice_data: Dictionary) -> void:
	EventResolver.resolve_choice(active_event, choice_data, self)

func _is_neighbor(from_id: String, target_id: String) -> bool:
	var from_location: Dictionary = DataLoader.get_location(from_id)
	return from_location.get("neighbors", []).has(target_id)

func _reveal_neighbors(location_id: String) -> void:
	var location: Dictionary = DataLoader.get_location(location_id)
	for neighbor in location.get("neighbors", []):
		GameState.reveal_location(str(neighbor))
