extends Button

var location_id: String = ""
var controller: Node = null
var current: bool = false
var reachable: bool = false
var location_name: String = ""

func setup(location: Dictionary, controller_ref: Node, is_current: bool, is_reachable: bool) -> void:
	controller = controller_ref
	location_id = str(location.get("id", ""))
	location_name = str(location.get("name", location_id))
	current = is_current
	reachable = is_reachable
	tooltip_text = location_name
	_update_visual()
	pressed.connect(_on_pressed)

func _update_visual() -> void:
	flat = false
	text = location_name if current or reachable else ""
	custom_minimum_size = Vector2(170, 24) if text != "" else Vector2(24, 24)
	size = custom_minimum_size
	var style: StyleBoxFlat = StyleBoxFlat.new()
	style.corner_radius_top_left = 12
	style.corner_radius_top_right = 12
	style.corner_radius_bottom_left = 12
	style.corner_radius_bottom_right = 12
	style.border_width_left = 2
	style.border_width_top = 2
	style.border_width_right = 2
	style.border_width_bottom = 2
	if current:
		style.bg_color = Color(1.0, 0.82, 0.18, 0.95)
		style.border_color = Color(1.0, 1.0, 0.78, 1.0)
		add_theme_color_override("font_color", Color(0.12, 0.08, 0.0, 1.0))
	elif reachable:
		style.bg_color = Color(0.16, 0.85, 0.38, 0.9)
		style.border_color = Color(0.7, 1.0, 0.75, 1.0)
		add_theme_color_override("font_color", Color(0.02, 0.08, 0.03, 1.0))
	else:
		style.bg_color = Color(0.35, 0.45, 0.62, 0.55)
		style.border_color = Color(0.65, 0.72, 0.85, 0.55)
	add_theme_stylebox_override("normal", style)
	add_theme_stylebox_override("hover", style)
	add_theme_stylebox_override("pressed", style)
	add_theme_stylebox_override("disabled", style)
	disabled = not reachable or current

func _on_pressed() -> void:
	if controller != null and reachable and not current:
		controller.request_move_to(location_id)
