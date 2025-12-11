import React, { useState } from 'react';
import { useCustomer } from '../hooks/useCustomer';

const CustomerPage: React.FC = () => {
  const { customers, loading, error, updateCustomer } = useCustomer();

  const [nameFilter, setNameFilter] = useState('');
  const [groupFilter, setGroupFilter] = useState('');
  const [showWithGroup, setShowWithGroup] = useState(false);
  const [showNoGroup, setShowNoGroup] = useState(false);
  const [updating, setUpdating] = useState<number | null>(null);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);

  const filteredCustomers = customers.filter((c) => {
    const matchName = c.name.toLowerCase().includes(nameFilter.toLowerCase());
    const matchGroup = groupFilter === '' ? true : String(c.GroupID ?? '').includes(groupFilter);

    let matchToggle = true;
    if (showWithGroup && !showNoGroup) matchToggle = c.GroupID !== null && c.GroupID !== undefined;
    if (showNoGroup && !showWithGroup) matchToggle = c.GroupID === null || c.GroupID === undefined;

    return matchName && matchGroup && matchToggle;
  });

  const handleUpdateGroup = async (customerId: number, newGroupId: number | null) => {
    setUpdating(customerId);
    setUpdateMessage(null);
    
    try {
      await updateCustomer(customerId, { GroupID: newGroupId ?? undefined });
      setUpdateMessage(`Customer #${customerId} updated successfully!`);
      setTimeout(() => setUpdateMessage(null), 3000);
    } catch (err: any) {
      setUpdateMessage(`Failed to update: ${err.message}`);
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="p-6 bg-white/95 min-h-screen text-gray-900 space-y-6">

      {/* PAGE HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-purple-700">Customers</h1>
        <div className="text-sm text-gray-600">
          Total: <span className="font-bold text-purple-700">{filteredCustomers.length}</span> customers
        </div>
      </div>

      {/* UPDATE MESSAGE */}
      {updateMessage && (
        <div className={`p-4 rounded-lg ${
          updateMessage.includes('Failed') 
            ? 'bg-red-100 text-red-700' 
            : 'bg-green-100 text-green-700'
        }`}>
          {updateMessage}
        </div>
      )}

      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-4 mb-6 bg-white shadow-lg rounded-2xl p-4 border border-purple-100">
        <input
          type="text"
          placeholder="🔍 Filter by Name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="flex-1 min-w-[200px] p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <input
          type="text"
          placeholder="Filter by GroupID"
          value={groupFilter}
          onChange={(e) => setGroupFilter(e.target.value)}
          className="w-40 p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <label className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100 transition">
          <input
            type="checkbox"
            checked={showWithGroup}
            onChange={(e) => {
              setShowWithGroup(e.target.checked);
              if (e.target.checked) setShowNoGroup(false);
            }}
            className="w-4 h-4 text-purple-600 focus:ring-purple-500"
          />
          <span className="text-sm font-medium">With Group</span>
        </label>

        <label className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100 transition">
          <input
            type="checkbox"
            checked={showNoGroup}
            onChange={(e) => {
              setShowNoGroup(e.target.checked);
              if (e.target.checked) setShowWithGroup(false);
            }}
            className="w-4 h-4 text-purple-600 focus:ring-purple-500"
          />
          <span className="text-sm font-medium">No Group</span>
        </label>
      </div>

      {/* LOADING/ERROR STATES */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          <strong className="font-bold">Error: </strong>
          <span>{error}</span>
        </div>
      )}

      {/* CUSTOMER TABLE */}
      {!loading && !error && (
        <div className="overflow-x-auto rounded-2xl shadow-lg bg-white border border-purple-100">
          <table className="min-w-full text-left">
            <thead className="bg-gradient-to-r from-purple-100 to-purple-50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-purple-700 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-xs font-bold text-purple-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-xs font-bold text-purple-700 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-xs font-bold text-purple-700 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-4 text-xs font-bold text-purple-700 uppercase tracking-wider">
                  Group ID
                </th>
                <th className="px-6 py-4 text-xs font-bold text-purple-700 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-purple-100">
              {filteredCustomers.map((c) => (
                <tr 
                  key={c.CustomerID} 
                  className="hover:bg-purple-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-semibold text-purple-700">#{c.CustomerID}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      {c.image && (
                        <img 
                          src={c.image} 
                          alt={c.name} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      )}
                      <span className="font-medium text-gray-900">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {c.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    @{c.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={c.GroupID ?? ''}
                        onChange={(e) => {
                          const newGroupID = e.target.value === '' ? null : Number(e.target.value);
                          handleUpdateGroup(c.CustomerID, newGroupID);
                        }}
                        placeholder="None"
                        disabled={updating === c.CustomerID}
                        className="w-24 p-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                      {updating === c.CustomerID && (
                        <span className="text-purple-600 animate-pulse">✓</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {c.GroupID ? (
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                        Assigned
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600">
                        Unassigned
                      </span>
                    )}
                  </td>
                </tr>
              ))}

              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12">
                    <div className="text-purple-400 text-6xl mb-4">🔍</div>
                    <p className="text-gray-500 text-lg">No matching customers found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomerPage;