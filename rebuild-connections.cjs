const fs = require("fs");

const filePath = "src/data/worldNodes.js";
const backupPath = `src/data/worldNodes.backup.${Date.now()}.js`;

const text = fs.readFileSync(filePath, "utf8");

const match = text.match(/export const worldNodes\s*=\s*(\[[\s\S]*?\]);\s*\n\s*export const worldNodeById/);

if (!match) {
  console.error("Не смог найти массив worldNodes в src/data/worldNodes.js");
  process.exit(1);
}

const nodes = new Function(`return (${match[1]});`)();

if (!Array.isArray(nodes) || nodes.length < 20) {
  console.error("worldNodes выглядит неполным. Найдено точек:", Array.isArray(nodes) ? nodes.length : "не массив");
  process.exit(1);
}

fs.writeFileSync(backupPath, text, "utf8");

const nodeById = Object.fromEntries(nodes.map((node) => [node.id, node]));

const seaNamePattern = /море|берег|бухт|порт|риф|остров|кей|скал|ут[её]с|залив|пролив|пристан|harbor|port|bay|reef|island|coast|sea|cliff|key/i;

function isSeaLike(node) {
  return node.biome === "sea" || seaNamePattern.test(node.name || "") || seaNamePattern.test(node.id || "");
}

function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function targetDegree(node) {
  if (node.biome === "city") return 5;
  if (node.biome === "road") return 5;
  if (node.biome === "sea") return 3;
  if (node.biome === "mountain") return 3;
  if (node.biome === "desert") return 3;
  if (node.biome === "rift") return 3;
  return 4;
}

function maxAllowedDistance(a, b) {
  const sameRegion = a.region === b.region;
  const seaA = isSeaLike(a);
  const seaB = isSeaLike(b);

  if (seaA || seaB) {
    if (seaA && seaB) return 190;
    return 85;
  }

  if (a.biome === "road" || b.biome === "road") {
    return sameRegion ? 175 : 135;
  }

  if (a.biome === "city" || b.biome === "city") {
    return sameRegion ? 170 : 130;
  }

  if (sameRegion) return 155;

  return 115;
}

function canConnect(a, b, distance) {
  if (a.id === b.id) return false;

  const seaA = isSeaLike(a);
  const seaB = isSeaLike(b);

  if ((seaA || seaB) && !(seaA && seaB)) {
    return distance <= maxAllowedDistance(a, b);
  }

  return distance <= maxAllowedDistance(a, b);
}

const graph = Object.fromEntries(nodes.map((node) => [node.id, new Set()]));

const pairs = [];

for (let i = 0; i < nodes.length; i++) {
  for (let j = i + 1; j < nodes.length; j++) {
    const a = nodes[i];
    const b = nodes[j];
    const distance = Math.round(dist(a, b));

    pairs.push({
      a: a.id,
      b: b.id,
      distance,
      sameRegion: a.region === b.region,
      allowed: canConnect(a, b, distance),
    });
  }
}

pairs.sort((p1, p2) => p1.distance - p2.distance);

function addEdge(a, b) {
  if (!nodeById[a] || !nodeById[b] || a === b) return false;
  graph[a].add(b);
  graph[b].add(a);
  return true;
}

function degree(id) {
  return graph[id].size;
}

// 1. Базово соединяем каждую точку с ближайшими разрешёнными соседями.
for (const node of nodes) {
  const candidates = pairs
    .filter((pair) => pair.allowed && (pair.a === node.id || pair.b === node.id))
    .map((pair) => ({
      id: pair.a === node.id ? pair.b : pair.a,
      distance: pair.distance,
    }))
    .filter((candidate) => candidate.id !== node.id)
    .sort((a, b) => a.distance - b.distance);

  for (const candidate of candidates) {
    if (degree(node.id) >= targetDegree(node)) break;

    const other = nodeById[candidate.id];

    if (degree(candidate.id) > targetDegree(other) + 1) continue;

    addEdge(node.id, candidate.id);
  }
}

// 2. Убираем тупики: минимум 2 связи, если рядом есть кандидаты.
for (const node of nodes) {
  while (degree(node.id) < 2) {
    const candidates = pairs
      .filter((pair) => pair.allowed && (pair.a === node.id || pair.b === node.id))
      .map((pair) => ({
        id: pair.a === node.id ? pair.b : pair.a,
        distance: pair.distance,
      }))
      .filter((candidate) => candidate.id !== node.id && !graph[node.id].has(candidate.id))
      .sort((a, b) => a.distance - b.distance);

    if (!candidates.length) break;

    addEdge(node.id, candidates[0].id);
  }
}

