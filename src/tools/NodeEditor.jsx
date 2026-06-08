import { useEffect, useMemo, useRef, useState } from "react";
import { WORLD_MAP_SIZE, worldMap, worldNodes } from "../data/worldNodes.js";
import {
  NODE_EDITOR_DRAFT_KEY,
  addConnection,
  cloneNodes,
  copyTextToClipboard,
  downloadTextFile,
  exportNodesJson,
  exportWorldNodesModule,
  getBiomeColor,
  getDistance,
  getMapPointFromPointer,
  removeConnection,
  shiftAllNodes,
  updateNodeCoordinates,
  validateConnections,
} from "./nodeEditorUtils.js";
import "./nodeEditor.css";

const originalNodes = cloneNodes(worldNodes);
const originalNodeById = Object.fromEntries(originalNodes.map((node) => [node.id, node]));
const DEFAULT_LONG_CONNECTION_THRESHOLD = 250;

function getUniqueValues(nodes, field) {
  return [...new Set(nodes.map((node) => node[field]).filter(Boolean))].sort((a, b) => a.localeCompare(b, "ru"));
}

function isEditableElement(element) {
  return ["INPUT", "TEXTAREA", "SELECT"].includes(element?.tagName) || element?.isContentEditable;
}

export default function NodeEditor() {
  const [nodes, setNodes] = useState(() => cloneNodes(worldNodes));
  const [selectedNodeId, setSelectedNodeId] = useState(worldNodes[0]?.id || null);
  const [search, setSearch] = useState("");
  const [biomeFilter, setBiomeFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [connectionMode, setConnectionMode] = useState("selected");
  const [showLabels, setShowLabels] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [placeByClick, setPlaceByClick] = useState(false);
  const [manualPoint, setManualPoint] = useState({ x: "", y: "" });
  const [draggingNodeId, setDraggingNodeId] = useState(null);
  const [history, setHistory] = useState([]);
  const [exportMode, setExportMode] = useState("module");
  const [status, setStatus] = useState("");
  const [draftFound, setDraftFound] = useState(false);
  const [connectionIssues, setConnectionIssues] = useState([]);
  const [connectionDraft, setConnectionDraft] = useState("");
  const [autoBidirectional, setAutoBidirectional] = useState(true);
  const [shiftInput, setShiftInput] = useState({ x: "0", y: "0" });
  const [previewShift, setPreviewShift] = useState(null);
  const [cursorPoint, setCursorPoint] = useState(null);
  const dragStartRef = useRef(null);
  const mapCanvasRef = useRef(null);
  const viewportRef = useRef(null);

  const nodeById = useMemo(() => Object.fromEntries(nodes.map((node) => [node.id, node])), [nodes]);
  const selectedNode = selectedNodeId ? nodeById[selectedNodeId] : null;
  const biomes = useMemo(() => getUniqueValues(nodes, "biome"), [nodes]);
  const regions = useMemo(() => getUniqueValues(nodes, "region"), [nodes]);
  const exportText = useMemo(() => (exportMode === "json" ? exportNodesJson(nodes) : exportWorldNodesModule(nodes)), [exportMode, nodes]);
  const displayNodes = useMemo(() => {
    if (!previewShift) return nodes;
    return shiftAllNodes(nodes, previewShift);
  }, [nodes, previewShift]);
  const displayNodeById = useMemo(() => Object.fromEntries(displayNodes.map((node) => [node.id, node])), [displayNodes]);
  const selectedDisplayNode = selectedNodeId ? displayNodeById[selectedNodeId] : null;
  const selectedConnections = useMemo(() => {
    if (!selectedNode) return [];
    return (selectedNode.connections || []).map((targetId) => {
      const target = nodeById[targetId];
      return { id: targetId, node: target, distance: target ? getDistance(selectedNode, target) : null };
    });
  }, [nodeById, selectedNode]);
  const routeLines = useMemo(() => {
    if (connectionMode === "hidden") return [];
    const routes = [];
    const seen = new Set();
    const sourceNodes = connectionMode === "selected" && selectedDisplayNode ? [selectedDisplayNode] : displayNodes;

    for (const node of sourceNodes) {
      for (const targetId of node.connections || []) {
        const target = displayNodeById[targetId];
        if (!target) continue;
        const routeKey = [node.id, targetId].sort().join("--");
        if (connectionMode === "all" && seen.has(routeKey)) continue;
        seen.add(routeKey);
        routes.push({ key: `${connectionMode}-${routeKey}`, from: node, to: target });
      }
    }

    return routes;
  }, [connectionMode, displayNodeById, displayNodes, selectedDisplayNode]);

  const filteredNodes = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return nodes.filter((node) => {
      const matchesSearch = !normalizedSearch || node.name.toLowerCase().includes(normalizedSearch) || node.id.toLowerCase().includes(normalizedSearch);
      const matchesBiome = biomeFilter === "all" || node.biome === biomeFilter;
      const matchesRegion = regionFilter === "all" || node.region === regionFilter;
      return matchesSearch && matchesBiome && matchesRegion;
    });
  }, [biomeFilter, nodes, regionFilter, search]);

  useEffect(() => {
    setDraftFound(Boolean(localStorage.getItem(NODE_EDITOR_DRAFT_KEY)));
  }, []);

  useEffect(() => {
    if (selectedNode) setManualPoint({ x: String(selectedNode.x), y: String(selectedNode.y) });
  }, [selectedNode]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (!selectedNodeId || isEditableElement(event.target)) return;
      const deltas = {
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
      };
      const delta = deltas[event.key];
      if (!delta) return;
      const current = nodeById[selectedNodeId];
      if (!current) return;
      const step = event.shiftKey ? 10 : 1;
      event.preventDefault();
      moveNode(selectedNodeId, { x: current.x + delta.x * step, y: current.y + delta.y * step });
      setStatus(`${selectedNodeId}: x=${current.x + delta.x * step}, y=${current.y + delta.y * step}`);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nodeById, selectedNodeId]);

  function rememberMove(move) {
    setHistory((items) => [...items, move]);
  }

  function selectNode(nodeId, center = false) {
    setSelectedNodeId(nodeId);
    if (!center) return;

    const node = nodeById[nodeId];
    const viewport = viewportRef.current;
    if (!node || !viewport) return;

    viewport.scrollTo({
      left: Math.max(0, node.x - viewport.clientWidth / 2),
      top: Math.max(0, node.y - viewport.clientHeight / 2),
      behavior: "smooth",
    });
  }

  function moveNode(nodeId, point, shouldRemember = true) {
    const before = nodeById[nodeId];
    if (!before) return;
    const after = { x: point.x, y: point.y };
    if (shouldRemember && (before.x !== after.x || before.y !== after.y)) rememberMove({ type: "move", nodeId, before: { x: before.x, y: before.y }, after });
    setNodes((items) => updateNodeCoordinates(items, nodeId, after));
    setPreviewShift(null);
    setSelectedNodeId(nodeId);
  }

  function replaceNodes(nextNodes, historyEntry = null) {
    if (historyEntry) rememberMove(historyEntry);
    setNodes(cloneNodes(nextNodes));
    setPreviewShift(null);
  }

  function handleNodePointerDown(event, nodeId) {
    event.preventDefault();
    event.stopPropagation();
    setSelectedNodeId(nodeId);
    dragStartRef.current = nodeById[nodeId] ? { x: nodeById[nodeId].x, y: nodeById[nodeId].y } : null;
    setDraggingNodeId(nodeId);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handleNodePointerMove(event, nodeId) {
    updateCursorPoint(event);
    if (draggingNodeId !== nodeId || !mapCanvasRef.current) return;
    setNodes((items) => updateNodeCoordinates(items, nodeId, getMapPointFromPointer(event, mapCanvasRef.current)));
  }

  function handleNodePointerUp(event, nodeId) {
    if (draggingNodeId !== nodeId || !mapCanvasRef.current) return;
    const point = getMapPointFromPointer(event, mapCanvasRef.current);
    const before = dragStartRef.current || point;
    if (before.x !== point.x || before.y !== point.y) rememberMove({ type: "move", nodeId, before, after: point });
    setNodes((items) => updateNodeCoordinates(items, nodeId, point));
    setDraggingNodeId(null);
    dragStartRef.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);
  }

  function updateCursorPoint(event) {
    if (!mapCanvasRef.current) return;
    setCursorPoint(getMapPointFromPointer(event, mapCanvasRef.current));
  }

  function handleCanvasClick(event) {
    if (!placeByClick || !selectedNodeId || !mapCanvasRef.current || event.target.closest(".editor-node")) return;
    moveNode(selectedNodeId, getMapPointFromPointer(event, mapCanvasRef.current));
    setPlaceByClick(false);
  }

  function applyManualPoint() {
    if (!selectedNodeId) return;
    const x = Math.round(Number(manualPoint.x));
    const y = Math.round(Number(manualPoint.y));
    if (Number.isNaN(x) || Number.isNaN(y)) {
      setStatus("Введите числовые координаты x/y.");
      return;
    }
    moveNode(selectedNodeId, { x, y });
    setStatus(`Координаты ${selectedNodeId} обновлены: ${x}, ${y}.`);
  }

  function saveDraft() {
    localStorage.setItem(NODE_EDITOR_DRAFT_KEY, JSON.stringify({ nodes, shiftInput, previewShift }));
    setDraftFound(true);
    setStatus("Черновик сохранён в localStorage.");
  }

  function loadDraft() {
    const rawDraft = localStorage.getItem(NODE_EDITOR_DRAFT_KEY);
    if (!rawDraft) {
      setStatus("Черновик не найден.");
      setDraftFound(false);
      return;
    }

    try {
      const draft = JSON.parse(rawDraft);
      const draftNodes = Array.isArray(draft) ? draft : draft.nodes;
      setNodes(cloneNodes(draftNodes));
      setSelectedNodeId(draftNodes[0]?.id || null);
      setShiftInput(draft.shiftInput || { x: "0", y: "0" });
      setPreviewShift(draft.previewShift || null);
      setHistory([]);
      setStatus("Черновик загружен.");
    } catch {
      setStatus("Не удалось прочитать черновик.");
    }
  }

  function clearDraft() {
    localStorage.removeItem(NODE_EDITOR_DRAFT_KEY);
    setDraftFound(false);
    setStatus("Черновик удалён.");
  }

  function resetDraftAndLoadFile() {
    clearDraft();
    setNodes(cloneNodes(originalNodes));
    setSelectedNodeId(originalNodes[0]?.id || null);
    setHistory([]);
    setPreviewShift(null);
    setShiftInput({ x: "0", y: "0" });
    setStatus("Черновик сброшен, загружены данные из src/data/worldNodes.js.");
  }

  function undoLastMove() {
    const lastMove = history.at(-1);
    if (!lastMove) {
      setStatus("История перемещений пуста.");
      return;
    }

    if (lastMove.type === "move") {
      setNodes((items) => updateNodeCoordinates(items, lastMove.nodeId, lastMove.before));
      setSelectedNodeId(lastMove.nodeId);
    } else if (lastMove.type === "bulk" || lastMove.type === "connections") {
      setNodes(cloneNodes(lastMove.beforeNodes));
    }

    setPreviewShift(null);
    setHistory((items) => items.slice(0, -1));
    setStatus("Последнее изменение отменено.");
  }

  function resetSelectedNode() {
    if (!selectedNodeId) return;
    const original = originalNodeById[selectedNodeId];
    if (!original) return;
    moveNode(selectedNodeId, { x: original.x, y: original.y });
    setStatus(`Точка ${selectedNodeId} сброшена к исходным координатам.`);
  }

  function resetAllNodes() {
    replaceNodes(originalNodes, { type: "bulk", beforeNodes: nodes, afterNodes: originalNodes });
    setHistory([]);
    setStatus("Все точки сброшены к данным из src/data/worldNodes.js.");
  }

  function removeSelectedConnection(targetId) {
    if (!selectedNodeId) return;
    const nextNodes = removeConnection(nodes, selectedNodeId, targetId, false);
    replaceNodes(nextNodes, { type: "connections", beforeNodes: nodes, afterNodes: nextNodes });
    setStatus(`Связь ${selectedNodeId} → ${targetId} удалена.`);
  }

  function addSelectedConnection() {
    const targetId = connectionDraft.trim();
    if (!selectedNodeId || !targetId) return;
    if (!nodeById[targetId]) {
      setStatus(`Точка ${targetId} не найдена.`);
      return;
    }
    const nextNodes = addConnection(nodes, selectedNodeId, targetId, autoBidirectional);
    replaceNodes(nextNodes, { type: "connections", beforeNodes: nodes, afterNodes: nextNodes });
    setConnectionDraft("");
    setStatus(`Связь ${selectedNodeId} → ${targetId} добавлена${autoBidirectional ? " с обратной связью" : ""}.`);
  }

  function parseShift() {
    const x = Math.round(Number(shiftInput.x));
    const y = Math.round(Number(shiftInput.y));
    if (Number.isNaN(x) || Number.isNaN(y)) {
      setStatus("Введите числовые Shift X/Y.");
      return null;
    }
    return { x, y };
  }

  function previewMassShift() {
    const shift = parseShift();
    if (!shift) return;
    setPreviewShift(shift);
    setStatus(`Preview shift: x=${shift.x}, y=${shift.y}. Экспорт пока не изменён.`);
  }

  function applyMassShift() {
    const shift = parseShift();
    if (!shift) return;
    const nextNodes = shiftAllNodes(nodes, shift);
    replaceNodes(nextNodes, { type: "bulk", beforeNodes: nodes, afterNodes: nextNodes });
    setStatus(`Массовый сдвиг применён: x=${shift.x}, y=${shift.y}.`);
  }

  function resetShiftPreview() {
    setPreviewShift(null);
    setStatus("Preview shift сброшен.");
  }

  function runConnectionCheck() {
    const issues = validateConnections(nodes, DEFAULT_LONG_CONNECTION_THRESHOLD);
    setConnectionIssues(issues);
    setStatus(issues.length ? `Проверка связей: найдено ${issues.length} замечаний.` : "Проверка связей: замечаний нет.");
  }

  async function copyExport() {
    await copyTextToClipboard(exportText);
    setStatus("Экспорт скопирован в буфер обмена.");
  }

  return (
    <main className="node-editor-shell">
      <aside className="node-editor-sidebar">
        <header>
          <h1>Node Editor</h1>
          <p>Dev-инструмент для ручной расстановки точек глобальной карты.</p>
        </header>

        {worldNodes.length < 50 && (
          <section className="editor-card data-warning-card">
            <strong>Загружено только {worldNodes.length} точек.</strong>
            <p>Это похоже на тестовый набор. Если `legacy/map_nodes_correct.js` есть в проекте, замените `src/data/worldNodes.js` полным экспортом из legacy-файла или экспортом этого редактора.</p>
          </section>
        )}

        {draftFound && (
          <section className="editor-card draft-card">
            <strong>Найден черновик расстановки точек.</strong>
            <button onClick={loadDraft}>Загрузить?</button>
          </section>
        )}

        <section className="editor-card editor-filters">
          <label>Поиск<input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="id или название" /></label>
          <label>Биом<select value={biomeFilter} onChange={(event) => setBiomeFilter(event.target.value)}><option value="all">Все биомы</option>{biomes.map((biome) => <option key={biome} value={biome}>{biome}</option>)}</select></label>
          <label>Регион<select value={regionFilter} onChange={(event) => setRegionFilter(event.target.value)}><option value="all">Все регионы</option>{regions.map((region) => <option key={region} value={region}>{region}</option>)}</select></label>
        </section>

        <section className="editor-card editor-toggles">
          <fieldset>
            <legend>Связи</legend>
            <label><input type="radio" checked={connectionMode === "all"} onChange={() => setConnectionMode("all")} /> Показывать все связи</label>
            <label><input type="radio" checked={connectionMode === "selected"} onChange={() => setConnectionMode("selected")} /> Показывать только связи выбранной точки</label>
            <label><input type="radio" checked={connectionMode === "hidden"} onChange={() => setConnectionMode("hidden")} /> Скрыть связи</label>
          </fieldset>
          <label><input type="checkbox" checked={showLabels} onChange={(event) => setShowLabels(event.target.checked)} /> Показывать подписи</label>
          <label><input type="checkbox" checked={showGrid} onChange={(event) => setShowGrid(event.target.checked)} /> Показать сетку</label>
          <button className={placeByClick ? "active-tool" : ""} disabled={!selectedNodeId} onClick={() => setPlaceByClick((value) => !value)}>Поставить выбранную точку кликом</button>
        </section>

        <section className="editor-card selected-node-card">
          <h2>Выбранная точка</h2>
          {selectedNode ? (
            <>
              <dl><dt>id</dt><dd>{selectedNode.id}</dd><dt>name</dt><dd>{selectedNode.name}</dd><dt>biome</dt><dd>{selectedNode.biome}</dd><dt>region</dt><dd>{selectedNode.region}</dd><dt>danger</dt><dd>{selectedNode.danger}</dd></dl>
              <div className="coordinate-inputs"><label>x <input type="number" value={manualPoint.x} onChange={(event) => setManualPoint((point) => ({ ...point, x: event.target.value }))} /></label><label>y <input type="number" value={manualPoint.y} onChange={(event) => setManualPoint((point) => ({ ...point, y: event.target.value }))} /></label><button onClick={applyManualPoint}>Apply</button></div>
            </>
          ) : <p>Выберите точку.</p>}
        </section>

        <section className="editor-card selected-connections-card">
          <h2>Связи выбранной точки</h2>
          {selectedNode ? (
            <>
              <div className="connection-list">
                {selectedConnections.length ? selectedConnections.map((connection) => (
                  <div key={connection.id} className={connection.node ? "" : "missing-connection"}>
                    <span><strong>{connection.id}</strong>{connection.node ? ` · ${connection.node.name} · ${connection.distance}px` : " · точка не найдена"}</span>
                    <button onClick={() => removeSelectedConnection(connection.id)}>Удалить</button>
                  </div>
                )) : <p>Связей нет.</p>}
              </div>
              <label>Добавить связь по id<input value={connectionDraft} onChange={(event) => setConnectionDraft(event.target.value)} placeholder="target_node_id" /></label>
              <label><input type="checkbox" checked={autoBidirectional} onChange={(event) => setAutoBidirectional(event.target.checked)} /> Добавлять обратную связь автоматически</label>
              <button onClick={addSelectedConnection}>Добавить связь</button>
            </>
          ) : <p>Выберите точку.</p>}
        </section>

        <section className="editor-card bulk-shift-card">
          <h2>Массовая коррекция</h2>
          <div className="coordinate-inputs"><label>Shift X<input type="number" value={shiftInput.x} onChange={(event) => setShiftInput((shift) => ({ ...shift, x: event.target.value }))} /></label><label>Shift Y<input type="number" value={shiftInput.y} onChange={(event) => setShiftInput((shift) => ({ ...shift, y: event.target.value }))} /></label></div>
          <div className="editor-actions compact"><button onClick={previewMassShift}>Preview shift</button><button onClick={applyMassShift}>Apply shift to all nodes</button><button onClick={resetShiftPreview}>Reset preview</button></div>
          {previewShift && <p className="panel-hint">Preview: x={previewShift.x}, y={previewShift.y}. Для экспорта нажмите Apply.</p>}
        </section>

        <section className="editor-card editor-actions">
          <button onClick={saveDraft}>Save Draft</button><button onClick={loadDraft}>Load Draft</button><button onClick={clearDraft}>Clear Draft</button><button onClick={resetDraftAndLoadFile}>Сбросить черновик и загрузить данные из файла</button><button onClick={undoLastMove}>Undo last move</button><button onClick={resetSelectedNode} disabled={!selectedNodeId}>Reset selected node</button><button onClick={resetAllNodes}>Reset all to original</button>
        </section>

        <section className="editor-card connection-check-card">
          <h2>Проверка связей</h2>
          <button onClick={runConnectionCheck}>Проверить связи</button>
          <small>Порог длинной связи: {DEFAULT_LONG_CONNECTION_THRESHOLD}px.</small>
          <div className="connection-issues">{connectionIssues.length ? connectionIssues.map((issue, index) => <p key={`${issue.type}-${index}`} className={`issue-${issue.severity}`}>{issue.message}</p>) : <p>Проверка ещё не запускалась или замечаний нет.</p>}</div>
        </section>

        <section className="editor-card node-list-card">
          <h2>Список точек ({filteredNodes.length}/{nodes.length})</h2>
          <div className="node-list">{filteredNodes.map((node) => <button key={node.id} className={node.id === selectedNodeId ? "selected" : ""} onClick={() => selectNode(node.id, true)}><strong>{node.name}</strong><span>{node.id}</span><small>{node.biome} · {node.region} · danger {node.danger} · x {node.x}, y {node.y}</small></button>)}</div>
        </section>
      </aside>

      <section className="node-editor-main">
        <div className="editor-toolbar"><strong>Карта: {WORLD_MAP_SIZE.width}×{WORLD_MAP_SIZE.height} · worldNodes loaded: {worldNodes.length}</strong><span>{cursorPoint ? `cursor: x=${cursorPoint.x}, y=${cursorPoint.y}` : "cursor: —"}</span><span>{status}</span></div>
        <div className="editor-map-viewport" ref={viewportRef}>
          <div className={`editor-map-canvas ${placeByClick ? "place-by-click" : ""}`} ref={mapCanvasRef} style={{ width: `${WORLD_MAP_SIZE.width}px`, height: `${WORLD_MAP_SIZE.height}px` }} onClick={handleCanvasClick} onPointerMove={updateCursorPoint} onPointerLeave={() => setCursorPoint(null)}>
            <img src={worldMap.background} alt="Карта мира" className="editor-map-image" onError={(event) => event.currentTarget.classList.add("is-missing")} />
            <div className="editor-map-fallback">Файл карты мира не найден. Положите изображение в public/assets/maps/world_map.png.</div>
            {showGrid && <div className="editor-grid-layer" aria-hidden="true" />}
            {connectionMode !== "hidden" && <svg className="editor-route-layer" viewBox={`0 0 ${WORLD_MAP_SIZE.width} ${WORLD_MAP_SIZE.height}`} aria-hidden="true">{routeLines.map((route) => <line key={route.key} x1={route.from.x} y1={route.from.y} x2={route.to.x} y2={route.to.y} />)}</svg>}
            <div className={`editor-node-layer ${showLabels ? "show-all-labels" : ""}`}>
              {displayNodes.map((node) => {
                const isSelected = node.id === selectedNodeId;
                return <button key={node.id} className={`editor-node ${isSelected ? "selected" : ""}`} style={{ left: `${node.x}px`, top: `${node.y}px`, "--node-color": getBiomeColor(node.biome) }} onPointerDown={(event) => handleNodePointerDown(event, node.id)} onPointerMove={(event) => handleNodePointerMove(event, node.id)} onPointerUp={(event) => handleNodePointerUp(event, node.id)} onClick={(event) => { event.stopPropagation(); selectNode(node.id); }} title={`${node.name}: ${node.x}, ${node.y}`}><span className="editor-node-dot" /><span className="editor-node-label">{node.name}</span></button>;
              })}
            </div>
          </div>
        </div>
        <section className="editor-export-panel"><header><h2>Export</h2><div className="export-buttons"><button onClick={() => setExportMode("json")}>Export JSON</button><button onClick={() => setExportMode("module")}>Export worldNodes.js</button><button onClick={copyExport}>Copy to Clipboard</button><button onClick={() => downloadTextFile(exportMode === "json" ? "worldNodes.json" : "worldNodes.js", exportText)}>Download {exportMode === "json" ? "JSON" : "worldNodes.js"}</button></div></header><textarea readOnly value={exportText} /></section>
      </section>
    </main>
  );
}
