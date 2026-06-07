import { WORLD_MAP_SIZE, worldMap } from "../data/worldNodes.js";

export const NODE_EDITOR_DRAFT_KEY = "eyra_node_editor_draft";

export const BIOME_COLORS = {
  city: "#ffd166",
  road: "#c084fc",
  forest: "#57cc99",
  plain: "#b5e48c",
  mountain: "#b08968",
  sea: "#4dabf7",
  desert: "#f4a261",
  swamp: "#87986a",
  rift: "#ef476f",
  ruins: "#adb5bd",
  temple: "#f8f9fa",
  wilds: "#95d5b2",
  wall: "#ced4da",
  default: "#adb5bd",
};

export function cloneNodes(nodes) {
  return nodes.map((node) => ({ ...node, connections: [...(node.connections || [])] }));
}

export function getBiomeColor(biome) {
  return BIOME_COLORS[biome] || BIOME_COLORS.default;
}

export function getMapPointFromPointer(event, canvasElement) {
  const rect = canvasElement.getBoundingClientRect();
  const x = Math.round((event.clientX - rect.left) * (WORLD_MAP_SIZE.width / rect.width));
  const y = Math.round((event.clientY - rect.top) * (WORLD_MAP_SIZE.height / rect.height));

  return {
    x: Math.max(0, Math.min(WORLD_MAP_SIZE.width, x)),
    y: Math.max(0, Math.min(WORLD_MAP_SIZE.height, y)),
  };
}

export function updateNodeCoordinates(nodes, nodeId, point) {
  return nodes.map((node) => (node.id === nodeId ? { ...node, x: point.x, y: point.y } : node));
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
