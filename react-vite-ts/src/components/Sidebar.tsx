import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  HomeIcon,
  UsersIcon,
  PuzzlePieceIcon,
  ClipboardDocumentListIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  let storedUser: any = {};
  try {
    const raw = localStorage.getItem("user");
    storedUser = raw ? JSON.parse(raw) : {};
  } catch {
    storedUser = {};
  }

  const role = storedUser?.role ?? "customer";

  const allRoutes = [
    { name: "Dashboard", path: "/", icon: HomeIcon, roles: ["wizard", "customer"] },
    { name: "Customers", path: "/customers", icon: UsersIcon, roles: ["wizard"] },
    { name: "Familiars", path: "/familiars", icon: PuzzlePieceIcon, roles: ["wizard"] },
    { name: "Groups", path: "/groups", icon: ClipboardDocumentListIcon, roles: ["wizard"] },
    { name: "Contracts", path: "/contracts", icon: ClipboardDocumentListIcon, roles: ["wizard", "customer"] },
  ];

  const routes = allRoutes.filter((r) => r.roles.includes(role));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-64 h-screen bg-linear-to-b from-purple-700 to-purple-600 text-white flex flex-col p-6 shadow-lg">

      <h1 className="text-3xl font-extrabold mb-10 tracking-wide">
        {role === "wizard" ? "Wizard Panel" : "Customer Panel"}
      </h1>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 flex-1">
        {routes.map((route) => {
          const isActive = location.pathname === route.path;
          const Icon = route.icon;

          return (
            <Link
              key={route.path}
              to={route.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all duration-200
                ${isActive ? "bg-purple-800 shadow-md" : "hover:bg-purple-500/30"}`}
            >
              <Icon className="w-6 h-6" />
              <span>{route.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-3">
        <p className="text-sm text-purple-200">© 2025 Familiar Manager</p>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 
                     font-semibold transition-all duration-200"
        >
          <ArrowLeftOnRectangleIcon className="w-6 h-6" />
          Logout
        </button>
      </div>
    </div>
  );
}
