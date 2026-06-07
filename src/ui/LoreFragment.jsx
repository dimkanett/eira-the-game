export default function LoreFragment({ fragment, discovered, unread, onRead }) {
  if (!discovered) return <article className="lore-fragment hidden"><h4>???</h4><p>Этот фрагмент ещё не найден.</p></article>;
  return (
    <article className={`lore-fragment ${unread ? "unread" : ""}`}>
      <h4>{fragment.title} {unread ? "• новое" : ""}</h4>
      <p>{fragment.text}</p>
      {unread && <button onClick={() => onRead(fragment.id)}>Отметить прочитанным</button>}
    </article>
  );
}
