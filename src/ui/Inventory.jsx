import { getInventoryEntries } from "../engine/inventoryEngine.js";

export default function Inventory({ gameState }) {
  return <ul className="scroll-list">{getInventoryEntries(gameState).map((item, index) => <li key={`${item.id}-${index}`}><strong>{item.name}</strong> <small>{item.type}</small><p>{item.description || item.damage}</p></li>)}</ul>;
}
