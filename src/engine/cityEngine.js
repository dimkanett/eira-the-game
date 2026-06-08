import { cityNodes } from "../data/cityNodes.js";
import { cloneState } from "./gameState.js";
import { applyEffects } from "./eventEngine.js";

export function enterCity(gameState, cityId) {
  const city = cityNodes[cityId];
  const state = cloneState(gameState);
  if (!city) return { ...state, activeMessage: "У этого города пока нет внутренней карты." };
  state.mode = "city";
  state.currentCity = cityId;
  state.hero.cityLocation = city.startNode;
  state.activeEvent = null;
  state.activeMessage = `Ты входишь в город: ${city.name}.`;
  state.journal.push(state.activeMessage);
  return state;
}

export function exitCity(gameState) {
  const state = cloneState(gameState);
  state.mode = "world";
  state.hero.cityLocation = null;
  state.currentCity = null;
  state.activeEvent = null;
  state.activeMessage = "Ты выходишь к лесным дорогам и снова видишь глобальную карту.";
  state.journal.push(state.activeMessage);
  return state;
}

export function handleCityNode(gameState, nodeId) {
  const state = cloneState(gameState);
  const city = cityNodes[state.currentCity];
  const node = city?.nodes.find((item) => item.id === nodeId);
  if (!node) return { ...state, activeMessage: "Эта городская точка пока не описана." };
  state.hero.cityLocation = nodeId;
  state.activeEvent = null;

  if (node.type === "exit") return exitCity(state);
  if (node.type === "healer") {
    state.hero.hp = state.hero.maxHp;
    state.activeMessage = "Лекарь обрабатывает раны. HP восстановлены, день не потрачен.";
  } else if (node.type === "forge") {
    state.activeMessage = "Кузнец осматривает лук и броню. Ремонт и улучшения будут добавлены позже.";
  } else if (node.type === "market") {
    return applyEffects({ ...state, activeMessage: "На рынке ты собираешь слухи и находишь обрывок полезной записи." }, [{ type: "reveal_random_city" }, { type: "add_random_lore", filters: { sourceType: "rumor" } }]);
  } else if (node.type === "archives") {
    return applyEffects({ ...state, activeMessage: "В архивах ты находишь карту старого интересного места и фрагмент летописи." }, [{ type: "reveal_node", nodeId: "ancient_temple_ruins" }, { type: "add_random_lore", filters: { region: "Серебряный Предел", sourceType: "archive" } }]);
  } else if (node.type === "temple") {
    return applyEffects({ ...state, activeMessage: "Святилище снимает усталость и оставляет в памяти лунный образ." }, [{ type: "fatigue", value: -99 }, { type: "add_random_lore", filters: { sourceType: "temple" } }]);
  } else if (node.type === "throne") {
    state.activeMessage = "Лунный Трон ждёт основной сюжетной ветки: аудиенции, клятв и выбора стороны.";
  } else if (node.type === "songs") {
    state.activeMessage = "В Доме тихих песен позже появятся отдых, слухи и встречи со спутниками.";
  } else {
    state.activeMessage = node.description;
  }
  state.journal.push(`${node.name}: ${state.activeMessage}`);
  return state;
}
