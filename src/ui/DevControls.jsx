export default function DevControls({ onAdjustDecay }) {
  return (
    <section className="dev-controls" aria-label="Dev: системные параметры">
      <strong>dev</strong>
      <button onClick={() => onAdjustDecay({ worldDecay: 10 })}>+10 Разложение мира</button>
      <button onClick={() => onAdjustDecay({ worldDecay: -10 })}>-10 Разложение мира</button>
      <button onClick={() => onAdjustDecay({ personalDecay: 10 })}>+10 Личное разложение</button>
      <button onClick={() => onAdjustDecay({ sin: 1 })}>+1 Sin</button>
    </section>
  );
}
