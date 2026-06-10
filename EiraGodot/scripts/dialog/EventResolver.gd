extends RefCounted
class_name EventResolver

static func resolve_choice(event_data: Dictionary, choice_data: Dictionary, controller: Node) -> void:
	if choice_data.is_empty():
		controller.close_event()
		return
	var check: Variant = choice_data.get("check", null)
	var branch: Dictionary = choice_data.get("success", {})
	var success: bool = true
	if check is Dictionary and not check.is_empty():
		var stat: String = str(check.get("stat", ""))
		var dc: int = int(check.get("dc", check.get("difficulty", 0)))
		var roll: int = randi_range(1, 20)
		var total: int = roll + GameState.get_stat(stat)
		success = total >= dc
		branch = choice_data.get("success" if success else "fail", choice_data.get("success", {}))
		GameState.add_journal_entry("Проверка %s: d20=%d, итог=%d, DC=%d." % [stat, roll, total, dc])
	EffectRunner.apply_effects(choice_data.get("effects", []))
	EffectRunner.apply_effects(branch.get("effects", []))
	var result_text: String = str(branch.get("text", ""))
	if result_text != "":
		GameState.add_journal_entry("%s: %s" % [event_data.get("title", "Событие"), result_text])
	var next_event_id: String = str(branch.get("next_event_id", choice_data.get("next_event_id", "")))
	if next_event_id != "":
		controller.start_event(next_event_id)
	else:
		controller.close_event()
