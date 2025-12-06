// FamiliarsPage.tsx
import { useState, useMemo } from "react"
import { useFamiliar} from "../hooks/useFamiliar"
import type { Familiar } from "../hooks/useFamiliar"
import { PlusIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/solid"
import { useNavigate } from "react-router-dom"

export default function FamiliarsPage() {
  const navigate = useNavigate()

  // hook
  const {
    data,
    loading,
    error,
    createFamiliar,
    editFamiliar,
    deleteFamiliar,
  } = useFamiliar()

  // Create form (typing is comma-separated string for input)
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
  })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

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
      })

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
      })
    } catch (err) {
      console.error("Create familiar error:", err)
    } finally {
      setSubmitting(false)
    }
  }

  // Search state
  const [search, setSearch] = useState("")

  // Edit modal state
  const [editing, setEditing] = useState<Familiar | null>(null)
  const [editForm, setEditForm] = useState({
    name: "",
    species: "",
    size: "",
    color: "",
    pattern: "",
    personality: "",
    rarity: "",
    img: "",
    typing: "",
  })
  const openEdit = (f: Familiar) => {
    setEditing(f)
    setEditForm({
      name: f.name || "",
      species: f.species || "",
      size: f.size || "",
      color: f.color || "",
      pattern: f.pattern || "",
      personality: f.personality || "",
      rarity: f.rarity || "",
      img: f.img || "",
      typing: Array.isArray(f.typing) ? f.typing.join(", ") : "",
    })
  }

  // Delete confirmation state
  const [deletingID, setDeletingID] = useState<number | null>(null)
  const [actionLoading, setActionLoading] = useState(false)

  // filtered data (memoized)
  const filteredData = useMemo(() => {
    if (!data) return []
    const q = search.trim().toLowerCase()
    if (!q) return data
    return data.filter((f) => {
      return (
        f.name?.toLowerCase().includes(q) ||
        f.species?.toLowerCase().includes(q) ||
        f.rarity?.toLowerCase().includes(q)
      )
    })
  }, [data, search])

  // Loading / Error states
  if (loading)
    return (
      <p className="p-4 text-lg text-purple-500 animate-pulse">
        Loading familiars...
      </p>
    )

  if (error)
    return (
      <p className="p-4 text-lg text-red-600 font-semibold animate-shake">
        Error: {error}
      </p>
    )

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
        <p className="text-lg text-purple-700 font-medium">No familiars found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredData.map((f) => (
            <div
              key={f.FamiliarID}
              onClick={() => navigate(`/familiars/${f.FamiliarID}`)}
              className="cursor-pointer p-4 shadow-lg rounded-2xl bg-white hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 relative"
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
                <b>Types:</b>{" "}
                {Array.isArray(f.typing) ? f.typing.join(", ") : "N/A"}
              </p>

              {/* Actions */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation() // prevent card navigation
                    openEdit(f)
                  }}
                  className="p-1 bg-purple-100 rounded-full hover:bg-purple-200 transition-colors"
                >
                  <PencilIcon className="w-5 h-5 text-purple-600" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setDeletingID(f.FamiliarID)
                  }}
                  className="p-1 bg-red-100 rounded-full hover:bg-red-200 transition-colors"
                >
                  <TrashIcon className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EDIT MODAL (single, outside map) */}
      {editing && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-9999"
          onClick={() => setEditing(null)}
        >
          <div
            className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 text-purple-800">Edit Familiar</h2>

            <div className="grid gap-3">
              <input
                name="name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                placeholder="Name"
                className="p-2 border border-purple-300 rounded-lg"
              />
              <input
                name="species"
                value={editForm.species}
                onChange={(e) => setEditForm({ ...editForm, species: e.target.value })}
                placeholder="Species"
                className="p-2 border border-purple-300 rounded-lg"
              />
              <input
                name="size"
                value={editForm.size}
                onChange={(e) => setEditForm({ ...editForm, size: e.target.value })}
                placeholder="Size"
                className="p-2 border border-purple-300 rounded-lg"
              />
              <input
                name="color"
                value={editForm.color}
                onChange={(e) => setEditForm({ ...editForm, color: e.target.value })}
                placeholder="Color"
                className="p-2 border border-purple-300 rounded-lg"
              />
              <input
                name="pattern"
                value={editForm.pattern}
                onChange={(e) => setEditForm({ ...editForm, pattern: e.target.value })}
                placeholder="Pattern"
                className="p-2 border border-purple-300 rounded-lg"
              />
              <input
                name="personality"
                value={editForm.personality}
                onChange={(e) =>
                  setEditForm({ ...editForm, personality: e.target.value })
                }
                placeholder="Personality"
                className="p-2 border border-purple-300 rounded-lg"
              />
              <input
                name="rarity"
                value={editForm.rarity}
                onChange={(e) => setEditForm({ ...editForm, rarity: e.target.value })}
                placeholder="Rarity"
                className="p-2 border border-purple-300 rounded-lg"
              />
              <input
                name="img"
                value={editForm.img}
                onChange={(e) => setEditForm({ ...editForm, img: e.target.value })}
                placeholder="Image URL"
                className="p-2 border border-purple-300 rounded-lg"
              />
              <input
                name="typing"
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
                  if (!editing) return
                  setActionLoading(true)
                  try {
                    await editFamiliar(editing.FamiliarID, {
                      name: editForm.name,
                      species: editForm.species,
                      size: editForm.size,
                      color: editForm.color,
                      pattern: editForm.pattern,
                      personality: editForm.personality,
                      rarity: editForm.rarity,
                      img: editForm.img,
                      typing: editForm.typing
                        ? editForm.typing.split(",").map((t) => t.trim())
                        : [],
                    })
                    setEditing(null)
                  } catch (err) {
                    console.error("Edit familiar error:", err)
                  } finally {
                    setActionLoading(false)
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

      {/* DELETE CONFIRMATION (single, outside map) */}
      {deletingID !== null && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-9999"
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
                  if (deletingID === null) return
                  setActionLoading(true)
                  try {
                    await deleteFamiliar(deletingID)
                    setDeletingID(null)
                  } catch (err) {
                    console.error("Delete familiar error:", err)
                  } finally {
                    setActionLoading(false)
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
  )
}
