import React, { useState } from 'react';
import { useCustomer } from '../hooks/useCustomer';

const CustomerPage: React.FC = () => {
  const { customers, loading, error, updateCustomer } = useCustomer();

  const [nameFilter, setNameFilter] = useState('');
  const [groupFilter, setGroupFilter] = useState('');
  const [showWithGroup, setShowWithGroup] = useState(false);
  const [showNoGroup, setShowNoGroup] = useState(false);

  const filteredCustomers = customers.filter((c) => {
    const matchName = c.name.toLowerCase().includes(nameFilter.toLowerCase());
    const matchGroup = groupFilter === '' ? true : String(c.GroupID ?? '').includes(groupFilter);

    let matchToggle = true;
    if (showWithGroup && !showNoGroup) matchToggle = c.GroupID !== null && c.GroupID !== undefined;
    if (showNoGroup && !showWithGroup) matchToggle = c.GroupID === null || c.GroupID === undefined;

    return matchName && matchGroup && matchToggle;
  });

  return (
    <div className="p-6 bg-white/95 min-h-screen text-gray-900 space-y-6">

      {/* PAGE HEADER */}
      <h1 className="text-3xl font-extrabold text-purple-700 mb-6">Customers</h1>

      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-4 mb-6 bg-white shadow-lg rounded-2xl p-4 border border-white/20">
        <input
          type="text"
          placeholder="Filter by Name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="w-64 p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <input
          type="text"
          placeholder="Filter by GroupID"
          value={groupFilter}
          onChange={(e) => setGroupFilter(e.target.value)}
          className="w-40 p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showWithGroup}
            onChange={(e) => {
              setShowWithGroup(e.target.checked);
              if (e.target.checked) setShowNoGroup(false);
            }}
            className="w-4 h-4"
          />
          <span>Show With Group Only</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showNoGroup}
            onChange={(e) => {
              setShowNoGroup(e.target.checked);
              if (e.target.checked) setShowWithGroup(false);
            }}
            className="w-4 h-4"
          />
          <span>Show No Group Only</span>
        </label>
      </div>

      {/* CUSTOMER TABLE */}
      <div className="overflow-x-auto rounded-2xl shadow-lg bg-white border border-white/20">
        <table className="min-w-full text-left">
          <thead className="bg-purple-50 uppercase text-sm font-semibold">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">GroupID</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map((c) => (
              <tr key={c.CustomerID} className="hover:bg-purple-50 transition">
                <td className="px-4 py-3">{c.CustomerID}</td>
                <td className="px-4 py-3">{c.name}</td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    value={c.GroupID ?? ''}
                    onChange={(e) => {
                      const newGroupID = e.target.value === '' ? null : Number(e.target.value);
                      updateCustomer(c.CustomerID, { GroupID: newGroupID ?? undefined });
                    }}
                    placeholder="-"
                    className="w-20 p-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </td>
              </tr>
            ))}

            {filteredCustomers.length === 0 && !loading && (
              <tr>
                <td colSpan={3} className="text-center text-purple-700 py-4">
                  No matching customers.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {loading && <p className="p-4 text-purple-500 animate-pulse">Loading...</p>}
        {error && <p className="p-4 text-red-600 font-semibold">{error}</p>}
      </div>
    </div>
  );
};

export default CustomerPage;
