export default function Modal({ title, children, onClose }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <section className="modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>{title}</h2>
        {children}
      </section>
    </div>
  );
}
