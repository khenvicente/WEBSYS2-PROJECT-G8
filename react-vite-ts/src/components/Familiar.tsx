import "../style/Familiar.css";

export default function Familiar() {
  return (
    <div className="familiar-container">
      <h1 className="familiar-title">Familiars</h1>
      <div className="familiar-card">
        <h2 className="card-title">Familiar Name</h2>
        <p className="card-description">This is a description of the familiar.</p>
      </div>

      <div className="familiar-card">
        <h2 className="card-title">Familiar Name 2</h2>
        <p className="card-description">Another description goes here.</p>
      </div>
    </div>
  );
}
