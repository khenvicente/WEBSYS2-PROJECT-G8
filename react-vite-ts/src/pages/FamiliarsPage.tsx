import { useState, useMemo } from "react";
import { useFamiliar } from "../hooks/useFamiliar";
import type { Familiar } from "../hooks/useFamiliar";
import { PlusIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/solid";

export default function FamiliarsPage() {
  const {
    familiars: data,
    loading,
    error,
    createFamiliar,
    updateFamiliar: editFamiliar,
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
        GroupID: form.group ? Number(form.group) : undefined,
        name: form.name,
        species: form.species || undefined,
        size: form.size || undefined,
        color: form.color || undefined,
        pattern: form.pattern || undefined,
        personality: form.personality || undefined,
        rarity: form.rarity || undefined,
        image: form.image || undefined,
        typing: form.typing
          ? form.typing.split(",").map((t) => t.trim())
          : undefined,
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

  const getRarityColor = (rarity?: string) => {
    const colors: Record<string, string> = {
      'Legendary': 'border-yellow-500 bg-yellow-50',
      'Mythic': 'border-purple-500 bg-purple-50',
      'Epic': 'border-blue-500 bg-blue-50',
      'Rare': 'border-green-500 bg-green-50',
      'Common': 'border-gray-500 bg-gray-50',
    };
    return colors[rarity || ''] || 'border-gray-300 bg-white';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          <strong className="font-bold">Error: </strong>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen">
      
      {/* PAGE HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-purple-900 mb-2">
          Familiars 🐉
        </h1>
        <p className="text-gray-600">
          Manage your magical companions and creatures
        </p>
      </div>

      {/* CREATE FORM */}
      <form
        onSubmit={handleSubmit}
        className="p-6 mb-8 bg-white shadow-lg rounded-2xl"
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-purple-700">
          <PlusIcon className="w-6 h-6 text-purple-500" />
          Create New Familiar
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            type="number"
            name="group"
            placeholder="Group ID (optional)"
            className="border border-purple-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={form.group}
            onChange={handleChange}
          />
          <input
            name="name"
            placeholder="Name *"
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
          <select
            name="rarity"
            className="border border-purple-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={form.rarity}
            onChange={(e) => setForm({ ...form, rarity: e.target.value })}
          >
            <option value="">Select Rarity</option>
            <option value="Common">Common</option>
            <option value="Rare">Rare</option>
            <option value="Epic">Epic</option>
            <option value="Legendary">Legendary</option>
            <option value="Mythic">Mythic</option>
          </select>
          <input
            name="image"
            placeholder="Image URL"
            className="border border-purple-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={form.image}
            onChange={handleChange}
          />
          <input
            name="typing"
            placeholder="Types (e.g. Fire, Flying)"
            className="border border-purple-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 md:col-span-2 lg:col-span-3"
            value={form.typing}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full bg-purple-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PlusIcon className="w-5 h-5" />
          {submitting ? "Creating..." : "Create Familiar"}
        </button>
      </form>

      {/* SEARCH */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search familiars by name, species or rarity..."
          className="p-4 w-full border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-400 shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* FAMILIAR COUNT */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing <span className="font-bold text-purple-700">{filteredData.length}</span> familiar{filteredData.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* FAMILIAR LIST */}
      {filteredData.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
          <span className="text-6xl mb-4 block">🔍</span>
          <p className="text-lg text-gray-600 font-medium">No familiars found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredData.map((f) => (
            <div
              key={f.FamiliarID}
              className={`relative p-5 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 border-l-4 ${getRarityColor(f.rarity)}`}
            >
              {/* Actions (floating top-right) */}
              <div className="absolute top-3 right-3 flex gap-2 z-10">
                <button
                  onClick={() => openEdit(f)}
                  className="p-2 bg-white shadow-md rounded-full hover:bg-purple-100 transition-colors"
                  title="Edit"
                >
                  <PencilIcon className="w-4 h-4 text-purple-600" />
                </button>

                <button
                  onClick={() => setDeletingID(f.FamiliarID)}
                  className="p-2 bg-white shadow-md rounded-full hover:bg-red-100 transition-colors"
                  title="Delete"
                >
                  <TrashIcon className="w-4 h-4 text-red-600" />
                </button>
              </div>

              {/* Image */}
              {f.image ? (
                <img
                  src={f.image}
                  alt={f.name}
                  className="w-full h-48 object-cover mb-4 rounded-xl"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/300x200?text=No+Image';
                  }}
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-pink-100 mb-4 rounded-xl flex items-center justify-center">
                  <span className="text-6xl">🐉</span>
                </div>
              )}

              {/* Name & Rarity Badge */}
              <div className="flex items-start justify-between mb-3">
                <h2 className="font-bold text-xl text-purple-700 flex-1">
                  {f.name}
                </h2>
                {f.rarity && (
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ml-2 ${
                    f.rarity === 'Legendary' ? 'bg-yellow-200 text-yellow-800' :
                    f.rarity === 'Mythic' ? 'bg-purple-200 text-purple-800' :
                    f.rarity === 'Epic' ? 'bg-blue-200 text-blue-800' :
                    f.rarity === 'Rare' ? 'bg-green-200 text-green-800' :
                    'bg-gray-200 text-gray-800'
                  }`}>
                    {f.rarity}
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm">
                <p className="text-gray-700">
                  <span className="font-semibold">Group:</span> {f.GroupID || 'N/A'}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Species:</span> {f.species || 'N/A'}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Size:</span> {f.size || 'N/A'}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Color:</span> {f.color || 'N/A'}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Personality:</span> {f.personality || 'N/A'}
                </p>
                {f.typing && Array.isArray(f.typing) && f.typing.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-2">
                    {f.typing.map((type, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full font-medium"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EDIT MODAL */}
      {editing && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setEditing(null)}
        >
          <div
            className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6 text-purple-700 flex items-center gap-2">
              <PencilIcon className="w-6 h-6" />
              Edit Familiar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="number"
                value={editForm.group ?? ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, group: e.target.value ? Number(e.target.value) : null })
                }
                placeholder="Group ID"
                className="p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <input
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                placeholder="Name"
                className="p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <input
                value={editForm.species}
                onChange={(e) => setEditForm({ ...editForm, species: e.target.value })}
                placeholder="Species"
                className="p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <input
                value={editForm.size}
                onChange={(e) => setEditForm({ ...editForm, size: e.target.value })}
                placeholder="Size"
                className="p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <input
                value={editForm.color}
                onChange={(e) => setEditForm({ ...editForm, color: e.target.value })}
                placeholder="Color"
                className="p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <input
                value={editForm.pattern}
                onChange={(e) => setEditForm({ ...editForm, pattern: e.target.value })}
                placeholder="Pattern"
                className="p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <input
                value={editForm.personality}
                onChange={(e) => setEditForm({ ...editForm, personality: e.target.value })}
                placeholder="Personality"
                className="p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <select
                value={editForm.rarity}
                onChange={(e) => setEditForm({ ...editForm, rarity: e.target.value })}
                className="p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="">Select Rarity</option>
                <option value="Common">Common</option>
                <option value="Rare">Rare</option>
                <option value="Epic">Epic</option>
                <option value="Legendary">Legendary</option>
                <option value="Mythic">Mythic</option>
              </select>
              <input
                value={editForm.image}
                onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                placeholder="Image URL"
                className="p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 md:col-span-2"
              />
              <input
                value={editForm.typing}
                onChange={(e) => setEditForm({ ...editForm, typing: e.target.value })}
                placeholder="Types (comma separated)"
                className="p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 md:col-span-2"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditing(null)}
                className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (!editing) return;
                  setActionLoading(true);
                  try {
                    await editFamiliar(editing.FamiliarID, {
                      GroupID: editForm.group ?? undefined,
                      name: editForm.name,
                      species: editForm.species || undefined,
                      size: editForm.size || undefined,
                      color: editForm.color || undefined,
                      pattern: editForm.pattern || undefined,
                      personality: editForm.personality || undefined,
                      rarity: editForm.rarity || undefined,
                      image: editForm.image || undefined,
                      typing: editForm.typing
                        ? editForm.typing.split(",").map((t) => t.trim())
                        : undefined,
                    });
                    setEditing(null);
                  } catch (err) {
                    console.error(err);
                  } finally {
                    setActionLoading(false);
                  }
                }}
                disabled={actionLoading}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION */}
      {deletingID !== null && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setDeletingID(null)}
        >
          <div
            className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-4">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <TrashIcon className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Delete Familiar?</h2>
            </div>
            <p className="text-center text-gray-600 mb-6">
              Are you sure you want to delete this familiar? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeletingID(null)}
                className="flex-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-medium transition-colors"
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
                disabled={actionLoading}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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