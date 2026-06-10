extends Control

const FALLBACK_MAP_SIZE: Vector2 = Vector2(1402, 1122)
const MAP_IMAGE_PATH: String = "res://assets/maps/world_map.png"

var controller: Node = null
var node_scene: PackedScene = preload("res://scenes/map/MapNode.tscn")
var map_size: Vector2 = FALLBACK_MAP_SIZE
var _pending_center_location_id: String = ""

@onready var scroll: ScrollContainer = $ScrollContainer
@onready var canvas: Control = $ScrollContainer/Canvas
@onready var texture_rect: TextureRect = $ScrollContainer/Canvas/WorldTexture
@onready var fallback_rect: ColorRect = $ScrollContainer/Canvas/FallbackRect
@onready var routes_layer: Control = $ScrollContainer/Canvas/RoutesLayer
@onready var nodes_layer: Control = $ScrollContainer/Canvas/NodesLayer
@onready var player_marker = $ScrollContainer/Canvas/PlayerMarker

func setup(controller_ref: Node) -> void:
	controller = controller_ref
	player_marker.setup(controller_ref)
	_load_map_texture()
	_apply_map_size()

func rebuild() -> void:
	for child in nodes_layer.get_children():
		child.queue_free()
	for child in routes_layer.get_children():
		child.queue_free()
	var current_id: String = GameState.current_location_id
	var current_location: Dictionary = DataLoader.get_location(current_id)
	var neighbors: Array = current_location.get("neighbors", [])
	_draw_routes(current_location)
	for location in DataLoader.locations:
		var location_id: String = str(location.get("id", ""))
		if not GameState.is_location_known(location_id):
			continue
		var position: Vector2 = _location_position(location)
		var node = node_scene.instantiate()
		nodes_layer.add_child(node)
		node.position = position - Vector2(12, 12)
		node.setup(location, controller, location_id == current_id, neighbors.has(location_id))
	player_marker.position = _location_position(current_location) - player_marker.size / 2.0
	center_on_location(current_id, false)

func move_player_to(location_id: String) -> void:
	var location: Dictionary = DataLoader.get_location(location_id)
	center_on_location(location_id, true)
	player_marker.move_to_location(location_id, _location_position(location))

func center_on_location(location_id: String, animated: bool = false) -> void:
	_pending_center_location_id = location_id
	call_deferred("_center_pending_location", animated)

func _center_pending_location(animated: bool = false) -> void:
	if _pending_center_location_id == "":
		return
	var location: Dictionary = DataLoader.get_location(_pending_center_location_id)
	if location.is_empty():
		return
	var position: Vector2 = _location_position(location)
	var viewport_size: Vector2 = scroll.size
	var max_scroll_x: float = max(0.0, map_size.x - viewport_size.x)
	var max_scroll_y: float = max(0.0, map_size.y - viewport_size.y)
	var target_x: int = int(clamp(position.x - viewport_size.x / 2.0, 0.0, max_scroll_x))
	var target_y: int = int(clamp(position.y - viewport_size.y / 2.0, 0.0, max_scroll_y))
	if animated:
		var tween: Tween = create_tween()
		tween.set_parallel(true)
		tween.tween_property(scroll, "scroll_horizontal", target_x, 0.35).set_trans(Tween.TRANS_SINE).set_ease(Tween.EASE_IN_OUT)
		tween.tween_property(scroll, "scroll_vertical", target_y, 0.35).set_trans(Tween.TRANS_SINE).set_ease(Tween.EASE_IN_OUT)
	else:
		scroll.scroll_horizontal = target_x
		scroll.scroll_vertical = target_y

func _draw_routes(current_location: Dictionary) -> void:
	var from: Vector2 = _location_position(current_location)
	var current_neighbors: Array = current_location.get("neighbors", [])
	for neighbor_id in current_neighbors:
		if not GameState.is_location_known(str(neighbor_id)):
			continue
		var neighbor: Dictionary = DataLoader.get_location(str(neighbor_id))
		_add_route_line(from, _location_position(neighbor), Color(0.35, 1.0, 0.55, 0.9), 3.0)
	for location in DataLoader.locations:
		var location_id: String = str(location.get("id", ""))
		if not GameState.is_location_known(location_id):
			continue
		for neighbor_id in location.get("neighbors", []):
			var neighbor_key: String = str(neighbor_id)
			if not GameState.is_location_known(neighbor_key):
				continue
			if current_neighbors.has(location_id) or current_neighbors.has(neighbor_key):
				continue
			if location_id > neighbor_key:
				continue
			var neighbor: Dictionary = DataLoader.get_location(neighbor_key)
			_add_route_line(_location_position(location), _location_position(neighbor), Color(0.45, 0.6, 0.8, 0.25), 1.5)

func _add_route_line(from: Vector2, to: Vector2, color: Color, width: float) -> void:
	var line: Line2D = Line2D.new()
	line.width = width
	line.default_color = color
	line.points = PackedVector2Array([from, to])
	routes_layer.add_child(line)

func _location_position(location: Dictionary) -> Vector2:
	var position: Dictionary = location.get("position", {})
	return Vector2(float(position.get("x", 0)), float(position.get("y", 0)))

func _load_map_texture() -> void:
	if ResourceLoader.exists(MAP_IMAGE_PATH):
		var resource: Resource = load(MAP_IMAGE_PATH)
		if resource is Texture2D:
			var texture: Texture2D = resource as Texture2D
			texture_rect.texture = texture
			map_size = texture.get_size()
			texture_rect.visible = true
			fallback_rect.visible = false
			print("World map image loaded: %s" % MAP_IMAGE_PATH)
			return
	map_size = FALLBACK_MAP_SIZE
	texture_rect.texture = null
	texture_rect.visible = false
	fallback_rect.visible = true
	print("World map image missing, using fallback background")

func _apply_map_size() -> void:
	canvas.custom_minimum_size = map_size
	canvas.size = map_size
	fallback_rect.size = map_size
	texture_rect.size = map_size
	routes_layer.size = map_size
	nodes_layer.size = map_size
