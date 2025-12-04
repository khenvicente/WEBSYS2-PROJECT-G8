import { useState } from "react";
import { useFamiliar } from "../hooks/useFamiliar";
import { PlusIcon, TrashIcon, PencilIcon, FunnelIcon } from "@heroicons/react/24/solid";

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

  if (loading)
    return (
      <p className="p-4 text-lg text-purple-500 animate-pulse">
        Loading familiars...
      </p>
    );

  if (error)
    return (
      <p className="p-4 text-lg text-red-600 font-semibold animate-shake">
        Error: {error}
      </p>
    );

  return (
    <div className="p-6 bg-purple-50 min-h-screen">
      {/* CREATE FORM */}
      <form
        onSubmit={handleSubmit}
        className="p-6 mb-8 bg-linear-to-br from-purple-200 to-purple-100 shadow-lg rounded-xl grid grid-cols-1 gap-4 transition-transform hover:scale-[1.01] duration-300"
      >
        <h2 className="text-2xl font-bold mb-4 text-purple-800 flex items-center gap-2">
          <PlusIcon className="w-6 h-6 text-purple-600" />
          Create New Familiar
        </h2>

        <input
          name="name"
          placeholder="Name"
          className="border border-purple-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="species"
          placeholder="Species"
          className="border border-purple-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={form.species}
          onChange={handleChange}
        />
        <input
          name="size"
          placeholder="Size"
          className="border border-purple-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={form.size}
          onChange={handleChange}
        />
        <input
          name="color"
          placeholder="Color"
          className="border border-purple-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={form.color}
          onChange={handleChange}
        />
        <input
          name="pattern"
          placeholder="Pattern"
          className="border border-purple-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={form.pattern}
          onChange={handleChange}
        />
        <input
          name="personality"
          placeholder="Personality"
          className="border border-purple-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={form.personality}
          onChange={handleChange}
        />
        <input
          name="rarity"
          placeholder="Rarity"
          className="border border-purple-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={form.rarity}
          onChange={handleChange}
        />
        <input
          name="img"
          placeholder="Image URL"
          className="border border-purple-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={form.img}
          onChange={handleChange}
        />
        <input
          name="typing"
          placeholder="Types (comma separated)"
          className="border border-purple-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={form.typing}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={submitting}
          className="bg-purple-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center gap-2 justify-center"
        >
          <PlusIcon className="w-5 h-5" />
          {submitting ? "Creating..." : "Create Familiar"}
        </button>
      </form>

      {/* FAMILIAR LIST */}
      {(!data || data.length === 0) ? (
        <p className="text-lg text-purple-700 font-medium">
          No familiars found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.map((f) => (
            <div
              key={f.FamiliarID}
              className="p-4 shadow-lg rounded-2xl bg-white hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 relative"
            >
              <h2 className="font-bold text-xl mb-3 text-purple-800 flex items-center gap-2">
                {f.name}
              </h2>
              {f.img && (
                <img
                  src={f.img}
                  alt={f.name}
                  className="w-full h-40 object-cover mb-3 rounded-xl hover:scale-105 transition-transform duration-300"
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

              {/* Edit/Delete Actions */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="p-1 bg-purple-100 rounded-full hover:bg-purple-200 transition-colors">
                  <PencilIcon className="w-5 h-5 text-purple-600" />
                </button>
                <button className="p-1 bg-red-100 rounded-full hover:bg-red-200 transition-colors">
                  <TrashIcon className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
