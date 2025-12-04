import React from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const routes = [
    { name: "Customers", path: "/customers" },
    { name: "Familiars", path: "/familiars" },
    { name: "Groups", path: "/groups" },
    { name: "Wizards", path: "/wizards" },
    { name: "Contracts", path: "/contracts" },
  ];

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <nav className="flex flex-col gap-2">
        {routes.map((route) => (
          <button
            key={route.path}
            onClick={() => navigate(route.path)}
            className="text-left px-4 py-2 rounded hover:bg-gray-700 transition-colors"
          >
            {route.name}
          </button>
        ))}
      </nav>
    </div>
  );
}
