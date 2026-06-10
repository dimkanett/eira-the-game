extends Control

var controller: Node = null
var event_data: Dictionary = {}

@onready var title_label: Label = $Panel/MarginContainer/VBoxContainer/TitleLabel
@onready var body_label: RichTextLabel = $Panel/MarginContainer/VBoxContainer/BodyLabel
@onready var choices_container: VBoxContainer = $Panel/MarginContainer/VBoxContainer/ChoicesContainer

func setup(controller_ref: Node) -> void:
	controller = controller_ref
	hide_dialog()

func show_event(data: Dictionary) -> void:
	event_data = data
	title_label.text = str(data.get("title", "Событие"))
	body_label.text = str(data.get("text", ""))
	clear_choices()
	var choices: Array = data.get("choices", [])
	if choices.is_empty():
		add_choice({"id": "continue", "text": "Продолжить", "success": {"text": "", "effects": [], "next_event_id": null}})
	else:
		for choice in choices:
			if ConditionEvaluator.is_met(choice.get("condition", null)):
				add_choice(choice)
	visible = true

func clear_choices() -> void:
	for child in choices_container.get_children():
		child.queue_free()

func add_choice(choice_data: Dictionary) -> void:
	var button = preload("res://scenes/dialog/ChoiceButton.tscn").instantiate()
	choices_container.add_child(button)
	button.setup(choice_data, Callable(self, "_on_choice_selected"))

func hide_dialog() -> void:
	visible = false

func _on_choice_selected(choice_data: Dictionary) -> void:
	if controller != null:
		controller.resolve_choice(choice_data)
