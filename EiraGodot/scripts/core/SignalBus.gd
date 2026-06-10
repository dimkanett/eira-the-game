extends Node

signal data_loaded
signal location_changed(location_id: String)
signal event_started(event_id: String)
signal event_closed
signal journal_updated
signal state_changed
signal movement_requested(location_id: String)
signal movement_finished(location_id: String)
