extends Button

var choice_data: Dictionary = {}
var callback: Callable

func setup(data: Dictionary, choice_callback: Callable) -> void:
	choice_data = data
	callback = choice_callback
	text = str(data.get("text", data.get("label", "Продолжить")))
	pressed.connect(_on_pressed)

func _on_pressed() -> void:
	if callback.is_valid():
		callback.call(choice_data)
