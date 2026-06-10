extends Button

var location_id: String = ""
var controller: Node = null
var current: bool = false
var reachable: bool = false

func setup(location: Dictionary, controller_ref: Node, is_current: bool, is_reachable: bool) -> void:
	controller = controller_ref
	location_id = str(location.get("id", ""))
	text = str(location.get("name", location_id))
	current = is_current
	reachable = is_reachable
	tooltip_text = text
	_update_visual()
	pressed.connect(_on_pressed)

func _update_visual() -> void:
	if current:
		modulate = Color(1.0, 0.9, 0.25)
	elif reachable:
		modulate = Color(0.45, 1.0, 0.55)
	else:
		modulate = Color(0.65, 0.72, 0.85)
	disabled = not reachable or current

func _on_pressed() -> void:
	if controller != null and reachable and not current:
		controller.request_move_to(location_id)
