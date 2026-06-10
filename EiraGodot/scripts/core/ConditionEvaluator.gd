extends RefCounted
class_name ConditionEvaluator

static func is_met(condition: Variant) -> bool:
	if condition == null or not (condition is Dictionary) or condition.is_empty():
		return true
	if condition.has("flag") and not _has_all_flags(condition["flag"]):
		return false
	if condition.has("not_flag") and _has_any_flag(condition["not_flag"]):
		return false
	if condition.has("item") and not _has_all_items(condition["item"]):
		return false
	if condition.has("not_item") and _has_any_item(condition["not_item"]):
		return false
	if condition.has("flag_min") and not _flag_min_met(condition["flag_min"]):
		return false
	return true

static func _to_array(value: Variant) -> Array:
	return value if value is Array else [value]

static func _has_all_flags(value: Variant) -> bool:
	for flag in _to_array(value):
		if not bool(GameState.flags.get(str(flag), false)):
			return false
	return true

static func _has_any_flag(value: Variant) -> bool:
	for flag in _to_array(value):
		if bool(GameState.flags.get(str(flag), false)):
			return true
	return false

static func _has_all_items(value: Variant) -> bool:
	for item in _to_array(value):
		if not GameState.inventory.has(str(item)):
			return false
	return true

static func _has_any_item(value: Variant) -> bool:
	for item in _to_array(value):
		if GameState.inventory.has(str(item)):
			return true
	return false

static func _flag_min_met(value: Variant) -> bool:
	if value is Array and value.size() >= 2 and not (value[0] is Array):
		return int(GameState.flags.get(str(value[0]), 0)) >= int(value[1])
	if value is Array:
		for entry in value:
			if entry is Array and entry.size() >= 2:
				if int(GameState.flags.get(str(entry[0]), 0)) < int(entry[1]):
					return false
	if value is Dictionary:
		for key in value.keys():
			if int(GameState.flags.get(str(key), 0)) < int(value[key]):
				return false
	return true
