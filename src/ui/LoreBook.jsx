import { loreCollections } from "../data/loreCollections.js";
import { loreFragments } from "../data/loreFragments.js";
import { getLoreCollectionProgress } from "../engine/loreEngine.js";
import LoreFragment from "./LoreFragment.jsx";

export default function LoreBook({ gameState, onRead }) {
  const discovered = new Set(gameState.lore.discoveredFragments);
  const unread = new Set(gameState.lore.unreadFragments);
  return (
    <div className="lore-book">
      {Object.values(loreCollections).map((collection) => {
        const progress = getLoreCollectionProgress(gameState, collection.id);
        return (
          <section key={collection.id}>
            <h3>{collection.title} — {progress.discovered}/{progress.total}</h3>
            <p>{collection.description}</p>
            {collection.fragmentIds.map((fragmentId) => <LoreFragment key={fragmentId} fragment={loreFragments[fragmentId]} discovered={discovered.has(fragmentId)} unread={unread.has(fragmentId)} onRead={onRead} />)}
          </section>
        );
      })}
    </div>
  );
}
