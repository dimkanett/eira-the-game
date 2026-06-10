extends Control

const MAP_SIZE := Vector2(1402, 1122)

var controller: Node = null
var node_scene := preload("res://scenes/map/MapNode.tscn")

@onready var scroll: ScrollContainer = $ScrollContainer
@onready var canvas: Control = $ScrollContainer/Canvas
@onready var texture_rect: TextureRect = $ScrollContainer/Canvas/WorldTexture
@onready var fallback_rect: ColorRect = $ScrollContainer/Canvas/FallbackRect
@onready var routes_layer: Control = $ScrollContainer/Canvas/RoutesLayer
@onready var nodes_layer: Control = $ScrollContainer/Canvas/NodesLayer
@onready var player_marker: Control = $ScrollContainer/Canvas/PlayerMarker

func setup(controller_ref: Node) -> void:
	controller = controller_ref
	player_marker.setup(controller_ref)
	canvas.custom_minimum_size = MAP_SIZE
	canvas.size = MAP_SIZE
	_load_map_texture()

func rebuild() -> void:
	for child in nodes_layer.get_children():
		child.queue_free()
	for child in routes_layer.get_children():
		child.queue_free()
	var current_id := GameState.current_location_id
	var current_location := DataLoader.get_location(current_id)
	var neighbors: Array = current_location.get("neighbors", [])
	_draw_routes(current_location)
	for location in DataLoader.locations:
		var location_id := str(location.get("id", ""))
		if not GameState.is_location_known(location_id):
			continue
		var position := _location_position(location)
		var node = node_scene.instantiate()
		nodes_layer.add_child(node)
		node.position = position - Vector2(8, 8)
		node.setup(location, controller, location_id == current_id, neighbors.has(location_id))
	player_marker.position = _location_position(current_location) - player_marker.size / 2.0

func move_player_to(location_id: String) -> void:
	var location := DataLoader.get_location(location_id)
	player_marker.move_to_location(location_id, _location_position(location))

func _draw_routes(current_location: Dictionary) -> void:
	var from := _location_position(current_location)
	for neighbor_id in current_location.get("neighbors", []):
		if not GameState.is_location_known(str(neighbor_id)):
			continue
		var neighbor := DataLoader.get_location(str(neighbor_id))
		var line := Line2D.new()
		line.width = 2.0
		line.default_color = Color(0.55, 0.75, 1.0, 0.75)
		line.points = PackedVector2Array([from, _location_position(neighbor)])
		routes_layer.add_child(line)

func _location_position(location: Dictionary) -> Vector2:
	var position: Dictionary = location.get("position", {})
	return Vector2(float(position.get("x", 0)), float(position.get("y", 0)))

func _load_map_texture() -> void:
	if ResourceLoader.exists("res://assets/maps/world_map.png"):
		texture_rect.texture = load("res://assets/maps/world_map.png")
		texture_rect.visible = true
		fallback_rect.visible = false
	else:
		texture_rect.visible = false
		fallback_rect.visible = true
