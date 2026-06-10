extends RefCounted
class_name EffectRunner

static func apply_effects(effects: Array) -> void:
	for effect in effects:
		if not (effect is Dictionary):
			continue
		_apply_effect(effect)
	SignalBus.state_changed.emit()

static func _apply_effect(effect: Dictionary) -> void:
	var effect_type: String = str(effect.get("type", ""))
	match effect_type:
		"set_flag":
			GameState.set_flag(str(effect.get("flag", "")), effect.get("value", true))
		"inc_flag":
			GameState.inc_flag(str(effect.get("flag", "")), int(effect.get("value", 1)))
		"journal", "journal_entry":
			GameState.add_journal_entry(str(effect.get("text", "")))
		"hp":
			GameState.hp = max(0, GameState.hp + int(effect.get("value", 0)))
		"fatigue":
			GameState.fatigue = max(0, GameState.fatigue + int(effect.get("value", 0)))
		"trace":
			GameState.trace = max(0, GameState.trace + int(effect.get("value", 0)))
		"world_decay":
			GameState.world_decay = clamp(GameState.world_decay + int(effect.get("value", 0)), 0, 100)
		"sin":
			GameState.sin = clamp(GameState.sin + int(effect.get("value", 0)), 0, 100)
		"reveal", "reveal_node":
			var location_id: String = str(effect.get("location_id", effect.get("node_id", "")))
			GameState.reveal_location(location_id)
		"add_item":
			var item_id: String = str(effect.get("item_id", ""))
			if item_id != "" and not GameState.inventory.has(item_id):
				GameState.inventory.append(item_id)
				GameState.add_journal_entry("Получен предмет: %s" % item_id)
		"start_event", "enter_location", "return_to_local_map", "personal_decay", "reputation", "add_lore", "add_random_lore", "travel_delay", "complete_travel", "cancel_travel", "start_combat":
			print("Effect not implemented in Godot slice yet: ", effect)
		_:
			if effect_type != "":
				print("Unknown effect in Godot slice: ", effect)
