extends Control

var controller: Node = null
var target_location_id: String = ""

func setup(controller_ref: Node) -> void:
	controller = controller_ref

func move_to_location(location_id: String, target_position: Vector2) -> void:
	target_location_id = location_id
	var tween: Tween = create_tween()
	tween.tween_property(self, "position", target_position - size / 2.0, 0.45).set_trans(Tween.TRANS_SINE).set_ease(Tween.EASE_IN_OUT)
	tween.finished.connect(_on_move_finished)

func _on_move_finished() -> void:
	if controller != null:
		controller.arrive_at_location(target_location_id)
