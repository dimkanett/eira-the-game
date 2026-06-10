extends Control

@onready var info_label: Label = $Panel/MarginContainer/InfoLabel

func setup() -> void:
	SignalBus.state_changed.connect(refresh)
	SignalBus.location_changed.connect(func(_id): refresh())
	refresh()

func refresh() -> void:
	var location: Dictionary = DataLoader.get_location(GameState.current_location_id)
	var location_name: String = str(location.get("name", GameState.current_location_id))
	var hero_name: String = str(GameState.current_character.get("name", GameState.current_character_id))
	info_label.text = "Герой: %s | День: %d | Действия: %d/%d | HP: %d | Усталость: %d | След: %d | Разложение мира: %d | Sin: %d | Текущая локация: %s" % [hero_name, GameState.day, GameState.actions_left, GameState.actions_max, GameState.hp, GameState.fatigue, GameState.trace, GameState.world_decay, GameState.sin, location_name]
