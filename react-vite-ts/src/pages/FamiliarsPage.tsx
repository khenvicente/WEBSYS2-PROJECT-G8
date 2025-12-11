import { useState, useMemo } from "react";
import { useFamiliar } from "../hooks/useFamiliar";
import type { Familiar } from "../hooks/useFamiliar";
import { PlusIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/solid";

export default function FamiliarsPage() {
  const {
    data,
    loading,
    error,
    createFamiliar,
    editFamiliar,
    deleteFamiliar,
  } = useFamiliar();

  const [form, setForm] = useState({
    group: "",
    name: "",
    species: "",
    size: "",
    color: "",
    pattern: "",
    personality: "",
    rarity: "",
    image: "",
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
        GroupID: Number(form.group),
        name: form.name,
        species: form.species,
        size: form.size,
        color: form.color,
        pattern: form.pattern,
        personality: form.personality,
        rarity: form.rarity,
        image: form.image,
        typing: form.typing
          ? form.typing.split(",").map((t) => t.trim())
          : [],
      });

      setForm({
        group: "",
        name: "",
        species: "",
        size: "",
        color: "",
        pattern: "",
        personality: "",
        rarity: "",
        image: "",
        typing: "",
      });
    } catch (err) {
      console.error("Create familiar error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const [search, setSearch] = useState("");

  const [editing, setEditing] = useState<Familiar | null>(null);
  const [editForm, setEditForm] = useState<{
    group: number | null;
    name: string;
    species: string;
    size: string;
    color: string;
    pattern: string;
    personality: string;
    rarity: string;
    image: string;
    typing: string;
  }>({
    group: null,
    name: "",
    species: "",
    size: "",
    color: "",
    pattern: "",
    personality: "",
    rarity: "",
    image: "",
    typing: "",
  });
  const openEdit = (f: Familiar) => {
    setEditing(f);
    setEditForm({
      group: f.GroupID || null,
      name: f.name || "",
      species: f.species || "",
      size: f.size || "",
      color: f.color || "",
      pattern: f.pattern || "",
      personality: f.personality || "",
      rarity: f.rarity || "",
      image: f.image || "",
      typing: Array.isArray(f.typing) ? f.typing.join(", ") : "",
    });
  };

  const [deletingID, setDeletingID] = useState<number | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const filteredData = useMemo(() => {
    if (!data) return [];
    const q = search.trim().toLowerCase();
    if (!q) return data;
    return data.filter((f) => {
      return (
        f.name?.toLowerCase().includes(q) ||
        f.species?.toLowerCase().includes(q) ||
        f.rarity?.toLowerCase().includes(q)
      );
    });
  }, [data, search]);

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
    <div className="p-6 bg-white/95 min-h-screen text-gray-900">
      {/* CREATE FORM */}
      <form
        onSubmit={handleSubmit}
        className="p-6 mb-8 bg-white shadow-lg rounded-2xl grid grid-cols-1 gap-4"
      >
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-purple-700">
          <PlusIcon className="w-6 h-6 text-purple-500" />
          Create New Familiar
        </h2>
        <input
          type="number"
          name="group"
          placeholder="Group ID"
          className="border border-purple-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={form.group}
          onChange={handleChange}
          required
        />
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
          name="image"
          placeholder="Image URL"
          className="border border-purple-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={form.image}
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
          className="bg-purple-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <PlusIcon className="w-5 h-5" />
          {submitting ? "Creating..." : "Create Familiar"}
        </button>
      </form>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search familiars by name, species or rarity..."
        className="mb-6 p-3 w-full border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FAMILIAR LIST */}
      {filteredData.length === 0 ? (
        <p className="text-lg text-gray-600 font-medium">No familiars found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredData.map((f) => (
            <div
              key={f.FamiliarID}
              className="relative p-4 shadow-lg rounded-2xl bg-white hover:shadow-xl transition-all duration-300"
            >
              <h2 className="font-bold text-xl mb-3 text-purple-700 flex items-center gap-2">
                {f.name}
              </h2>

              {f.image && (
                <img
                  src={f.image}
                  alt={f.name}
                  className="w-full h-40 object-cover mb-3 rounded-xl"
                />
              )}
              <p>
                <b>Group:</b> {f.GroupID || "N/A"}
              </p>
              <p>
                <b>Species:</b> {f.species || "N/A"}
              </p>
              <p>
                <b>Size:</b> {f.size || "N/A"}
              </p>
              <p>
                <b>Color:</b> {f.color || "N/A"}
              </p>
              <p>
                <b>Pattern:</b> {f.pattern || "N/A"}
              </p>
              <p>
                <b>Personality:</b> {f.personality || "N/A"}
              </p>
              <p>
                <b>Rarity:</b> {f.rarity || "N/A"}
              </p>
              <p>
                <b>Types:</b> {Array.isArray(f.typing) ? f.typing.join(", ") : "N/A"}
              </p>

              {/* Actions (floating top-right) */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => openEdit(f)}
                  className="p-1 bg-purple-100 rounded-full hover:bg-purple-200 transition-colors"
                >
                  <PencilIcon className="w-5 h-5 text-purple-600" />
                </button>

                <button
                  onClick={() => setDeletingID(f.FamiliarID)}
                  className="p-1 bg-red-100 rounded-full hover:bg-red-200 transition-colors"
                >
                  <TrashIcon className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EDIT MODAL */}
      {editing && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setEditing(null)}
        >
          <div
            className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 text-purple-700">Edit Familiar</h2>
            <div className="grid gap-3">
              <input
                type="number"
                value={editForm.group ?? ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, group: e.target.value ? Number(e.target.value) : null })
                }
                className="p-2 border border-purple-300 rounded-lg"
              />
              <input
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                placeholder="Name"
                className="p-2 border border-purple-300 rounded-lg"
              />
              <input
                value={editForm.species}
                onChange={(e) => setEditForm({ ...editForm, species: e.target.value })}
                placeholder="Species"
                className="p-2 border border-purple-300 rounded-lg"
              />
              <input
                value={editForm.size}
                onChange={(e) => setEditForm({ ...editForm, size: e.target.value })}
                placeholder="Size"
                className="p-2 border border-purple-300 rounded-lg"
              />
              <input
                value={editForm.color}
                onChange={(e) => setEditForm({ ...editForm, color: e.target.value })}
                placeholder="Color"
                className="p-2 border border-purple-300 rounded-lg"
              />
              <input
                value={editForm.pattern}
                onChange={(e) => setEditForm({ ...editForm, pattern: e.target.value })}
                placeholder="Pattern"
                className="p-2 border border-purple-300 rounded-lg"
              />
              <input
                value={editForm.personality}
                onChange={(e) => setEditForm({ ...editForm, personality: e.target.value })}
                placeholder="Personality"
                className="p-2 border border-purple-300 rounded-lg"
              />
              <input
                value={editForm.rarity}
                onChange={(e) => setEditForm({ ...editForm, rarity: e.target.value })}
                placeholder="Rarity"
                className="p-2 border border-purple-300 rounded-lg"
              />
              <input
                value={editForm.image}
                onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                placeholder="Image URL"
                className="p-2 border border-purple-300 rounded-lg"
              />
              <input
                value={editForm.typing}
                onChange={(e) => setEditForm({ ...editForm, typing: e.target.value })}
                placeholder="Types (comma separated)"
                className="p-2 border border-purple-300 rounded-lg"
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setEditing(null)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (!editing) return;
                  setActionLoading(true);
                  try {
                    await editFamiliar(editing.FamiliarID, {
                      GroupID: Number(editForm.group),
                      name: editForm.name,
                      species: editForm.species,
                      size: editForm.size,
                      color: editForm.color,
                      pattern: editForm.pattern,
                      personality: editForm.personality,
                      rarity: editForm.rarity,
                      image: editForm.image,
                      typing: editForm.typing
                        ? editForm.typing.split(",").map((t) => t.trim())
                        : [],
                    });
                    setEditing(null);
                  } catch (err) {
                    console.error(err);
                  } finally {
                    setActionLoading(false);
                  }
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                {actionLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION */}
      {deletingID !== null && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setDeletingID(null)}
        >
          <div
            className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 text-red-600">Delete Familiar?</h2>
            <p className="mb-4">Are you sure you want to delete this familiar? This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeletingID(null)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (deletingID === null) return;
                  setActionLoading(true);
                  try {
                    await deleteFamiliar(deletingID);
                    setDeletingID(null);
                  } catch (err) {
                    console.error(err);
                  } finally {
                    setActionLoading(false);
                  }
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                {actionLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
