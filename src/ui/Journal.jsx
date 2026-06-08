export default function Journal({ entries }) {
  return <ol className="scroll-list">{entries.map((entry, index) => <li key={`${entry}-${index}`}>{entry}</li>)}</ol>;
}
