export default function Reputation({ reputation }) {
  const entries = Object.entries(reputation);
  return entries.length ? <ul>{entries.map(([region, value]) => <li key={region}>{region}: {value}</li>)}</ul> : <p>Репутация пока нейтральна.</p>;
}
