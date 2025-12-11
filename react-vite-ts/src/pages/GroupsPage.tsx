import { useState } from "react";
import { useGroup } from "../hooks/useGroup";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function GroupsPage() {
  const {
    groups = [],
    loading,
    error,
    createGroup,
    updateGroup,
    deleteGroup,
  } = useGroup();

  const [price, setPrice] = useState("");
  const [editingGroup, setEditingGroup] = useState<any>(null);
  const [actionLoading, setActionLoading] = useState(false);

  if (loading) return <p className="p-4 text-purple-500 animate-pulse">Loading groups...</p>;
  if (error) return <p className="p-4 text-red-600 font-semibold">Error: {error}</p>;

  const handleCreate = async () => {
    if (!price) return;
    setActionLoading(true);
    try {
      await createGroup({ price: Number(price) });
      setPrice("");
    } catch {}
    finally { setActionLoading(false); }
  };

  const handleEditSave = async () => {
    if (!editingGroup) return;
    setActionLoading(true);
    try {
      await updateGroup(editingGroup.GroupID, { price: editingGroup.price });
      setEditingGroup(null);
    } catch {}
    finally { setActionLoading(false); }
  };

  return (
    <div className="p-6 bg-white/95 min-h-screen text-gray-900 space-y-6">

      {/* CREATE GROUP FORM */}
      <div className="p-6 bg-white shadow-lg rounded-2xl max-w-md">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">Create Group</h2>
        <input
          type="number"
          placeholder="Price"
          className="w-full border border-purple-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button
          onClick={handleCreate}
          disabled={actionLoading}
          className="mt-4 w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          {actionLoading ? "Creating..." : "Create Group"}
        </button>
      </div>

      {/* GROUP LIST */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-purple-700">Groups</h2>
        {groups.length === 0 && <p className="text-gray-600">No groups found.</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {groups.map((g: any) => (
            <div
              key={g.GroupID}
              className="relative p-4 shadow-lg rounded-2xl bg-white hover:shadow-xl transition-all"
            >
              <p className="text-lg font-semibold">
                <strong>Group {g.GroupID}</strong> — {g.price} Gold
              </p>

              {/* Action buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => setEditingGroup(g)}
                  className="p-1 bg-purple-100 rounded-full hover:bg-purple-200 transition-colors"
                >
                  <PencilIcon className="w-5 h-5 text-purple-600" />
                </button>

                <button
                  onClick={() => deleteGroup(g.GroupID)}
                  className="p-1 bg-red-100 rounded-full hover:bg-red-200 transition-colors"
                >
                  <TrashIcon className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EDIT GROUP MODAL */}
      {editingGroup && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
          onClick={() => setEditingGroup(null)}
        >
          <div
            className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-purple-700 mb-4">Edit Group</h3>

            <input
              type="number"
              className="border border-purple-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={editingGroup.price}
              onChange={(e) =>
                setEditingGroup({ ...editingGroup, price: Number(e.target.value) })
              }
            />

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setEditingGroup(null)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                disabled={actionLoading}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                {actionLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
