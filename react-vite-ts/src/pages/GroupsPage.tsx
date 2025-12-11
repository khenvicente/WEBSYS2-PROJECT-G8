import { useState } from "react";
import { useGroup } from "../hooks/useGroup";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/solid";

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
  const [deletingGroup, setDeletingGroup] = useState<number | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const handleCreate = async () => {
    if (!price) {
      alert("Please enter a price");
      return;
    }
    setActionLoading(true);
    try {
      await createGroup({ price: Number(price) });
      setPrice("");
    } catch (err) {
      console.error("Failed to create group:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditSave = async () => {
    if (!editingGroup) return;
    setActionLoading(true);
    try {
      await updateGroup(editingGroup.GroupID, { price: editingGroup.price });
      setEditingGroup(null);
    } catch (err) {
      console.error("Failed to update group:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (groupId: number) => {
    setActionLoading(true);
    try {
      await deleteGroup(groupId);
      setDeletingGroup(null);
    } catch (err) {
      console.error("Failed to delete group:", err);
    } finally {
      setActionLoading(false);
    }
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
          Groups 📦
        </h1>
        <p className="text-gray-600">
          Manage familiar groups and their pricing
        </p>
      </div>

      {/* CREATE GROUP FORM */}
      <div className="p-6 bg-white shadow-lg rounded-2xl max-w-md mb-8">
        <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-2">
          <PlusIcon className="w-6 h-6" />
          Create New Group
        </h2>
        <input
          type="number"
          placeholder="Price (in Gold)"
          className="w-full border border-purple-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0"
        />
        <button
          onClick={handleCreate}
          disabled={actionLoading || !price}
          className="mt-4 w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          {actionLoading ? "Creating..." : "Create Group"}
        </button>
      </div>

      {/* GROUP COUNT */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Total Groups: <span className="font-bold text-purple-700">{groups.length}</span>
        </p>
      </div>

      {/* GROUP LIST */}
      {groups.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
          <span className="text-6xl mb-4 block">📦</span>
          <p className="text-lg text-gray-600 font-medium">No groups found.</p>
          <p className="text-sm text-gray-500 mt-2">Create your first group above!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {groups.map((g: any) => (
            <div
              key={g.GroupID}
              className="relative p-6 shadow-lg rounded-2xl bg-white hover:shadow-xl transition-all border-l-4 border-purple-500"
            >
              {/* Action buttons */}
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => setEditingGroup(g)}
                  className="p-2 bg-white shadow-md rounded-full hover:bg-purple-100 transition-colors"
                  title="Edit"
                >
                  <PencilIcon className="w-4 h-4 text-purple-600" />
                </button>

                <button
                  onClick={() => setDeletingGroup(g.GroupID)}
                  className="p-2 bg-white shadow-md rounded-full hover:bg-red-100 transition-colors"
                  title="Delete"
                >
                  <TrashIcon className="w-4 h-4 text-red-600" />
                </button>
              </div>

              {/* Group Info */}
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-purple-700 mb-2">
                  Group #{g.GroupID}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-extrabold text-orange-600">
                    {g.price}
                  </span>
                  <span className="text-lg text-gray-600">Gold</span>
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-1 text-sm text-gray-600">
                {g.species && (
                  <p><span className="font-semibold">Species:</span> {g.species}</p>
                )}
                {g.WizardID && (
                  <p><span className="font-semibold">Owner:</span> Wizard #{g.WizardID}</p>
                )}
                {g.rarity && (
                  <p><span className="font-semibold">Rarity:</span> {g.rarity}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EDIT GROUP MODAL */}
      {editingGroup && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4"
          onClick={() => setEditingGroup(null)}
        >
          <div
            className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-purple-700 mb-6 flex items-center gap-2">
              <PencilIcon className="w-6 h-6" />
              Edit Group #{editingGroup.GroupID}
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (Gold)
              </label>
              <input
                type="number"
                className="border border-purple-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={editingGroup.price}
                onChange={(e) =>
                  setEditingGroup({ ...editingGroup, price: Number(e.target.value) })
                }
                min="0"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditingGroup(null)}
                className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                disabled={actionLoading}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingGroup !== null && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4"
          onClick={() => setDeletingGroup(null)}
        >
          <div
            className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-4">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <TrashIcon className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Delete Group?</h2>
            </div>
            <p className="text-center text-gray-600 mb-6">
              Are you sure you want to delete Group #{deletingGroup}? This action cannot be undone and will affect all associated familiars.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeletingGroup(null)}
                className="flex-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deletingGroup)}
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