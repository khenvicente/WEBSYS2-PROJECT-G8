import { useState } from "react";
import { useFamiliar } from "../hooks/useFamiliar";

export default function FamiliarsPage() {
  const { data, loading, error, createFamiliar } = useFamiliar();

  const [form, setForm] = useState({
    name: "",
    species: "",
    size: "",
    color: "",
    pattern: "",
    personality: "",
    rarity: "",
    img: "",
    typing: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await createFamiliar({
        name: form.name,
        species: form.species,
        size: form.size,
        color: form.color,
        pattern: form.pattern,
        personality: form.personality,
        rarity: form.rarity,
        img: form.img,
        typing: form.typing
          ? form.typing.split(",").map((t) => t.trim())
          : [],
      });

      // Clear form
      setForm({
        name: "",
        species: "",
        size: "",
        color: "",
        pattern: "",
        personality: "",
        rarity: "",
        img: "",
        typing: "",
      });

    } catch (e) {
      console.error(e);
    }

    setSubmitting(false);
  };

  if (loading) return <p className="p-4 text-lg">Loading familiars...</p>;
  if (error) return <p className="p-4 text-lg text-red-600">Error: {error}</p>;

  return (
    <div className="p-4">
      {/* CREATE FORM */}
      <form
        onSubmit={handleSubmit}
        className="p-4 mb-6 bg-white shadow rounded grid grid-cols-1 gap-3"
      >
        <h2 className="text-xl font-bold mb-2">Create New Familiar</h2>

        <input
          name="name"
          placeholder="Name"
          className="border p-2 rounded"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="species"
          placeholder="Species"
          className="border p-2 rounded"
          value={form.species}
          onChange={handleChange}
        />
        <input
          name="size"
          placeholder="Size"
          className="border p-2 rounded"
          value={form.size}
          onChange={handleChange}
        />
        <input
          name="color"
          placeholder="Color"
          className="border p-2 rounded"
          value={form.color}
          onChange={handleChange}
        />
        <input
          name="pattern"
          placeholder="Pattern"
          className="border p-2 rounded"
          value={form.pattern}
          onChange={handleChange}
        />
        <input
          name="personality"
          placeholder="Personality"
          className="border p-2 rounded"
          value={form.personality}
          onChange={handleChange}
        />
        <input
          name="rarity"
          placeholder="Rarity"
          className="border p-2 rounded"
          value={form.rarity}
          onChange={handleChange}
        />
        <input
          name="img"
          placeholder="Image filename (optional)"
          className="border p-2 rounded"
          value={form.img}
          onChange={handleChange}
        />
        <input
          name="typing"
          placeholder="Types (comma separated)"
          className="border p-2 rounded"
          value={form.typing}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          {submitting ? "Creating..." : "Create Familiar"}
        </button>
      </form>

      {/* FAMILIAR LIST */}
      {(!data || data.length === 0) ? (
        <p className="text-lg">No familiars found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.map((f) => (
            <div key={f.FamiliarID} className="p-4 shadow rounded bg-white">
              <h2 className="font-bold text-lg mb-2">{f.name}</h2>
              {f.img && (
                <img
                  src={f.img}
                  alt={f.name}
                  className="w-full h-32 object-cover mb-2 rounded"
                />
              )}
              <p><b>Species:</b> {f.species || "N/A"}</p>
              <p><b>Size:</b> {f.size || "N/A"}</p>
              <p><b>Color:</b> {f.color || "N/A"}</p>
              <p><b>Pattern:</b> {f.pattern || "N/A"}</p>
              <p><b>Personality:</b> {f.personality || "N/A"}</p>
              <p><b>Rarity:</b> {f.rarity || "N/A"}</p>
              <p>
                <b>Types:</b>{" "}
                {(() => {
                  if (!f.typing) return "N/A";
                  if (Array.isArray(f.typing)) return f.typing.join(", ");
                  try {
                    const arr = JSON.parse(f.typing);
                    return Array.isArray(arr) ? arr.join(", ") : "N/A";
                  } catch {
                    return "N/A";
                  }
                })()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
