import { useEffect, useMemo, useRef, useState } from "react";
import { WORLD_MAP_SIZE, worldMap, worldNodes } from "../data/worldNodes.js";
import {
  NODE_EDITOR_DRAFT_KEY,
  cloneNodes,
  copyTextToClipboard,
  downloadTextFile,
  exportNodesJson,
  exportWorldNodesModule,
  getBiomeColor,
  getMapPointFromPointer,
  updateNodeCoordinates,
} from "./nodeEditorUtils.js";
import "./nodeEditor.css";

const originalNodes = cloneNodes(worldNodes);
const originalNodeById = Object.fromEntries(originalNodes.map((node) => [node.id, node]));

function getUniqueValues(nodes, field) {
  return [...new Set(nodes.map((node) => node[field]).filter(Boolean))].sort((a, b) => a.localeCompare(b, "ru"));
}

export default function NodeEditor() {
  const [nodes, setNodes] = useState(() => cloneNodes(worldNodes));
  const [selectedNodeId, setSelectedNodeId] = useState(worldNodes[0]?.id || null);
  const [search, setSearch] = useState("");
  const [biomeFilter, setBiomeFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [showRoutes, setShowRoutes] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [placeByClick, setPlaceByClick] = useState(false);
  const [manualPoint, setManualPoint] = useState({ x: "", y: "" });
  const [draggingNodeId, setDraggingNodeId] = useState(null);
  const [history, setHistory] = useState([]);
  const dragStartRef = useRef(null);
  const [exportMode, setExportMode] = useState("module");
  const [status, setStatus] = useState("");
  const [draftFound, setDraftFound] = useState(false);
  const mapCanvasRef = useRef(null);
  const viewportRef = useRef(null);

  const nodeById = useMemo(() => Object.fromEntries(nodes.map((node) => [node.id, node])), [nodes]);
  const selectedNode = selectedNodeId ? nodeById[selectedNodeId] : null;
  const biomes = useMemo(() => getUniqueValues(nodes, "biome"), [nodes]);
  const regions = useMemo(() => getUniqueValues(nodes, "region"), [nodes]);
  const exportText = useMemo(() => (exportMode === "json" ? exportNodesJson(nodes) : exportWorldNodesModule(nodes)), [exportMode, nodes]);
  const routeLines = useMemo(() => {
    const seen = new Set();
    return nodes.flatMap((node) => (node.connections || []).map((targetId) => {
      const target = nodeById[targetId];
      if (!target) return null;
      const routeKey = [node.id, targetId].sort().join("--");
      if (seen.has(routeKey)) return null;
      seen.add(routeKey);
      return { key: routeKey, from: node, to: target };
    }).filter(Boolean));
  }, [nodeById, nodes]);

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

  function rememberMove(nodeId, before, after) {
    if (!before || !after || (before.x === after.x && before.y === after.y)) return;
    setHistory((items) => [...items, { nodeId, before, after }]);
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
    if (shouldRemember) rememberMove(nodeId, { x: before.x, y: before.y }, after);
    setNodes((items) => updateNodeCoordinates(items, nodeId, after));
    setSelectedNodeId(nodeId);
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
    if (draggingNodeId !== nodeId || !mapCanvasRef.current) return;
    const point = getMapPointFromPointer(event, mapCanvasRef.current);
    setNodes((items) => updateNodeCoordinates(items, nodeId, point));
  }

  function handleNodePointerUp(event, nodeId) {
    if (draggingNodeId !== nodeId || !mapCanvasRef.current) return;
    const point = getMapPointFromPointer(event, mapCanvasRef.current);
    rememberMove(nodeId, dragStartRef.current || point, point);
    setNodes((items) => updateNodeCoordinates(items, nodeId, point));
    setDraggingNodeId(null);
    dragStartRef.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);
  }

  function handleCanvasClick(event) {
    if (!placeByClick || !selectedNodeId || !mapCanvasRef.current || event.target.closest(".editor-node")) return;
    moveNode(selectedNodeId, getMapPointFromPointer(event, mapCanvasRef.current));
    setPlaceByClick(false);
  }

  function applyManualPoint() {
    if (!selectedNodeId) return;
    const x = Math.max(0, Math.min(WORLD_MAP_SIZE.width, Math.round(Number(manualPoint.x))));
    const y = Math.max(0, Math.min(WORLD_MAP_SIZE.height, Math.round(Number(manualPoint.y))));
    if (Number.isNaN(x) || Number.isNaN(y)) {
      setStatus("Введите числовые координаты x/y.");
      return;
    }
    moveNode(selectedNodeId, { x, y });
    setStatus(`Координаты ${selectedNodeId} обновлены: ${x}, ${y}.`);
  }

  function saveDraft() {
    localStorage.setItem(NODE_EDITOR_DRAFT_KEY, JSON.stringify(nodes));
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
      const draftNodes = JSON.parse(rawDraft);
      setNodes(cloneNodes(draftNodes));
      setSelectedNodeId(draftNodes[0]?.id || null);
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

  function undoLastMove() {
    const lastMove = history.at(-1);
    if (!lastMove) {
      setStatus("История перемещений пуста.");
      return;
    }
    setNodes((items) => updateNodeCoordinates(items, lastMove.nodeId, lastMove.before));
    setSelectedNodeId(lastMove.nodeId);
    setHistory((items) => items.slice(0, -1));
    setStatus(`Отменено перемещение ${lastMove.nodeId}.`);
  }

  function resetSelectedNode() {
    if (!selectedNodeId) return;
    const original = originalNodeById[selectedNodeId];
    if (!original) return;
    moveNode(selectedNodeId, { x: original.x, y: original.y });
    setStatus(`Точка ${selectedNodeId} сброшена к исходным координатам.`);
  }

  function resetAllNodes() {
    setNodes(cloneNodes(originalNodes));
    setHistory([]);
    setStatus("Все точки сброшены к данным из src/data/worldNodes.js.");
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

        {draftFound && (
          <section className="editor-card draft-card">
            <strong>Найден черновик расстановки точек.</strong>
            <button onClick={loadDraft}>Загрузить?</button>
          </section>
        )}

        <section className="editor-card editor-filters">
          <label>
            Поиск
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="id или название" />
          </label>
          <label>
            Биом
            <select value={biomeFilter} onChange={(event) => setBiomeFilter(event.target.value)}>
              <option value="all">Все биомы</option>
              {biomes.map((biome) => <option key={biome} value={biome}>{biome}</option>)}
            </select>
          </label>
          <label>
            Регион
            <select value={regionFilter} onChange={(event) => setRegionFilter(event.target.value)}>
              <option value="all">Все регионы</option>
              {regions.map((region) => <option key={region} value={region}>{region}</option>)}
            </select>
          </label>
        </section>

        <section className="editor-card editor-toggles">
          <label><input type="checkbox" checked={showRoutes} onChange={(event) => setShowRoutes(event.target.checked)} /> Показывать связи</label>
          <label><input type="checkbox" checked={showLabels} onChange={(event) => setShowLabels(event.target.checked)} /> Показывать подписи</label>
          <button className={placeByClick ? "active-tool" : ""} disabled={!selectedNodeId} onClick={() => setPlaceByClick((value) => !value)}>Поставить выбранную точку кликом</button>
        </section>

        <section className="editor-card selected-node-card">
          <h2>Выбранная точка</h2>
          {selectedNode ? (
            <>
              <dl>
                <dt>id</dt><dd>{selectedNode.id}</dd>
                <dt>name</dt><dd>{selectedNode.name}</dd>
                <dt>biome</dt><dd>{selectedNode.biome}</dd>
                <dt>region</dt><dd>{selectedNode.region}</dd>
                <dt>danger</dt><dd>{selectedNode.danger}</dd>
              </dl>
              <div className="coordinate-inputs">
                <label>x <input type="number" value={manualPoint.x} onChange={(event) => setManualPoint((point) => ({ ...point, x: event.target.value }))} /></label>
                <label>y <input type="number" value={manualPoint.y} onChange={(event) => setManualPoint((point) => ({ ...point, y: event.target.value }))} /></label>
                <button onClick={applyManualPoint}>Apply</button>
              </div>
            </>
          ) : <p>Выберите точку.</p>}
        </section>

        <section className="editor-card editor-actions">
          <button onClick={saveDraft}>Save Draft</button>
          <button onClick={loadDraft}>Load Draft</button>
          <button onClick={clearDraft}>Clear Draft</button>
          <button onClick={undoLastMove}>Undo last move</button>
          <button onClick={resetSelectedNode} disabled={!selectedNodeId}>Reset selected node</button>
          <button onClick={resetAllNodes}>Reset all to original</button>
        </section>

        <section className="editor-card node-list-card">
          <h2>Список точек ({filteredNodes.length}/{nodes.length})</h2>
          <div className="node-list">
            {filteredNodes.map((node) => (
              <button key={node.id} className={node.id === selectedNodeId ? "selected" : ""} onClick={() => selectNode(node.id, true)}>
                <strong>{node.name}</strong>
                <span>{node.id}</span>
                <small>{node.biome} · {node.region} · danger {node.danger} · x {node.x}, y {node.y}</small>
              </button>
            ))}
          </div>
        </section>
      </aside>

      <section className="node-editor-main">
        <div className="editor-toolbar">
          <strong>Карта: {WORLD_MAP_SIZE.width}×{WORLD_MAP_SIZE.height}</strong>
          <span>{status}</span>
        </div>

        <div className="editor-map-viewport" ref={viewportRef}>
          <div
            className={`editor-map-canvas ${placeByClick ? "place-by-click" : ""}`}
            ref={mapCanvasRef}
            style={{ width: `${WORLD_MAP_SIZE.width}px`, height: `${WORLD_MAP_SIZE.height}px` }}
            onClick={handleCanvasClick}
          >
            <img src={worldMap.background} alt="Карта мира" className="editor-map-image" onError={(event) => event.currentTarget.classList.add("is-missing")} />
            <div className="editor-map-fallback">Файл карты мира не найден. Положите изображение в public/assets/maps/world_map.png.</div>

            {showRoutes && (
              <svg className="editor-route-layer" viewBox={`0 0 ${WORLD_MAP_SIZE.width} ${WORLD_MAP_SIZE.height}`} aria-hidden="true">
                {routeLines.map((route) => <line key={route.key} x1={route.from.x} y1={route.from.y} x2={route.to.x} y2={route.to.y} />)}
              </svg>
            )}

            <div className="editor-node-layer">
              {nodes.map((node) => {
                const isSelected = node.id === selectedNodeId;
                return (
                  <button
                    key={node.id}
                    className={`editor-node ${isSelected ? "selected" : ""}`}
                    style={{ left: `${node.x}px`, top: `${node.y}px`, "--node-color": getBiomeColor(node.biome) }}
                    onPointerDown={(event) => handleNodePointerDown(event, node.id)}
                    onPointerMove={(event) => handleNodePointerMove(event, node.id)}
                    onPointerUp={(event) => handleNodePointerUp(event, node.id)}
                    onClick={(event) => { event.stopPropagation(); selectNode(node.id); }}
                    title={`${node.name}: ${node.x}, ${node.y}`}
                  >
                    <span className="editor-node-dot" />
                    {(showLabels || isSelected) && <span className="editor-node-label">{node.name}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <section className="editor-export-panel">
          <header>
            <h2>Export</h2>
            <div className="export-buttons">
              <button onClick={() => setExportMode("json")}>Export JSON</button>
              <button onClick={() => setExportMode("module")}>Export worldNodes.js</button>
              <button onClick={copyExport}>Copy to Clipboard</button>
              <button onClick={() => downloadTextFile(exportMode === "json" ? "worldNodes.json" : "worldNodes.js", exportText)}>Download {exportMode === "json" ? "JSON" : "worldNodes.js"}</button>
            </div>
          </header>
          <textarea readOnly value={exportText} />
        </section>
      </section>
    </main>
  );
}
