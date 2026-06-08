import { WORLD_MAP_SIZE, worldMap } from "../data/worldNodes.js";
import { biomeColors, getBiomeColor } from "../data/biomeColors.js";

export const NODE_EDITOR_DRAFT_KEY = "eyra_node_editor_draft";
export const LONG_CONNECTION_THRESHOLD = 250;

export const BIOME_COLORS = biomeColors;

export function cloneNodes(nodes) {
  return nodes.map((node) => ({ ...node, connections: [...(node.connections || [])] }));
}

export { getBiomeColor };

export function clampPoint(point) {
  return {
    x: Math.max(0, Math.min(WORLD_MAP_SIZE.width, Math.round(point.x))),
    y: Math.max(0, Math.min(WORLD_MAP_SIZE.height, Math.round(point.y))),
  };
}

export function getMapPointFromPointer(event, canvasElement) {
  const rect = canvasElement.getBoundingClientRect();
  return clampPoint({
    x: (event.clientX - rect.left) * (WORLD_MAP_SIZE.width / rect.width),
    y: (event.clientY - rect.top) * (WORLD_MAP_SIZE.height / rect.height),
  });
}

export function getDistance(from, to) {
  if (!from || !to) return 0;
  return Math.round(Math.hypot(to.x - from.x, to.y - from.y));
}

export function updateNodeCoordinates(nodes, nodeId, point) {
  const nextPoint = clampPoint(point);
  return nodes.map((node) => (node.id === nodeId ? { ...node, ...nextPoint } : node));
}

export function shiftAllNodes(nodes, shift) {
  return nodes.map((node) => ({ ...node, ...clampPoint({ x: node.x + shift.x, y: node.y + shift.y }) }));
}

export function addConnection(nodes, fromId, toId, bidirectional = true) {
  if (!fromId || !toId || fromId === toId) return nodes;
  const nodeIds = new Set(nodes.map((node) => node.id));
  if (!nodeIds.has(fromId) || !nodeIds.has(toId)) return nodes;

  return nodes.map((node) => {
    if (node.id === fromId) {
      const connections = new Set(node.connections || []);
      connections.add(toId);
      return { ...node, connections: [...connections] };
    }
    if (bidirectional && node.id === toId) {
      const connections = new Set(node.connections || []);
      connections.add(fromId);
      return { ...node, connections: [...connections] };
    }
    return node;
  });
}

export function removeConnection(nodes, fromId, toId, bidirectional = false) {
  return nodes.map((node) => {
    if (node.id === fromId || (bidirectional && node.id === toId)) {
      const removeId = node.id === fromId ? toId : fromId;
      return { ...node, connections: (node.connections || []).filter((id) => id !== removeId) };
    }
    return node;
  });
}

export function validateConnections(nodes, longConnectionThreshold = LONG_CONNECTION_THRESHOLD) {
  const nodeById = Object.fromEntries(nodes.map((node) => [node.id, node]));
  const issues = [];
  const seenLongRoutes = new Set();

  for (const node of nodes) {
    for (const targetId of node.connections || []) {
      const target = nodeById[targetId];
      if (!target) {
        issues.push({ type: "missing", severity: "error", message: `${node.id} → ${targetId}: точка не найдена` });
        continue;
      }

      if (!(target.connections || []).includes(node.id)) {
        issues.push({ type: "one_way", severity: "warning", message: `${node.id} содержит ${targetId} в connections, но ${targetId} не содержит ${node.id}` });
      }

      const routeKey = [node.id, targetId].sort().join("--");
      const distance = getDistance(node, target);
      if (distance > longConnectionThreshold && !seenLongRoutes.has(routeKey)) {
        seenLongRoutes.add(routeKey);
        issues.push({ type: "long", severity: "suspicious", message: `${node.id} → ${targetId}: слишком длинная связь, ${distance}px` });
      }
    }
  }

  return issues;
}

export function formatNodeForModule(node) {
  const orderedNode = {
    id: node.id,
    name: node.name,
    x: node.x,
    y: node.y,
    biome: node.biome,
    region: node.region,
    danger: node.danger,
    connections: node.connections || [],
  };

  return `  ${JSON.stringify(orderedNode)}`;
}

export function exportNodesJson(nodes) {
  return JSON.stringify(nodes, null, 2);
}

export function exportWorldNodesModule(nodes) {
  return `export const WORLD_MAP_SIZE = {\n  width: ${WORLD_MAP_SIZE.width},\n  height: ${WORLD_MAP_SIZE.height},\n};\n\nexport const worldMap = {\n  background: "${worldMap.background}",\n  ...WORLD_MAP_SIZE,\n};\n\nexport const worldNodes = [\n${nodes.map(formatNodeForModule).join(",\n")}\n];\n\nexport const worldNodeById = Object.fromEntries(\n  worldNodes.map((node) => [node.id, node])\n);\n`;
}

export function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type: "text/javascript;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export async function copyTextToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}
