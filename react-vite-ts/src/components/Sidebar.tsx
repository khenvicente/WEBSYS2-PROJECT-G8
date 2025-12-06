import { useNavigate, useLocation } from "react-router-dom";
import {
  HomeIcon,
  UsersIcon,
  PuzzlePieceIcon,
  // AcademicCapIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/solid";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const routes = [
    { name: "Dashboard", path: "/", icon: HomeIcon },
    { name: "Customers", path: "/customers", icon: UsersIcon },
    { name: "Familiars", path: "/familiars", icon: PuzzlePieceIcon },
    { name: "Groups", path: "/groups", icon: ClipboardDocumentListIcon },
    // { name: "Wizards", path: "/wizards", icon: AcademicCapIcon },
    { name: "Contracts", path: "/contracts", icon: ClipboardDocumentListIcon },
  ];

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-purple-700 to-purple-600 text-white flex flex-col p-6 shadow-lg">
      <h1 className="text-3xl font-extrabold mb-10 tracking-wide">
        Admin Panel
      </h1>
      <nav className="flex flex-col gap-2 flex-1">
        {routes.map((route) => {
          const isActive = location.pathname === route.path;
          const Icon = route.icon;
          return (
            <button
              key={route.path}
              onClick={() => navigate(route.path)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all duration-200
                ${isActive ? "bg-purple-800 shadow-md" : "hover:bg-purple-500/30"}`
              }
            >
              <Icon className="w-6 h-6" />
              <span>{route.name}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto">
        <p className="text-sm text-purple-200">© 2025 Familiar Manager</p>
      </div>
    </div>
  );
}
