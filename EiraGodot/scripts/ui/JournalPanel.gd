extends Control

@onready var toggle_button: Button = $ToggleButton
@onready var panel: Panel = $Panel
@onready var entries_label: RichTextLabel = $Panel/MarginContainer/EntriesLabel

func setup() -> void:
	toggle_button.pressed.connect(_toggle)
	SignalBus.journal_updated.connect(refresh)
	panel.visible = false
	refresh()

func refresh() -> void:
	entries_label.text = "\n".join(GameState.journal)

func _toggle() -> void:
	panel.visible = not panel.visible
	refresh()