// 3. Если после ограничений всё равно есть изолированные точки — подключаем к ближайшей точке своего региона.
for (const node of nodes) {
  if (degree(node.id) > 0) continue;

  const candidates = nodes
    .filter((other) => other.id !== node.id)
    .map((other) => ({
      id: other.id,
      sameRegion: other.region === node.region,
      distance: Math.round(dist(node, other)),
    }))
    .sort((a, b) => {
      if (a.sameRegion !== b.sameRegion) return a.sameRegion ? -1 : 1;
      return a.distance - b.distance;
    });

  if (candidates.length) addEdge(node.id, candidates[0].id);
}

// 4. Проверяем компоненты связности и соединяем ближайшие компоненты.
function getComponents() {
  const visited = new Set();
  const components = [];

  for (const node of nodes) {
    if (visited.has(node.id)) continue;

    const stack = [node.id];
    const component = [];
    visited.add(node.id);

    while (stack.length) {
      const id = stack.pop();
      component.push(id);

      for (const next of graph[id]) {
        if (!visited.has(next)) {
          visited.add(next);
          stack.push(next);
        }
      }
    }

    components.push(component);
  }

  return components;
}

let components = getComponents();

while (components.length > 1) {
  let best = null;

  for (let i = 0; i < components.length; i++) {
    for (let j = i + 1; j < components.length; j++) {
      for (const aId of components[i]) {
        for (const bId of components[j]) {
          const a = nodeById[aId];
          const b = nodeById[bId];

          const seaA = isSeaLike(a);
          const seaB = isSeaLike(b);

          if ((seaA || seaB) && !(seaA && seaB)) continue;

          const distance = Math.round(dist(a, b));
          const score = distance + (a.region === b.region ? 0 : 80);

          if (!best || score < best.score) {
            best = { a: aId, b: bId, distance, score };
          }
        }
      }
    }
  }

  if (!best) break;

  addEdge(best.a, best.b);
  components = getComponents();
}

// 5. Сортируем связи по расстоянию, чтобы файл был читабельным.
const nextNodes = nodes.map((node) => {
  const connections = [...graph[node.id]]
    .filter((id) => nodeById[id])
    .sort((a, b) => dist(node, nodeById[a]) - dist(node, nodeById[b]));

  return {
    ...node,
    connections,
  };
});

function countEdges(list) {
  return list.reduce((sum, node) => sum + (node.connections?.length || 0), 0) / 2;
}

const deadEnds = nextNodes.filter((node) => (node.connections || []).length < 2);
const longEdges = [];

for (const node of nextNodes) {
  for (const targetId of node.connections || []) {
    if (node.id > targetId) continue;
    const target = nodeById[targetId];
    if (!target) continue;
    const distance = Math.round(dist(node, target));
    if (distance > 250) {
      longEdges.push(`${node.name} → ${target.name}: ${distance}px`);
    }
  }
}

const out = `export const WORLD_MAP_SIZE = {
  width: 1402,
  height: 1122,
};

export const worldMap = {
  background: "/assets/maps/world_map.png",
  ...WORLD_MAP_SIZE,
};

export const worldNodes = ${JSON.stringify(nextNodes, null, 2)};

export const worldNodeById = Object.fromEntries(
  worldNodes.map((node) => [node.id, node])
);
`;

fs.writeFileSync(filePath, out, "utf8");

console.log("Готово.");
console.log("Точек:", nextNodes.length);
console.log("Связей:", countEdges(nextNodes));
console.log("Бэкап:", backupPath);
console.log("Точек с <2 связями:", deadEnds.length);

if (deadEnds.length) {
  console.log("Потенциальные тупики:");
  for (const node of deadEnds.slice(0, 30)) {
    console.log(`- ${node.name} (${node.id}): ${node.connections.length}`);
  }
}

console.log("Длинных связей >250px:", longEdges.length);

if (longEdges.length) {
  console.log("Первые длинные связи:");
  for (const edge of longEdges.slice(0, 20)) {
    console.log("- " + edge);
  }
}
